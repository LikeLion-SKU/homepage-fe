export default function ProjectCategory({ award, semester, projectTypeName }) {
  return (
    <div className="flex gap-1">
      {award && (
        <div
          className="flex border-2 border-linear-to-r animate-pulse from-[#BCD800] to-[#65C42A] border-[#B8D300] rounded-3xl h-3.5 pad:h-5 px-2 text-[#B8D300] 
        text-[0.7rem] web:text-[0.9rem] text-center items-center bg-white"
        >
          수상작
        </div>
      )}
      <div
        className="flex border rounded-3xl h-3.5 pad:h-5 px-1
      text-[0.7rem] web:text-[0.9rem] text-center items-center bg-white"
      >
        {semester}기
      </div>
      <div
        className="flex border rounded-3xl h-3.5 pad:h-5 px-2
      text-[0.7rem] web:text-[0.9rem] text-center items-center bg-white"
      >
        {projectTypeName}
      </div>
    </div>
  );
}
