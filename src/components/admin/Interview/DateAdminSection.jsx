import { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';

import { getInterviewBookingAdmin } from '@/api/interviewBooking';
import { getInterviewScheduleAdmin } from '@/api/interviewSchedule';
//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
//@ts-ignore
import Calender from '@/assets/icons/calender_icon.svg?react';
import TrackDateBox from '@/components/admin/Interview/TrackDateBox';
import OptionBox from '@/components/common/Option/optionBox';
import useAdminBookingStore from '@/store/useAdminBookingStore';
import useAdminInterviewStore from '@/store/useAdminInterviewStore';

export default function DateAdminSection() {
  const [isDateAdd, setIsDateAdd] = useState(true);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-CA');
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const dateInputRef = useRef(null);
  const semesterData = useLoaderData();
  const [selectedSemester, setSelectedSemester] = useState(semesterData[0]);
  const { interviews, setInterviewSchedule } = useAdminInterviewStore();
  const { bookingInterviews, setBookingSchedule } = useAdminBookingStore();
  const [searchName, setSearchName] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 버튼 클릭 시 숨겨진 input을 클릭하게 함
  const handleButtonClick = () => {
    dateInputRef.current?.showPicker(); // 최신 브라우저에서 달력을 바로 띄우는 메서드
  };
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchName), 800);
    return () => clearTimeout(t);
  }, [searchName]);
  useEffect(() => {
    const getInterviewData = async () => {
      if (isDateAdd) {
        const parameter = { semester: parseInt(selectedSemester) };
        setInterviewSchedule(await getInterviewScheduleAdmin(parameter));
      } else {
        let parameter;
        if (debouncedSearch === '') {
          parameter = { semester: parseInt(selectedSemester), date: selectedDate };
        } else {
          parameter = {
            semester: parseInt(selectedSemester),
            date: selectedDate,
            search: debouncedSearch,
          };
        }
        setBookingSchedule(await getInterviewBookingAdmin(parameter)); //예약된 면접 스케줄 api
      }
    };
    getInterviewData();
  }, [isDateAdd, selectedSemester, selectedDate, debouncedSearch]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div>
            <OptionBox
              initValue={semesterData[0]}
              optionData={semesterData}
              selectedNum={selectedSemester}
              setSelectedNum={setSelectedSemester}
            />
          </div>
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
            <button
              onClick={() => handleButtonClick()}
              className="relative flex w-56 h-9 justify-center items-center border bg-[#F9F9F9] gap-3"
            >
              <p className="font-bold">면접일</p>
              <p className="text-[#787878]">{selectedDate}</p>
              <Calender />
              <input
                type="date"
                ref={dateInputRef}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="absolute top-10 left-0 w-0 h-0 opacity-0" // 화면에서 숨김
              />
            </button>

            <div className="flex border w-83 h-10 items-center justify-center gap-7">
              <Search />
              <input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="검색하기"
                className="w-60 placeholder:text-black"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        {isDateAdd
          ? interviews.tracks.map((data) => <TrackDateBox data={data} isDataAdd={isDateAdd} />)
          : bookingInterviews.tracks.map((data) => (
              <TrackDateBox data={data} isDataAdd={isDateAdd} />
            ))}
      </div>
    </div>
  );
}
