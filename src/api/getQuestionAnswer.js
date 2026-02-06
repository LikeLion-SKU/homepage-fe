import { APIService } from '@/api/api';

// 사용자의 트랙 선택에 따른 api 호출
export const getQuesAndAnswerByTrack = async (trackId) => {
  try {
    const [questionRes, answerRes] = await Promise.all([
      APIService.private.get(`/v1/applications/questions?track=${trackId}`),
      APIService.private.get(`/v1/applications/records/draft/answers?track=${trackId}`),
    ]);
    const questions = questionRes.data.questions || [];
    const newAnswers = answerRes.data || [];

    const formattedAnswers = newAnswers.reduce((acc, cur) => {
      // {"questionId": 10,"answer": "답변~"} -> {10: "답변~ "} 이런식으로 포멧팅
      acc[cur.questionId] = cur.answer;
      return acc;
    }, {});

    return { questions, formattedAnswers };
  } catch (error) {
    console.error('트랙별 질문, 답변 데이터 로드 실패: ', error);
    return { questions: [], answers: {} };
  }
};
