import { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate, useOutletContext } from 'react-router';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState(0);
  //@ts-ignore
  const { showToast } = useOutletContext();

  useEffect(() => {
    if (!location.state?.fromA) {
      alert('잘못된 접근입니다. 정해진 페이지를 통해서 들어와주세요.');
      navigate('/', { replace: true }); // 메인으로 튕겨내기 (replace: 뒤로가기 방지)
    }
    const getInterviewDate = async () => {
      setInterviewDate(await availbleChangeInterview());
      setResultData(await getCurrentForm());
    };
    getInterviewDate();
  }, [location, navigate]);

  const buttonClick = async () => {
    if (resultData.test === 'document' && resultData.result) {
      if (allChecked[0] && allChecked[1]) {
        if (interviewDate) {
          if (myInterviews.booking.scheduleId) {
            if (selectedTime.scheduleId !== myInterviews.booking.scheduleId) {
              try {
                setIsLoading(true);
                await putInterviewChange(selectedTime.scheduleId);
                showToast('면접 일정이 변경되었습니다.');
                navigate('/');
              } catch (error) {
                setErrorCode(error.response.status);
                setOnModal(true);
              } finally {
                setIsLoading(false);
              }
            } else {
              showToast('기존 일정을 유지합니다.');
              navigate('/');
            }
          } else {
            try {
              setIsLoading(true);
              interviewBooking(selectedTime.scheduleId);
              showToast('면접 일정이 제출되었습니다.');
              navigate('/');
            } catch (error) {
              setErrorCode(error.response.status);
              setOnModal(true);
            } finally {
              setIsLoading(false);
            }
          }
        } else {
          navigate('/mypage'); //추후 면접 확인 페이지로 경로 변동 예정
        }
      } else {
        setOnModal(true);
      }
    } else {
      navigate('/');
    }
  };
  const getModalMessage = () => {
    if (allChecked[0] && allChecked[1]) {
      if (errorCode === 409) {
        return '이미 예약된 면접 일정입니다.';
      } else if (errorCode === 400) {
        return '면접 예약 기간이 아닙니다.';
      } else {
        return '면접 예약에 실패했습니다.';
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
      if (errorCode === 409) {
        window.location.reload();
      } else if (errorCode === 400) {
        navigate('/mypage');
      } else {
        window.location.reload();
      }
    }
  };
  return (
    <GridSection>
      <div className="flex flex-col items-center gap-19 pb-60">
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
      {onModal && !isLoading && (
        <CheckModal isOpen={onModal} cancel={() => modalClick()}>
          {getModalMessage()}
        </CheckModal>
      )}
    </GridSection>
  );
}
