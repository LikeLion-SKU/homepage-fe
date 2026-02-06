import { APIService } from '@/api/api';

export const applyLoader = async () => {
  try {
    const [basicInfoRes, QuestionRes, recordAnswerRes] = await Promise.all([
      APIService.private.get('/v1/applications/records/personal-info'), // 기본 인적사항 조회 api
      APIService.private.get('/v1/applications/questions'), // 트랙별 질문 조회 api
      APIService.private.get('/v1/applications/records/draft/answers'), // 임시저장 지원서 트랙별 답변 조회 api
    ]);

    return {
      basicInfo: basicInfoRes.data || {},
      Question: QuestionRes.data || {},
      recordAnswer: recordAnswerRes.data || {},
    };
  } catch (error) {
    console.error('데이터 통합 로딩 실패:', error);
    throw error;
  }
};
