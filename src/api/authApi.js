import { publicAPI } from '@/api/api';

/**
 * 이메일 인증 코드 전송
 * @param {string} email - 인증 코드를 받을 사람의 이메일 주소
 * @returns {Promise} 인증 코드 전송 성공/실패 여부
 * @description 10~15초 정도 소요되며, 비동기로 처리되지만 완료될 때까지 대기 후 결과 반환
 */
export const requestEmailVerification = async (email) => {
  try {
    const res = await publicAPI.post('/v1/auth/email/verify/request', {
      email,
    });
    return res.data;
  } catch (error) {
    console.error('이메일 인증 코드 전송 실패:', error);
    throw error;
  }
};

/**
 * 이메일 인증 코드 검증
 * @param {string} email - 인증을 받을 사람의 이메일 주소
 * @param {string} code - 이메일로 발송된 인증 코드
 * @returns {Promise} 이메일 인증 코드 검증 성공/실패 여부
 * @description 두 값이 일치하면 인증 성공
 */
export const confirmEmailVerification = async (email, code) => {
  try {
    const res = await publicAPI.post('/v1/auth/email/verify/confirm', {
      email,
      code,
    });
    return res.data;
  } catch (error) {
    console.error('이메일 인증 코드 검증 실패:', error);
    throw error;
  }
};
