import { useState } from 'react';
import { useNavigate } from 'react-router';

import CheckModal from '@/components/common/Modal/CheckModal';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';
import InterviewTime from '@/components/result/InterviewTime';
import ResultSection from '@/components/result/ResultSection';

export default function Result() {
  const navigate = useNavigate();
  const pass = true;
  const [onModal, setOnModal] = useState(false);
  const [allChecked, setAllChecked] = useState([false, false]);
  const buttonClick = () => {
    if (pass) {
      setOnModal(true);
    } else {
      navigate('/');
    }
  };
  const getModalMessage = () => {
    if (allChecked[0] && allChecked[1]) {
      return '면접 일정이 확정되었습니다.';
    } else if (!allChecked[0]) {
      return '면접 날짜를 선택해주세요.';
    } else if (!allChecked[1]) {
      return '모든 동의 항목에 동의해주세요.';
    }
  };
  const modalClick = () => {
    setOnModal(false);
    if (allChecked[0] && allChecked[1]) {
      navigate('/');
    }
  };
  return (
    <GridSection>
      <div className="flex flex-col items-center gap-19 mb-60">
        <ResultSection pass={pass} />
        {pass && <InterviewTime setAllChecked={setAllChecked} />}
        <CheckButton
          buttonName={pass ? '면접 날짜 제출하기' : '확인했어요.'}
          onClick={() => buttonClick()}
        />
      </div>
      {onModal && (
        <CheckModal isOpen={onModal} cancel={() => modalClick()}>
          {getModalMessage()}
        </CheckModal>
      )}
    </GridSection>
  );
}
