import { useState } from 'react';
import { useNavigate } from 'react-router';

import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';
import InterviewTime from '@/components/result/InterviewTime';
import ResultSection from '@/components/result/ResultSection';

export default function Result() {
  const navigate = useNavigate();
  const pass = true;
  const [onModal, setOnModal] = useState(false);
  const buttonClick = () => {
    if (pass) {
      setOnModal(true);
    } else {
      navigate('/');
    }
  };
  return (
    <GridSection rows={pass ? 39 : 15}>
      <div className="flex flex-col items-center gap-19">
        <ResultSection pass={pass} />
        <InterviewTime />
        <CheckButton
          buttonName={pass ? '면접 날짜 제출하기' : '확인했어요.'}
          onClick={() => buttonClick()}
        />
      </div>
      {onModal && '모달 온'}
    </GridSection>
  );
}
