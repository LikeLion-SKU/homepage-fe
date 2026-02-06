import { APIService } from '@/api/api';

export const basicInfoLoader = async () => {
  try {
    const response = await APIService.private.get('/v1/applications/records/personal-info');
    return response.data || {}; // 응답 없어도 기본값 보장
  } catch (error) {
    console.log('기본 인적사항 정보 조회 실패:', error);
    throw error; // 에러 두번 던짐
  }
};
