import TimeBox from '@/components/result/TimeBox';

export default function TimeBar({ setAllChecked, data, selectedTime, setSelectedTime }) {
  return (
    <div className="flex flex-col gap-5 items-center pad:items-start">
      <p className="text-[1.25rem] ">{data.date}</p>
      <div className="flex gap-4 flex-wrap justify-center pad:justify-start">
        {data.startTime.map((time, index) => (
          <TimeBox
            setAllChecked={setAllChecked}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            data={{
              date: data.date,
              startTime: time,
              endTime: data.endTime[index],
              available: data.available[index],
            }}
          />
        ))}
      </div>
    </div>
  );
}
