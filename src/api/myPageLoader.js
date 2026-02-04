import { APIService } from '@/api/api';

export const myPageLoader = async () => {
  try {
    const response = await APIService.get('/v1/users/me');
    return response.data;
  } catch (error) {
    console.log('마이페이지 정보 조회 실패:', error);
  }
};
