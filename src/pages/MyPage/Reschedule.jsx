import { useState } from 'react';
import { useNavigate } from 'react-router';

import { interviewBooking, putInterviewChange } from '@/api/interviewBooking';
import Toast from '@/components/common/Toast/Toast';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';
import InterviewTime from '@/components/result/InterviewTime';
import useInterviewStore from '@/store/useInterviewStore';

export default function Reschedule() {
  const navigate = useNavigate();
  const [allChecked, setAllChecked] = useState([false, false]);
  const [selectedTime, setSelectedTime] = useState({ date: '', scheduleId: 0 });
  const { myInterviews } = useInterviewStore();
  const [isToast, setIsToast] = useState(false);
  const [isErrorToast, setIsErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const buttonClick = async () => {
    // 날짜 선택 여부 확인 (allChecked[0]이 true여야 함)
    if (!allChecked[0]) {
      setErrorMessage('면접 날짜를 선택해주세요.');
      setIsErrorToast(true);
      setTimeout(() => setIsErrorToast(false), 3000);
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

      // 성공 시 토스트 띄우고 3초 후 메인으로 이동
      setIsToast(true);
      setTimeout(() => {
        setIsToast(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('면접 일정 변경 중 오류 발생:', error);
      setErrorMessage('일정 변경에 실패했습니다.');
      setIsErrorToast(true);
      setTimeout(() => setIsErrorToast(false), 3000);
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
      <Toast isToast={isToast} message="수정되었습니다!" />
      <Toast isToast={isErrorToast} message={errorMessage} />
    </GridSection>
  );
}
