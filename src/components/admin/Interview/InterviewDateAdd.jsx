import DateAddCard from '@/components/admin/Interview/DateAddCard';

export default function InterviewDataAdd() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex gap-3">
        <input placeholder="YY.MM.DD" className="w-25 h-12 border focus:outline-none px-4" />
        <div className="flex w-12 h-12 justify-center items-center border">오후</div>
        <div className="flex gap-1 items-center">
          <input placeholder="0:00" className="w-21 h-12 border focus:outline-none px-6" />
          <p>-</p>
          <input placeholder="0:00" className="w-21 h-12 border focus:outline-none px-6" />
        </div>
      </div>

      <div className="text-center">
        <p>등록된 일정이 없습니다.</p>날짜를 입력해 일정을 등록해주세요
      </div>
      <div className="flex flex-col gap-9">
        {/* {dateData.map(()=>{ */}
        <DateAddCard />
        <DateAddCard />
        <DateAddCard />
        {/* })} */}
      </div>
    </div>
  );
}
