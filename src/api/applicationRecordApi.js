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

// 기수별 트랙별 검색어별 지원자 목록 무한 스크롤 조회
export const getApplicationsLoader = async (semester, track, search, lastCursor, size = 10) => {
  try {
    const response = await APIService.private.get('v1/admin/applications/records', {
      params: { semester, track, search, lastCursor, size },
    });
    return response.data || [];
  } catch (error) {
    console.error('기수별 트랙별 검색어별 제출 지원서 조회 실패:', error);
    return [];
  }
};
