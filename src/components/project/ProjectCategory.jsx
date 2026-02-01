export default function ProjectCategory({ isPrize, ordinalNumber, contestName }) {
  return (
    <div className="flex gap-1">
      {isPrize && (
        <div
          className="flex border-2 border-[#B8D300] rounded-3xl h-3.5 pad:h-5 px-2 text-[#B8D300] 
        text-[0.6rem] web:text-[0.9rem] text-center items-center bg-white"
        >
          수상작
        </div>
      )}
      <div
        className="flex border rounded-3xl h-3.5 pad:h-5 px-1
      text-[0.6rem] web:text-[0.9rem] text-center items-center bg-white"
      >
        {ordinalNumber}기
      </div>
      <div
        className="flex border rounded-3xl h-3.5 pad:h-5 px-2
      text-[0.6rem] web:text-[0.9rem] text-center items-center bg-white"
      >
        {contestName}
      </div>
    </div>
  );
}
