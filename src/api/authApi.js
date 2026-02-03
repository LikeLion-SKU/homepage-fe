import { publicAPI } from '@/api/api';

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
