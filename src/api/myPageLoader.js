import { APIService } from '@/api/api';

export const myPageLoader = async () => {
  try {
    const response = await APIService.private.get('/v1/users/me');
    return response.data || {}; // 응답 없어도 기본값 보장
  } catch (error) {
    console.log('마이페이지 정보 조회 실패:', error);
    throw error; // 에러 두번 던짐
  }
};
