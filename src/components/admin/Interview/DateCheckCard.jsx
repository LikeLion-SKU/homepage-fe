import InterviewDateBox from '@/components/admin/Interview/InterviewDateBox';

export default function DateCheckCard({ data }) {
  return (
    <div className="flex justify-between px-5 gap-5">
      <p className="text-[1.1rem] font-bold">{data.date.replaceAll('-', '.')}</p>
      <div className="flex flex-col gap-4">
        {data.slots.map((interviewData, index) => (
          <InterviewDateBox
            key={index}
            startTime={interviewData.startTime}
            endTime={interviewData.endTime}
            personalData={interviewData.person}
          />
        ))}
      </div>
    </div>
  );
}
