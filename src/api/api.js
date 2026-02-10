import axios from 'axios';

import { refresh } from '@/api/authApi';
import useAuthStore from '@/store/useAuthStore';

// 공용 API 인스턴스 (토큰이 필요 없는 경우)
const publicAPI = axios.create({
  baseURL: '/api', //import.meta.env.VITE_SERVER_BASE_URL, // 중요: 환경변수 BASE_URL 쓰지 말기
});

// 인증 API 인스턴스 (쿠키 기반 인증)
const privateAPI = axios.create({
  baseURL: '/api', //import.meta.env.VITE_SERVER_BASE_URL, // 중요: 환경변수 BASE_URL 쓰지 말기
  withCredentials: true, // 쿠키 전송 활성화
});

// 쿠키 기반 인증이므로 Authorization 헤더 삽입 불필요
// 쿠키가 자동으로 전송됨

// refresh 중복 호출 방지
let isRefreshing = false;

// 응답 인터셉터: 401 에러 시 자동 refresh + 재시도
privateAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // 401 에러이고, 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 이미 refresh 중이면 원래 요청 실패 처리
      if (isRefreshing) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // refresh API 호출
        await refresh();
        // refresh 성공 시 원래 요청 1번만 재시도
        isRefreshing = false;
        return privateAPI(originalRequest);
      } catch (refreshError) {
        // refresh 실패 401시 상태 초기화하고 alert 표시
        isRefreshing = false;
        useAuthStore.getState().setLogout();
        window.location.href = 'error/401';
        return Promise.reject(refreshError);
      }
    }
    if (status === 403) {
      window.location.href = '/error/403';
      return Promise.reject(error);
    }
    if (status >= 500) {
      window.location.href = '/error/500';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

/**
 * API 서비스 객체
 * 실제 API 호출을 위한 메서드들을 제공
 * public과 private으로 구분하여 각각의 용도에 맞는 메서드 제공
 */
export const APIService = {
  // 공용 API 메서드 (토큰 불필요)
  public: {
    get: async (url, config = {}) => {
      const response = await publicAPI.get(url, config);
      return response.data;
    },
    post: async (url, data = {}, config = {}) => {
      const response = await publicAPI.post(url, data, config);
      return response;
    },
  },

  // 인증 API 메서드 (토큰 필요)
  private: {
    get: async (url, config = {}) => {
      const response = await privateAPI.get(url, config);
      return response.data;
    },
    post: async (url, data = {}, config = {}) => {
      const response = await privateAPI.post(url, data, config);
      return response.data;
    },
    put: async (url, data = {}, config = {}) => {
      const response = await privateAPI.put(url, data, config);
      return response.data;
    },
    delete: async (url, config = {}) => {
      const response = await privateAPI.delete(url, config);
      return response.data;
    },
    patch: async (url, data = {}, config = {}) => {
      const response = await privateAPI.patch(url, data, config);
      return response.data;
    },
  },
};

export { publicAPI, privateAPI };
