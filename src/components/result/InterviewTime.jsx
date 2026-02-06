import { useEffect, useState } from 'react';

import { getInterviewSchedule } from '@/api/interviewSchedule';
import PageTitle from '@/components/common/PageTitle';
import Agreement from '@/components/result/Agreement';
import TimeBar from '@/components/result/TimeBar';

// true: 동의 부분 숨기기, false: 동의 부분 보이게
export default function InterviewTime({
  setAllChecked,
  hide = false,
  selectedTime,
  setSelectedTime,
}) {
  const [interviewSchedule, setinterviewSchedule] = useState({
    semester: 0,
    documentPassed: true,
    track: '',
    dates: [],
  });
  useEffect(() => {
    const getInterview = async () => {
      setinterviewSchedule(await getInterviewSchedule());
    };
    getInterview();
  }, []);

  return (
    <div className="flex flex-col w-full gap-20 items-center mt-30 px-8">
      <div className="flex">
        <PageTitle title="면접 날짜 선택" color="Navy" />
      </div>
      <div className="flex flex-col items-center gap-13 w-full ">
        {interviewSchedule.dates.map((data, index) => (
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
