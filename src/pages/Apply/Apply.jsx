import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useLoaderData, useLocation } from 'react-router';

import { APIService } from '@/api/api';
import { getQuesAndAnswerByTrack } from '@/api/getQuestionAnswer';

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

  // 트랙 정보로 그에 따른 api 응답값 저장
  useEffect(() => {
    const syncTrackData = async () => {
      // 현재 어떤 트랙 데이터를 불러와야 하는지 결정
      // 만약 현재 경로가 /common 이라면 "COMMON"을, 아니라면 formData.track을 사용
      const targetTrack = location.pathname.includes('common') ? 'COMMON' : formData.track;

      if (targetTrack) {
        const { _track, questions, formattedAnswers } = await getQuesAndAnswerByTrack(targetTrack);

        setQuestions(questions);
        setRecordAnswer(formattedAnswers);

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

  // 백엔드에게 보낼 요청 구조로 포멧팅
  const formatAnswers = () => {
    const commonAnswers = [];
    const trackAnswers = [];

    console.log('질문' + questions);
    // 불러온 questions를 기준으로 루프 돌면서 돌기
    questions.forEach((q) => {
      console.log('질문' + q.questionId);
      const answerContent = formData.answers[q.questionId] || ''; // 답변이 없으면 빈 문자열
      // answer 구조로 변경
      const answerObj = {
        questionId: q.questionId,
        content: answerContent,
      };
      console.log('트랙:' + formData.track); // 이거로 변경해야함
      // 질문의 트랙 정보에 따라 분류 (서버 응답의 'track' 필드 활용)
      if (q.track === 'COMMON') {
        commonAnswers.push(answerObj);
      } else {
        trackAnswers.push(answerObj);
      }
    });

    return { commonAnswers, trackAnswers };
  };

  // 임시저장 api 호출
  // 사용자 인적사항 정보의 track이 null 일때 isFirst = true
  const recordDraft = async (isFirst = false) => {
    try {
      const { commonAnswers, trackAnswers } = formatAnswers();

      const record = {
        track: formData.track, // 유저가 선택한 트랙 (예: 'BACKEND')
        commonAnswers: commonAnswers,
        trackAnswers: trackAnswers,
      };
      console.log('서버로 보내는 데이터 확인:', record);

      if (isFirst) {
        await APIService.private.post('/v1/applications/records/first-draft', record);
      } else {
        await APIService.private.put('/v1/applications/records/draft', record);
      }
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  // // 최초 임시저장 api 호출
  // const recordFirstDraft = async () => {
  //   try {
  //     const record = {
  //       track: formData.track,
  //       answers: Object.entries(formData.answers).map(([questionId, answer]) => ({
  //         questionId: Number(questionId),
  //         answer: answer,
  //       })),
  //     };
  //     await APIService.private.post('/v1/applications/records/first-draft', record);
  //   } catch (error) {
  //     console.error('최초 임시저장 실패:', error);
  //   }
  // };

  // // 임시저장 api 호출
  // const recordDraft = async () => {
  //   try {
  //     const record = {
  //       track: formData.track,
  //       answers: Object.entries(formData.answers).map(([questionId, answer]) => ({
  //         questionId: Number(questionId),
  //         answer: answer,
  //       })),
  //     };
  //     await APIService.private.put('/v1/applications/records/draft', record);
  //   } catch (error) {
  //     console.error('임시저장 실패:', error);
  //   }
  // };

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
          recordDraft,
          setFormData,
          updateFormData,
          handleAnswerChange,
        }}
      />
    </div>
  );
}
