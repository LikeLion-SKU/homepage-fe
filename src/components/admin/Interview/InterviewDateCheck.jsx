import DateCheckCard from '@/components/admin/Interview/DateCheckCard';

export default function InterviewDataCheck() {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-center">등록된 면접 일정이 없습니다.</p>
      <div className="flex flex-col gap-9">
        {/* {dateData.map(()=>{ */}
        <DateCheckCard />
        <DateCheckCard />
        <DateCheckCard />
        {/* })} */}
      </div>
    </div>
  );
}
