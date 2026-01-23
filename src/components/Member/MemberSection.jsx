import MemberCard from '@/components/Member/MemberCard';

export default function MemberSection({ title, data }) {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-[1.9rem] font-bold">{title}</p>
      <div className="flex flex-col gap-20">
        {data.map((track) => (
          <div className="flex flex-col gap-5">
            <p className="text-[1.25rem] font-semibold">{track.name}</p>
            <div className="flex w-317 flex-wrap gap-5.5">
              {track.member.map((data) => (
                <MemberCard data={data} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
