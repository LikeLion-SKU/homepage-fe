import { APIService } from '@/api/api';

// 지원서 제출
export const applicationSubmit = async (submitData) => {
  try {
    console.log('최종 제출 시 서버로 보내는 데이터 확인:', submitData);

    const response = await APIService.private.put('/v1/applications/records/submit', submitData);
    return response;
  } catch (error) {
    console.error('제출 실패:', error);
    return [];
  }
};

// 최종 지원서 확인
export const applicationLoader = async () => {
  try {
    const response = await APIService.private.get('v1/applications/records/submit');
    return response.data || [];
  } catch (error) {
    console.error('지원서 조회 실패:', error);
    return [];
  }
};

//특정 지원자 지원서 조회
export const getApplicationUser = async (applicationRecordId) => {
  try {
    const res = await APIService.private.get(
      `/v1/admin/applications/records/${applicationRecordId}`
    );

    return res.data;
  } catch (error) {
    console.log('지원자 지원서 조회 실패:', error);
  }
};
