import { useState } from 'react';

import PageTitle from '@/components/common/PageTitle';
import Agreement from '@/components/result/Agreement';
import TimeBar from '@/components/result/TimeBar';

// true: 동의 부분 숨기기, false: 동의 부분 보이게
export default function InterviewTime({ setAllChecked, hide = false }) {
  const interviewTimeData = [
    {
      date: '3월 10일 [월요일]',
      startTime: ['6:00', '6:30', '7:00', '7:30'],
      endTime: ['6:30', '7:00', '7:30', '8:00'],
      available: [0, 1, 1, 1],
    },
    {
      date: '3월 11일 [화요일]',
      startTime: ['6:00', '6:30', '7:00', '7:30'],
      endTime: ['6:30', '7:00', '7:30', '8:00'],
      available: [0, 1, 1, 0],
    },
  ];
  const [selectedTime, setSelectedTime] = useState({ date: '', starTime: '' });

  return (
    <div className="flex flex-col w-full gap-20 items-center mt-30 px-8">
      <div className="flex">
        <PageTitle title="면접 날짜 선택" color="Navy" />
      </div>
      <div className="flex flex-col items-center gap-13 w-full ">
        {interviewTimeData.map((data, index) => (
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
