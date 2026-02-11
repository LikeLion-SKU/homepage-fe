import InterviewDateBox from '@/components/admin/Interview/InterviewDateBox';

export default function DateCheckCard({ data }) {
  return (
    <div className="flex justify-between px-5 gap-5">
      <p className="text-[1.1rem] font-bold">{data.date.replaceAll('-', '.')}</p>
      <div className="flex flex-col gap-4">
        {data.times.length > 0 ? (
          data.times.map((interviewData) => (
            <InterviewDateBox
              key={interviewData.scheduleId}
              startTime={interviewData.startTime}
              endTime={interviewData.endTime}
              personalData={interviewData.bookingInfo}
            />
          ))
        ) : (
          <p className="text-[1.1rem] font-bold mr-10">등록된 지원자가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
