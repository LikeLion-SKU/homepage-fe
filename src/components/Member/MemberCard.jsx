export default function MemberCard({ data }) {
  return (
    <div className="flex flex-col w-38 h-54 pad:w-54 pad:h-80 web:w-59 border">
      <img src={data.imgUrl} className="w-38 h-37 pad:w-54 pad:h-54 web:w-59 bg-[#B0B0B0]" />
      <div className="flex flex-col px-5 py-3 pad:px-6 pad:py-4.5 gap-1 pad:gap-2">
        <p className="text-[1.1rem] pad:text-[1.325rem] font-bold">{data.name}</p>
        <p className="text-[0.7rem] pad:text-[1rem] ">{data.major}</p>
      </div>
    </div>
  );
}
