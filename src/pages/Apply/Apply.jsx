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

  useEffect(() => {
    const syncTrackData = async () => {
      // 경로에 따라 COMMON 또는 선택한 트랙
      const targetTrack = location.pathname.includes('common') ? 'COMMON' : formData.track;

      if (targetTrack) {
        const { track, questions, formattedAnswers } = await getQuesAndAnswerByTrack(targetTrack);

        setQuestions(questions);
        setRecordAnswer(formattedAnswers);

        setFormData((prev) => {
          // 백에서 불러온 트랙별 질문과 답변 정보의 track을 type으로 직접 주입
          const typedNewAnswers = Object.entries(formattedAnswers).reduce(
            (acc, [questionId, content]) => {
              acc[questionId] = {
                content: content || '',
                type: track, // 여기서 API 응답의 track 정보를 사용
              };
              return acc;
            },
            {}
          );
          const nextData = {
            ...prev,
            name: prev.name || userInfoData?.name || '',
            department: prev.department || userInfoData?.department || '',
            studentNumber: prev.studentNumber || userInfoData?.studentNumber || '',
            phoneNumber: prev.phoneNumber || userInfoData?.phoneNumber || '',
            email: prev.email || userInfoData?.email || '',
            track: prev.track,
            answers: {
              ...prev.answers, // 기존 답변 유지
              ...typedNewAnswers, // API에서 온 답변을 해당 track 타입과 함께 병합
            },
          };
          sessionStorage.setItem('apply_draft', JSON.stringify(nextData));
          return nextData;
        });
      }
    };
    syncTrackData();
  }, [location.pathname, formData.track, userInfoData]);

  // 백에게 보낼 구조로 포멧
  const formatAnswers = () => {
    const commonAnswers = [];
    const trackAnswers = [];

    // 현재 사용자가 최종적으로 선택한 트랙
    const currentSelectedTrack = formData.track;

    // formData.answers객체 돌기
    Object.entries(formData.answers).forEach(([questionId, data]) => {
      // 객체에서 content와 type 추출
      const content = typeof data === 'object' ? data.content : data;
      const type = typeof data === 'object' ? data.type : '';

      const answerObj = {
        questionId: Number(questionId),
        content: content || '',
      };
      // API 응답에서 받은 track(type) 정보에 따라 분류
      if (type === 'COMMON') {
        commonAnswers.push(answerObj); // COMMON이면 commonAnswer에
      } else if (type === currentSelectedTrack) {
        // 사용자 선택한 트랙 = formData 속 type이 일치할때만 보여줘야 함 -> 안그러면 사용자가 frontend 선택했어도 formData의 backend 의 답변이 나올 수 잇음
        trackAnswers.push(answerObj);
      }
    });
    return {
      track: formData.track, // 유저가 최종 선택한 트랙 (예: "BACKEND")
      commonAnswers,
      trackAnswers,
    };
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

  // 통합 sessionStorage 업데이트 함수
  const updateFormData = (nextFormData) => {
    setFormData(nextFormData);
    sessionStorage.setItem('apply_draft', JSON.stringify(nextFormData));
  };

  const handleAnswerChange = (questionId, newValue) => {
    setFormData((prev) => {
      // 해당 질문의 기존 데이터 (type 정보를 유지하기 위함)
      const existingData = prev.answers?.[questionId] || {};

      const nextData = {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: {
            ...existingData, // 기존의 type: 'COMMON' 혹은 'TRACK' 유지
            content: newValue, // 텍스트만 새로 변경
          },
        },
      };

      // 세션 스토리지 업데이트
      sessionStorage.setItem('apply_draft', JSON.stringify(nextData));
      return nextData;
    });
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
