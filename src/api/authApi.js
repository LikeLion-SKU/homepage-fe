import axios from 'axios';

import { APIService } from '@/api/api';
import { publicAPI } from '@/api/api';
import useAuthStore from '@/store/useAuthStore';

// auth 전용 (쿠키 포함)
const authAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL, // 중요: 환경변수 BASE_URL 쓰지 말기
  withCredentials: true,
});

// 공통 POST
const post = async (url, body) => {
  const res = await publicAPI.post(url, body);
  return res.data;
};

// 이메일 인증 코드 전송
export const requestEmailVerification = ({ email }) =>
  post('/v1/auth/email/verify/request', { email });

// 이메일 인증 코드 검증
export const confirmEmailVerification = ({ email, code }) =>
  post('/v1/auth/email/verify/confirm', { email, code });

// 회원가입
export const register = (data) => post('/v1/auth/register', data);

// 로그인 (쿠키 기반)
export const login = ({ email, password }) =>
  authAPI.post('/v1/auth/login', { email, password }).then((r) => r.data);

// 토큰 갱신 (쿠키 기반)
export const refresh = () => authAPI.post('/v1/auth/refresh').then((r) => r.data);

// 로그아웃 (쿠키 기반)
export const logout = () => authAPI.post('/v1/auth/logout').then((r) => r.data);

// 비밀벟호 재발급
export const reissuePassword = ({ email, code }) =>
  authAPI.post('/v1/auth/password/reissue', { email, code }).then((r) => r.data);

export const logoutAction = async () => {
  const { startLogout, setLogout } = useAuthStore.getState();
  startLogout(); // 로그아웃 시작 상태
  try {
    // 백엔드에 로그아웃 요청 (쿠키 삭제 요청)
    await APIService.private.post('/v1/auth/logout');
  } catch (error) {
    console.error('로그아웃 API 호출 실패:', error);
  } finally {
    setLogout(); // 클라이언트 메모리에 남은 유저 정보 삭제(쿠키랑 별개)

    // 쿠키 삭제할 시간 주기
    setTimeout(() => {
      window.location.href = '/';
    }, 100); // 로그아웃 되면 메인 페이지로 이동
  }
};
