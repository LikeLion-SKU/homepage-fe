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
  const [resultDate, setResultData] = useState({
    finalResultAt: '',
    interviewScheduleConfirmedAt: '',
  });
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
    //서류 합격 검사
    if (resultData.test === 'document' && resultData.result) {
      //면접 수정 기간 검사
      if (interviewDate) {
        //약관 동의 검사
        if (allChecked[1]) {
          //면접 예약 여부 검사
          if (myInterviews.booking.scheduleId) {
            //같은 시간으로 하는지 검사
            if (selectedTime.scheduleId !== myInterviews.booking.scheduleId) {
              try {
                //이전과 일정이 다르면 put
                setIsLoading(true);
                await putInterviewChange(selectedTime.scheduleId);
                showToast('면접 일정이 변경되었습니다.');
                navigate('/');
              } catch (error) {
                console.log('면접 일정 변경 실패:', error);
                setErrorCode(error.response.status);
                setOnModal(true);
              } finally {
                setIsLoading(false);
              }
            } else {
              //일정이 같으면 요청 X
              showToast('기존 일정을 유지합니다.');
              navigate('/');
            }
          } else {
            //이전 일정이 없으면 면접 시간 골랐는지 검사
            if (allChecked[0]) {
              try {
                //골랐으면 새로 예약
                setIsLoading(true);
                interviewBooking(selectedTime.scheduleId);
                showToast('면접 일정이 제출되었습니다.');
                navigate('/');
              } catch (error) {
                console.log('면접 일정 제출 실패:', error);
                setErrorCode(error.response.status);
                setOnModal(true);
              } finally {
                setIsLoading(false);
              }
            } else {
              //안 고르면 고르라고 모달
              setOnModal(true);
            }
          }
        } else {
          //약관 동의 안하면 모달
          setOnModal(true);
        }
      } else {
        //면접 수정 기간 아니면 시간 확인 위해 마이페이지로
        navigate('/mypage');
      }
    } else {
      //탈락이거나 최종 결과일때는 바로 메인으로
      navigate('/');
    }
  };
  const getModalMessage = () => {
    //다 체크 했는지 검사
    if (allChecked[0] && allChecked[1]) {
      //에러코드 검사
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
    setOnModal(false); //다 체크 했는지 검사
    if (allChecked[0] && allChecked[1]) {
      //에러코드 검사
      if (errorCode === 409) {
        //409면 겹쳤으므로 새로고침 시키기
        window.location.reload();
      } else if (errorCode === 400) {
        //400이면 기간 지났으므로 마이페이지
        navigate('/mypage');
      } else {
        //그냥 실패면 새로고침
        window.location.reload();
      }
    }
  };
  return (
    <GridSection>
      <div className="flex flex-col items-center gap-19 pb-60">
        <ResultSection
          pass={resultData}
          interviewScheduleConfirmedAt={dayjs(resultDate.interviewScheduleConfirmedAt).format(
            'M월 D일'
          )}
        />
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
