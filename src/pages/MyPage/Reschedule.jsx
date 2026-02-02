import { useState } from 'react';
import { useNavigate } from 'react-router';

import CheckModal from '@/components/common/Modal/CheckModal';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';
import InterviewTime from '@/components/result/InterviewTime';

// TODO :
// 현재 등록되어있는 사용자의 면접 일정 데이터 받아서 미리 초록색으로 띄워놓기
// 이후에 누른 일정으로 변경해서 저장버튼

export default function Reschedule() {
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
        <InterviewTime setAllChecked={setAllChecked} hide={true} />
        <CheckButton buttonName={'면접 날짜 제출하기'} onClick={() => buttonClick()} />
      </div>
      {onModal && (
        <CheckModal isOpen={onModal} cancel={() => modalClick()}>
          {getModalMessage()}
        </CheckModal>
      )}
    </GridSection>
  );
}
