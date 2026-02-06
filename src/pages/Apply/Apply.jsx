import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useLoaderData, useLocation } from 'react-router';

import { APIService } from '@/api/api';

export default function Apply() {
  // 원본 데이터 불러오기 (from back)
  const location = useLocation();
  const { userInfoData } = useLoaderData(); // 사용자 인적사항 조회 api
  const [questions, setQuestions] = useState([]); // 트랙별 질문 조회 api
  const [recordAnswer, setRecordAnswer] = useState({}); // 트랙별 질문별 답변 조회 api

  // 세션 스토리지 상태관리
  const [formData, setFormData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('apply_draft');
      const parsedSaved = saved && saved !== 'undefined' ? JSON.parse(saved) : {};

      return {
        // 키 이름을 백엔드 명세에 맞춤
        name: parsedSaved.name || userInfoData?.name || '',
        department: parsedSaved.department || userInfoData?.department || '',
        studentNumber: parsedSaved.studentNumber || userInfoData?.studentNumber || '',
        phoneNumber: parsedSaved.phoneNumber || userInfoData?.phoneNumber || '',
        email: parsedSaved.email || userInfoData?.email || '',

        track: parsedSaved.track || userInfoData?.track || '',
        answers: parsedSaved.answers || {},
      };
    } catch (error) {
      console.error('저장된 데이터를 읽는 중 오류 발생:', error);
      return { ...userInfoData, track: '', answers: {} };
    }
  });

  // 사용자의 트랙 선택에 따른 api 호출
  const getQuesAndAnswerByTrack = async (trackId) => {
    try {
      const [questionRes, answerRes] = await Promise.all([
        APIService.private.get(`/v1/applications/questions?track=${trackId}`),
        APIService.private.get(`/v1/applications/records/draft/answers?track=${trackId}`),
      ]);
      const newQuestions = questionRes.data.questions || [];
      const newAnswers = answerRes.data || [];

      const formattedAnswers = newAnswers.reduce((acc, cur) => {
        // {"questionId": 10,"answer": "답변~"} -> {10: "답변~ "} 이런식으로 포멧팅
        acc[cur.questionId] = cur.answer;
        return acc;
      }, {});

      setQuestions(newQuestions);
      setRecordAnswer(formattedAnswers);

      return { questions: newQuestions, answers: formattedAnswers };
    } catch (error) {
      console.error('트랙별 질문, 답변 데이터 로드 실패: ', error);
      return { questions: [], answers: {} };
    }
  };

  // 트랙 정보로 그에 따른 api 응답값 저장
  useEffect(() => {
    const syncTrackData = async () => {
      // 현재 어떤 트랙 데이터를 불러와야 하는지 결정
      // 만약 현재 경로가 /common 이라면 "COMMON"을, 아니라면 formData.track을 사용
      const targetTrack = location.pathname.includes('common') ? 'COMMON' : formData.track;

      if (targetTrack) {
        const { answers: formattedAnswers } = await getQuesAndAnswerByTrack(targetTrack);

        setFormData((prev) => {
          const nextData = {
            ...prev,
            name: prev.name || userInfoData?.name || '',
            department: prev.department || userInfoData?.department || '',
            studentNumber: prev.studentNumber || userInfoData?.studentNumber || '',
            phoneNumber: prev.phoneNumber || userInfoData?.phoneNumber || '',
            email: prev.email || userInfoData?.email || '',
            track: prev.track,
            answers: {
              ...formattedAnswers,
              ...prev.answers,
            },
          };
          sessionStorage.setItem('apply_draft', JSON.stringify(nextData));
          return nextData;
        });
      }
    };
    syncTrackData();
    // 의존성 배열에 formData.track을 추가하여 트랙 변경 시마다 실행되게 함
  }, [location.pathname, formData.track, userInfoData]);

  // 통합 sessionStorage 업데이트 함수
  const updateFormData = (nextFormData) => {
    setFormData(nextFormData);
    sessionStorage.setItem('apply_draft', JSON.stringify(nextFormData));
  };

  const handleAnswerChange = (questionId, value) => {
    const limitedValue = value.slice(0, 500);
    const newFormData = {
      ...formData,
      answers: { ...formData.answers, [questionId]: limitedValue },
    };
    updateFormData(newFormData); // 통합 함수 사용
  };
  console.log('원본데이터:', userInfoData);
  return (
    <div>
      <Outlet
        context={{
          formData,
          userInfoData,
          questions,
          recordAnswer,
          setFormData,
          updateFormData,
          handleAnswerChange,
        }}
      />
    </div>
  );
}
