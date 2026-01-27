export default function TimeBox({
  setAllChecked,
  selectedTime,
  setSelectedTime,
  data = { date: '', startTime: '', endTime: '', available: 1 },
}) {
  const handleCheck = () => {
    if (data.available === 0) return;
    setSelectedTime({ date: data.date, startTime: data.startTime });
    setAllChecked((prev) => prev.map((item, index) => (index === 0 ? true : item)));
  };
  const getAvailable = () => {
    if (data.available === 0)
      return 'bg-[#E9E9E9] cursor-not-allowed border-[#B0B0B0] text-[#B0B0B0]';
    if (selectedTime.date === data.date && selectedTime.startTime === data.startTime) {
      return 'bg-[#C6E400]'; // 선택됐을 때
    }
    return 'bg-[#F9F9F9]'; // 가능하지만 선택 안 됐을 때
  };

  return (
    <button
      onClick={() => handleCheck()}
      disabled={data.available === 0}
      className={`flex w-41 h-13 text-center justify-center items-center border text-[1.1rem]
        ${getAvailable()} `}
    >
      {data.startTime}
      <span
        className={`inline-block h-px w-5 mx-1 ${data.available === 1 ? 'bg-black' : 'bg-[#B0B0B0]'} `}
      />
      {data.endTime}
    </button>
  );
}
