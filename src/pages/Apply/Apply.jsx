import { useState } from 'react';
import { Outlet } from 'react-router';

export default function Apply() {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('apply_draft');

      // 데이터가 없거나 문자열 "undefined"인 경우 예외 처리
      if (!saved || saved === 'undefined') {
        return {
          name: '',
          major: '',
          studentId: '',
          phone: '',
          email: '',
          track: '',
          answers: {},
        };
      }

      return JSON.parse(saved);
    } catch (error) {
      // 혹시나 parsing 에러가 나면 초기값 반환
      console.error('저장된 데이터를 읽는 중 오류 발생:', error);
      return {
        name: '',
        major: '',
        studentId: '',
        phone: '',
        email: '',
        track: '',
        answers: {},
      };
    }
  });

  // 모든 입력을 처리하는 통합 업데이트 함수
  const updateFormData = (nextFormData) => {
    setFormData(nextFormData);
    localStorage.setItem('apply_draft', JSON.stringify(nextFormData));
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
      <Outlet context={{ formData, setFormData, updateFormData, handleAnswerChange }} />
    </div>
  );
}
