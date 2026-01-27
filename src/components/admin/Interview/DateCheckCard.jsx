import InterviewDateBox from '@/components/admin/Interview/InterviewDateBox';

export default function DateCheckCard({ data }) {
  return (
    <div className="flex justify-between px-5 gap-5">
      <p className="text-[1.1rem] font-bold">{data.date}</p>
      <div className="flex flex-col gap-4">
        {data.startTime.map((time, index) => (
          <InterviewDateBox
            startTime={time}
            endTime={data.endTime[index]}
            personalData={data.personalData[index]}
          />
        ))}
      </div>
    </div>
  );
}
