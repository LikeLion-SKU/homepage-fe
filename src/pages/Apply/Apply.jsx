import { useState } from 'react';
import { Outlet } from 'react-router';
import { useLoaderData } from 'react-router';

export default function Apply() {
  // 더미
  const dummyUserData = {
    name: '김멋사',
    major: '소프트웨어학과',
    studentId: '2020202020',
    phone: '010-0000-0000',
    email: 'likelion',
  };

  const userInfoData = useLoaderData(); // 사용자 기본 인적사항 정보

  // 세션 스토리지 상태관리
  const [formData, setFormData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('apply_draft');
      const parsedSaved = saved && saved !== 'undefined' ? JSON.parse(saved) : {};

      // [핵심] 기존 저장 데이터 + 더미 데이터 + (비어있어야 할 track/answers)
      return {
        ...dummyUserData, // 기본 더미 데이터
        ...parsedSaved, // 세션 스토리지에 작업 중이던 내용이 있다면 덮어씀
        track: parsedSaved.track || userInfoData?.track || '', // 아직 선택 안 했으면 빈 값
        answers: parsedSaved.answers || {}, // 아직 작성 안 했으면 빈 객체
      };
    } catch (error) {
      console.error('저장된 데이터를 읽는 중 오류 발생:', error);
      return { ...dummyUserData, track: userInfoData?.track || '', answers: {} };
    }
  });

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

  return (
    <div>
      <Outlet
        context={{ formData, userInfoData, setFormData, updateFormData, handleAnswerChange }}
      />
    </div>
  );
}
