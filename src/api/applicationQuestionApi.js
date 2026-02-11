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

// 관리자 - 지원서 목록 조회 api 함수
export const getResumeListLoader = async () => {
  try {
    const response = await APIService.private.get('v1/admin/applications/questions/summaries');
    return response.data || [];
  } catch (error) {
    console.error('지원서 전체 목록 조회 실패:', error);
    return {};
  }
};

// 관리자 - 지원서 삭제 api 함수
export const deleteResume = async (applicationFormId) => {
  try {
    await APIService.private.delete(`v1/admin/applications/forms/${applicationFormId}/questions`);
    return true;
  } catch (error) {
    console.error('지원서 삭제 실패:', error);
    return false;
  }
};

// 관리자 - 질문 미등록 모집 공고 목록 조회 api 함수
export const getResumeForm = async () => {
  try {
    const response = await APIService.private.get('/v1/admin/applications/forms/summaries');
    // API가 { success, data } 형태로 반환하는 경우 처리
    if (response?.success === false) {
      return [];
    }
    const data = response?.data ?? response;
    return Array.isArray(data) ? data : (data?.content ?? []);
  } catch (error) {
    console.error('질문 미등록 모집 공고 목록 조회 실패:', error);
    return [];
  }
};

// UI 탭명 -> API track 매핑
export const TAB_TO_TRACK = {
  공통질문: 'COMMON',
  PO: 'PO',
  프론트엔드: 'FRONTEND',
  백엔드: 'BACKEND',
};

// 관리자 - 지원서 질문 등록 api 함수
// semester: forms/summaries에서 받은 지원서의 semester
// body: { groups: [{ track, questions: [{ orderNumber, content }] }] }
export const postResumeQuestions = async (semester, body) => {
  try {
    const response = await APIService.private.post(
      `/v1/admin/applications/questions/${semester}`,
      body
    );
    return response;
  } catch (error) {
    console.error('지원서 질문 등록 실패:', error);
    throw error;
  }
};
