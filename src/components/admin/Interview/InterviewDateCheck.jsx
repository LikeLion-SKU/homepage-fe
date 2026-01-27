import DateCheckCard from '@/components/admin/Interview/DateCheckCard';

export default function InterviewDataCheck({ dateData }) {
  return (
    <div className="flex flex-col gap-12">
      {dateData.length > 0 && dateData ? (
        <div className="flex flex-col gap-9">
          {dateData.map((data) => (
            <DateCheckCard data={data} />
          ))}
        </div>
      ) : (
        <p className="text-center">등록된 면접 일정이 없습니다.</p>
      )}
    </div>
  );
}
