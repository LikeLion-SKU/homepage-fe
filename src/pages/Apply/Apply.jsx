import { useState } from 'react';
import { Outlet } from 'react-router';

export default function Apply() {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    studentId: '',
    phone: '',
    email: '',
    track: '',
    answers: {},
  });

  // STEP 2에서 답변을 업데이트하는 함수
  const handleAnswerChange = (questionId, value) => {
    const limitedValue = value.slice(0, 500);
    setFormData((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: limitedValue,
      },
    }));
  };
  return (
    <div>
      {/* 필요한 모든 것을 객체에 담아 전달 */}
      <Outlet
        context={{
          formData,
          setFormData,
          handleAnswerChange,
        }}
      />
    </div>
  );
}
