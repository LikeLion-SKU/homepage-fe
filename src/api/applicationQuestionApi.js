import { APIService } from '@/api/api';

// COMMON일떄, 트랙별 질문 불러오는 로더
export const questionsLoader = async () => {
  // sessionStorage 에서 track 정보 빼서 질문 불러올때 파라미터로 이용
  const formData = JSON.parse(sessionStorage.getItem('apply_draft'));
  const trackId = formData?.track; // 세션에 저장된 트랙 ID 추출

  if (!trackId) {
    console.error('세션에 트랙 정보가 없습니다.');
    return { commonQues: [], trackQues: [] };
  }

  // track 추출한 정보로 API 호출
  try {
    const [commonResponse, trackResponse] = await Promise.all([
      APIService.private.get(`/v1/applications/questions?track=COMMON`),
      APIService.private.get(`/v1/applications/questions?track=${trackId}`),
    ]);
    return {
      track: trackId,
      commonQues: commonResponse.data.questions || [],
      trackQues: trackResponse.data.questions || [],
    };
  } catch (error) {
    console.error('최종확인 용 트랙별 질문 로드 실패: ', error);
    return [];
  }
};
