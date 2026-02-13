import defaultImg from '@/assets/icons/default_Img.svg';

export default function MemberCard({ data }) {
  return (
    <div className="flex flex-col w-40 h-54 pad:w-54 pad:h-80 web:w-59 border-2">
      <img
        src={data.profileImageUrl || defaultImg}
        className="w-40 h-37 pad:w-54 pad:h-54 web:w-59 bg-[#F9F9F9]"
      />
      <div className="flex flex-col flex-1 px-3 pt-2 pad:px-6 pad:pt-4.5 gap-1 pad:gap-2 bg-[#F8FBE7] border-t-2">
        <p className="text-[1.1rem] pad:text-[1.325rem] font-bold">{data.name}</p>
        <p className="text-[0.7rem] pad:text-[1rem] whitespace-nowrap">{`${data.department} ${data.shortStudentNumber}학번`}</p>
      </div>
    </div>
  );
}
