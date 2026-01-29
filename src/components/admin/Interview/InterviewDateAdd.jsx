import { useState } from 'react';

import DateAddCard from '@/components/admin/Interview/DateAddCard';

export default function InterviewDataAdd({ dateData }) {
  const [inputData, setInputData] = useState({ date: '', startTime: '', endTime: '' });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData, // 기존 값 복사
      [name]: value, // 해당 name을 가진 키만 수정
    });
  };

  const addDate = (e) => {
    if (
      e.key == 'Enter' &&
      inputData.date !== '' &&
      inputData.startTime !== '' &&
      inputData.endTime !== ''
    ) {
      //실제 추가 로직
      setInputData({ date: '', startTime: '', endTime: '' });
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
            <DateAddCard data={data} />
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
