export default function ProjectCategory({ isPrize, ordinalNumber, contestName }) {
  return (
    <div className="flex gap-1">
      {isPrize && (
        <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center bg-white">
          수상작
        </div>
      )}
      <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center bg-white">
        {ordinalNumber}기
      </div>
      <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center bg-white">
        {contestName}
      </div>
    </div>
  );
}
