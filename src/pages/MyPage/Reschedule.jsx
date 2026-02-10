import { useState } from 'react';
import { useNavigate } from 'react-router';

import { interviewBooking, putInterviewChange } from '@/api/interviewBooking';
import ConfirmModal from '@/components/common/Modal/ConfirmModal';
import Toast from '@/components/common/Toast/Toast';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';
import InterviewTime from '@/components/result/InterviewTime';
import useInterviewStore from '@/store/useInterviewStore';

export default function Reschedule() {
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);
  const [allChecked, setAllChecked] = useState([false, false]);
  const [selectedTime, setSelectedTime] = useState({ date: '', scheduleId: 0 });
  const { myInterviews } = useInterviewStore();
  const [isToast, setIsToast] = useState(false);

  const buttonClick = async () => {
    // 날짜 선택 여부 확인 (allChecked[0]이 true여야 함)
    if (!allChecked[0]) {
      setOnModal(true);
      return;
    }

    try {
      // 기존 예약 정보가 있는지 확인
      if (myInterviews?.booking?.scheduleId) {
        // 기존 예약과 다를 때만 수정(PUT) 호출
        if (selectedTime.scheduleId !== myInterviews.booking.scheduleId) {
          await putInterviewChange(selectedTime.scheduleId);
        }
      } else {
        // 기존 예약이 없으면 신규 등록(POST) 호출
        await interviewBooking(selectedTime.scheduleId);
      }

      // 성공 시 모달 띄우기
      setOnModal(true);
    } catch (error) {
      console.error('면접 일정 변경 중 오류 발생:', error);
      alert('일정 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const getModalMessage = () => {
    if (allChecked[0]) {
      return '면접 날짜를 변경하시겠습니까?';
    } else {
      return '면접 날짜를 선택해주세요.';
    }
  };
  // 변경 완료 토스트 3초 띄우고 메인 페이지로 가야함
  const modalChangeComplete = () => {
    setOnModal(false);
    if (allChecked[0]) {
      setIsToast(true); // 2. 토스트를 켬

      // 3. 3초(3000ms) 후에 메인 페이지로 이동
      setTimeout(() => {
        setIsToast(false); // 토스트 끄기 (선택 사항)
        navigate('/'); // 메인으로 이동
      }, 3000);
    }
  };
  return (
    <GridSection>
      <div className="flex flex-col items-center gap-19 mb-60">
        <InterviewTime
          setAllChecked={setAllChecked}
          hide={true}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <CheckButton buttonName={'면접 날짜 제출하기'} onClick={() => buttonClick()} />
      </div>
      {onModal && (
        <ConfirmModal
          isOpen={onModal}
          cancel={() => setOnModal(false)}
          confirm={modalChangeComplete}
        >
          {getModalMessage()}
        </ConfirmModal>
      )}
      {isToast && <Toast isToast={setIsToast} message="수정되었습니다!"></Toast>}
    </GridSection>
  );
}
