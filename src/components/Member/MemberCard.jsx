export default function MemberCard({ data }) {
  return (
    <div className="flex flex-col w-59 h-80 border">
      <img src={data.imgUrl} className="w-59 h-54 bg-[#B0B0B0]" />
      <div className="flex flex-col px-6 py-4.5 gap-2">
        <p className="text-[1.325rem] font-bold">{data.name}</p>
        <p className="text-[1rem] ">{data.major}</p>
      </div>
    </div>
  );
}
