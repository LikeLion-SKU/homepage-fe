import TimeBox from '@/components/result/TimeBox';
import useInterviewStore from '@/store/useInterviewStore';

export default function TimeBar({ setAllChecked, data, selectedTime, setSelectedTime }) {
  const date = new Date(data.date);
  const month = date.getMonth();
  const day = date.getDate();
  // 요일 이름을 담은 배열 (0: 일요일 ~ 6: 토요일)
  const weekDays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  // date.getDay()는 0~6 사이의 숫자를 반환합니다.
  const dayName = weekDays[date.getDay()];
  const { myInterviews } = useInterviewStore();
  return (
    <div className="flex flex-col w-full max-w-78 pad:max-w-176 web:max-w-221">
      <div className="inline-block">
        <p className="text-[0.9rem] pad:text-[1.25rem] font-semibold pad:font-medium mb-4 text-center">
          {`${month}월 ${day}일 [${dayName}]`}
        </p>
        <div className="grid justify-center grid-cols-[repeat(auto-fit,148px)] pad:grid-cols-[repeat(auto-fit,164px)] gap-4">
          {data.times.map((time) => (
            <TimeBox
              key={time.scheduleId}
              setAllChecked={setAllChecked}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              data={{
                date: data.date,
                startTime: time.startTime,
                endTime: time.endTime,
                booked: myInterviews.booking.scheduleId === time.scheduleId ? false : time.booked,
                scheduleId: time.scheduleId,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
