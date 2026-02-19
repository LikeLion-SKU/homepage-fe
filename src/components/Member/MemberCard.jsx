import defaultImg from '@/assets/icons/default_Img.svg';

export default function MemberCard({ data }) {
  return (
    <div className="flex flex-col w-40 h-fit pad:w-54 pad:h-fit web:w-59 border pad:border-2">
      <img
        src={data.profileImageUrl || defaultImg}
        className="w-40 h-37 pad:w-54 pad:h-54 web:w-59 bg-[#F9F9F9] object-cover object-center"
      />
      <div className="flex flex-col flex-1 px-3 py-2 pad:px-6 pad:py-4.5 gap-1 pad:gap-2 bg-[#F8FBE7] border-t-2">
        <p className="text-[1.125rem] pad:text-[1.325rem] font-bold">{data.name}</p>
        <div className="flex flex-col">
          <p className="text-[0.8rem] pad:text-[1rem] truncate">{`${data.department}`}</p>
          <p className="text-[0.8rem] pad:text-[1rem]">{`${data.shortStudentNumber}학번`}</p>
        </div>
      </div>
    </div>
  );
}
