import TimeBar from '@/components/admin/Interview/TimeBar';

export default function DateAddCard({ data }) {
  return (
    <div className="flex justify-between px-5">
      <p className="text-[1.1rem] font-bold">{data.date}</p>
      <div className="flex flex-col gap-4">
        {data.startTime.map((time, index) => (
          <TimeBar key={index} startTime={time} endTime={data.endTime[index]} />
        ))}
      </div>
    </div>
  );
}
