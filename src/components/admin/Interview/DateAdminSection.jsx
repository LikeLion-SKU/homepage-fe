import { useState } from 'react';

//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import TrackDateBox from '@/components/admin/Interview/TrackDateBox';

export default function DateAdminSection() {
  const interviewData = [
    { track: 'PO', date: { '26.03.27': ['6:00'] } },
    { track: 'Frotend' },
    { track: 'Backend' },
  ];
  const [isDateAdd, setIsDateAdd] = useState(true);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setIsDateAdd(true)}
            className={`w-35 h-9.5 border text-center items-center 
                    ${isDateAdd ? 'bg-[#D8D8D8]' : 'bg-white'}`}
          >
            면접 일정 등록
          </button>
          <button
            onClick={() => setIsDateAdd(false)}
            className={`w-35 h-9.5 border text-center items-center
                    ${isDateAdd ? 'bg-white' : 'bg-[#D8D8D8]'}`}
          >
            면접 일정 관리
          </button>
        </div>
        {!isDateAdd && (
          <div className="flex gap-6.5 items-center">
            <button className="w-56 h-9 border bg-[#F9F9F9]">면접일</button>
            <div className="flex border w-83 h-10 items-center justify-center gap-7">
              <Search />
              <input placeholder="검색하기" className="w-60 placeholder:text-black" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {interviewData.map((data) => (
          <TrackDateBox data={data} isDataAdd={isDateAdd} />
        ))}
      </div>
    </div>
  );
}
