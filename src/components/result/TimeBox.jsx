export default function TimeBox({
  setAllChecked,
  selectedTime,
  setSelectedTime,
  data = { date: '', startTime: '', endTime: '', booked: false, scheduleId: 0 },
}) {
  const handleCheck = () => {
    console.log(data.scheduleId);
    if (data.booked) return;
    setSelectedTime({ date: data.date, scheduleId: data.scheduleId });
    setAllChecked((prev) => prev.map((item, index) => (index === 0 ? true : item)));
  };
  const getAvailable = () => {
    if (data.booked) return 'bg-[#E9E9E9] cursor-not-allowed border-[#B0B0B0] text-[#B0B0B0]';
    if (selectedTime.date === data.date && selectedTime.scheduleId === data.scheduleId) {
      return 'bg-[#C6E400]'; // 선택됐을 때
    }
    return 'bg-[#F9F9F9]'; // 가능하지만 선택 안 됐을 때
  };

  return (
    <button
      onClick={() => handleCheck()}
      disabled={data.booked}
      className={`flex w-37 h-9 pad:w-41 pad:h-13 text-center justify-center items-center font-semibold pad:font-medium
        border text-[0.9rem] pad:text-[1.1rem] ${getAvailable()} `}
    >
      {data.startTime?.slice(0, 5)}
      <span
        className={`inline-block h-px w-5 mx-1 ${data.booked ? 'bg-black' : 'bg-[#B0B0B0]'} `}
      />
      {data.endTime?.slice(0, 5)}
    </button>
  );
}
