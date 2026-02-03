import TimeBox from '@/components/result/TimeBox';

export default function TimeBar({ setAllChecked, data, selectedTime, setSelectedTime }) {
  return (
    <div className="flex flex-col w-full max-w-78 pad:max-w-176 web:max-w-221">
      <div className="inline-block">
        <p className="text-[0.9rem] pad:text-[1.25rem] font-semibold pad:font-medium mb-4 text-center">
          {data.date}
        </p>
        <div className="grid justify-center grid-cols-[repeat(auto-fit,148px)] pad:grid-cols-[repeat(auto-fit,164px)] gap-4">
          {data.startTime.map((time, index) => (
            <TimeBox
              key={index}
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
    </div>
  );
}
