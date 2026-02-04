import axios from 'axios';

import { publicAPI } from '@/api/api';

// auth 전용 (쿠키 포함)
const authAPI = axios.create({
  baseURL: '/api', // 중요: 환경변수 BASE_URL 쓰지 말기
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
