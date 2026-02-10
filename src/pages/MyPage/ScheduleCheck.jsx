import { useEffect, useState } from 'react';

import { getInterviewBooking } from '@/api/interviewBooking';
import { getInterviewSchedule } from '@/api/interviewSchedule';
import PageTitle from '@/components/common/PageTitle';
import GridSection from '@/components/layout/background/GridSection';
import TimeBar from '@/components/result/TimeBar';
import useInterviewStore from '@/store/useInterviewStore';

export default function ScheduleCheck() {
  const [selectedTime, setSelectedTime] = useState({ date: '', scheduleId: 0 });
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
  }, [setInterviewSchdule, setMyInterview, setSelectedTime]);

  return (
    <GridSection>
      <div className="flex flex-col items-center gap-19 mb-60">
        <div className="flex flex-col w-full gap-20 items-center mt-30 px-8">
          <div className="flex">
            <PageTitle title="면접 날짜 확인" color="Navy" />
          </div>
          <div className="text-xl font-bold">면접 일정이 확정되었습니다.</div>
          <div className="flex flex-col items-center gap-13 w-full ">
            {interviews?.dates.map((data, index) => (
              <TimeBar
                key={index}
                setAllChecked={() => {}}
                data={data}
                selectedTime={selectedTime}
                disabled={true}
                setSelectedTime={setSelectedTime}
              />
            ))}
          </div>
        </div>
      </div>
    </GridSection>
  );
}
