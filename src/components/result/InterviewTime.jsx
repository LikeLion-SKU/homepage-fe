import { useEffect } from 'react';

import { getInterviewBooking } from '@/api/interviewBooking';
import { getInterviewSchedule } from '@/api/interviewSchedule';
import PageTitle from '@/components/common/PageTitle';
import Agreement from '@/components/result/Agreement';
import TimeBar from '@/components/result/TimeBar';
import useInterviewStore from '@/store/useInterviewStore';

// true: 동의 부분 숨기기, false: 동의 부분 보이게
export default function InterviewTime({
  setAllChecked,
  hide = false,
  selectedTime,
  setSelectedTime,
}) {
  const { interviews, setInterviewSchdule, setMyInterview } = useInterviewStore();
  useEffect(() => {
    const getInterview = async () => {
      setInterviewSchdule(await getInterviewSchedule());
      const bookingData = await getInterviewBooking();
      setSelectedTime(
        bookingData.booking.scheduleId
          ? { date: bookingData.booking.date, scheduleId: bookingData.booking.scheduleId }
          : { date: '', scheduleId: 0 }
      );
      setMyInterview(bookingData);
    };
    getInterview();
  }, []);

  return (
    <div className="flex flex-col w-full gap-20 items-center mt-30 px-8">
      <div className="flex">
        <PageTitle title="면접 날짜 선택" color="Navy" />
      </div>
      <div className="flex flex-col items-center gap-13 w-full ">
        {interviews?.dates.map((data, index) => (
          <TimeBar
            key={index}
            setAllChecked={setAllChecked}
            data={data}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        ))}
      </div>
      <Agreement setAllChecked={setAllChecked} hide={hide}></Agreement>
    </div>
  );
}
