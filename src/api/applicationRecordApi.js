import { APIService } from '@/api/api';

// 지원서 제출
export const applicationSubmit = async (submitData) => {
  try {
    console.log('최종 제출 시 서버로 보내는 데이터 확인:', submitData);

    const response = await APIService.private.put('/v1/applications/records/submit', submitData);
    return response;
  } catch (error) {
    console.error('제출 실패:', error);
    throw error;
  }
};
