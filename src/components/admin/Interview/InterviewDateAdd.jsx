import { useState } from 'react';
import { useOutletContext } from 'react-router';

import { postInterviewSchedule } from '@/api/interviewSchedule';
import DateAddCard from '@/components/admin/Interview/DateAddCard';
import useAdminInterviewStore from '@/store/useAdminInterviewStore';

export default function InterviewDataAdd({ dateData, track }) {
  const [inputData, setInputData] = useState({ date: '', startTime: '', endTime: '' });
  const { interviews } = useAdminInterviewStore();
  //@ts-ignore
  const { showToast } = useOutletContext();
  const formatDate = (dateStr) => {
    // '26.03.20' -> ['26', '03', '20']
    const [yy, mm, dd] = dateStr.split('.');
    return `20${yy}-${mm}-${dd}`;
  };

  const formatTime = (timeStr) => {
    // '19:00' -> '19:00:00'
    return `${timeStr}:00`;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData, // 기존 값 복사
      [name]: value, // 해당 name을 가진 키만 수정
    });
  };

  const addDate = async (e) => {
    try {
      if (
        e.key == 'Enter' &&
        inputData.date !== '' &&
        inputData.startTime !== '' &&
        inputData.endTime !== ''
      ) {
        const dateData = {
          date: formatDate(inputData.date),
          startTime: formatTime(inputData.startTime),
          endTime: formatTime(inputData.endTime),
        };
        const parameter = { semester: interviews.semester, track: track };
        console.log(dateData);
        await postInterviewSchedule(parameter, dateData);
        setInputData({ date: '', startTime: '', endTime: '' });
      }
    } catch (error) {
      console.log('일정 추가 실패:', error);
      showToast('일정 형식을 다시 한번 확인해주세요');
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex gap-3">
        <input
          name="date"
          value={inputData.date}
          onChange={(e) => handleInput(e)}
          placeholder="YY.MM.DD"
          className="w-25 h-12 border focus:outline-none pl-3"
        />
        <div className="flex gap-1 items-center">
          <input
            name="startTime"
            value={inputData.startTime}
            onChange={(e) => handleInput(e)}
            placeholder="00:00"
            className="w-21 h-12 border focus:outline-none pl-5"
          />
          <p>-</p>
          <input
            name="endTime"
            value={inputData.endTime}
            onChange={(e) => handleInput(e)}
            onKeyDown={(e) => addDate(e)}
            placeholder="00:00"
            className="w-21 h-12 border focus:outline-none pl-5"
          />
        </div>
      </div>
      {dateData.length > 0 && dateData ? (
        <div className="flex flex-col gap-9">
          {dateData.map((data) => (
            <DateAddCard data={data} track={track} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>등록된 일정이 없습니다.</p>날짜를 입력해 일정을 등록해주세요
        </div>
      )}
    </div>
  );
}
