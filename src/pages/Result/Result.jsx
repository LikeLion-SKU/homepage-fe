import { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { getCurrentForm } from '@/api/applicationForm';
import { interviewBooking, putInterviewChange } from '@/api/interviewBooking';
import CheckModal from '@/components/common/Modal/CheckModal';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';
import InterviewTime from '@/components/result/InterviewTime';
import ResultSection from '@/components/result/ResultSection';
import useInterviewStore from '@/store/useInterviewStore';
import { availbleChangeInterview } from '@/utils/availableChangeInterview';

// 한국어 로캘 불러오기

export default function Result() {
  dayjs.locale('ko');
  const navigate = useNavigate();
  const location = useLocation();
  const [onModal, setOnModal] = useState(false);
  const [allChecked, setAllChecked] = useState([false, false]);
  const resultData = useLoaderData();
  const [interviewDate, setInterviewDate] = useState(true);
  const [selectedTime, setSelectedTime] = useState({ date: '', scheduleId: 0 });
  const { myInterviews } = useInterviewStore();
  const [resultDate, setResultData] = useState({ finalResultAt: '' });
  useEffect(() => {
    if (!location.state?.fromA) {
      alert('잘못된 접근입니다. A 페이지를 통해서 들어와주세요.');
      navigate('/', { replace: true }); // 메인으로 튕겨내기 (replace: 뒤로가기 방지)
    }
    const getInterviewDate = async () => {
      setInterviewDate(await availbleChangeInterview());
      setResultData(await getCurrentForm());
    };
    getInterviewDate();
  }, [location, navigate]);

  const buttonClick = () => {
    if (resultData.test === 'document' && resultData.result) {
      if (interviewDate) {
        if (myInterviews.booking.scheduleId) {
          if (selectedTime.scheduleId !== myInterviews.booking.scheduleId) {
            putInterviewChange(selectedTime.scheduleId);
          }
        } else {
          interviewBooking(selectedTime.scheduleId);
        }
        setOnModal(true);
      } else {
        navigate('/'); //추후 면접 확인 페이지로 경로 변동 예정
      }
    } else {
      navigate('/');
    }
  };
  const getModalMessage = () => {
    if (allChecked[0] && allChecked[1]) {
      if (selectedTime.scheduleId !== myInterviews.booking.scheduleId) {
        return '면접 일정이 확정되었습니다.';
      } else {
        return '이전 일정을 유지합니다.';
      }
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
        <ResultSection pass={resultData} />
        {resultData.test === 'document' && resultData.result && interviewDate && (
          <div className="w-78 pad:w-104 h-13 bg-[#C6E400] flex justify-center items-center font-semibold text-[0.9rem] pad:text-[1.1rem] drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]">
            최종 결과 발표일: {dayjs(resultDate.finalResultAt).format('M월 D일(ddd) HH:mm')}
          </div>
        )}
        {resultData.test === 'document' && resultData.result && interviewDate && (
          <InterviewTime
            setAllChecked={setAllChecked}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        )}
        <CheckButton
          buttonName={
            resultData.test === 'document' && resultData.result
              ? `${interviewDate ? '면접 날짜 제출하기' : '면접 날짜 확인하기'}`
              : '확인했어요.'
          }
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
