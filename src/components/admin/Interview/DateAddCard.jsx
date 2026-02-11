import TimeBar from '@/components/admin/Interview/TimeBar';

export default function DateAddCard({ data, track }) {
  return (
    <div className="flex justify-between px-5">
      <p className="text-[1.1rem] font-bold">{data.date}</p>
      <div className="flex flex-col gap-4">
        {data.times.map((timeData) => (
          <TimeBar key={timeData.scheduleId} data={timeData} track={track} />
        ))}
      </div>
    </div>
  );
}
