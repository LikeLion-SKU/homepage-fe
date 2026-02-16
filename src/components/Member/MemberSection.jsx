import MemberCard from '@/components/Member/MemberCard';

export default function MemberSection({ title, data }) {
  const trackMap = {
    PO: 'PO',
    PM: 'PM',
    PMDESIGN: 'PM&DESIGN',
    DESIGN: 'DESIGN',
    FRONTEND: 'FRONTEND',
    BACKEND: 'BACKEND',
  };
  return (
    <div className="flex flex-col gap-12">
      <p className="text-[1.2rem] pad:text-[1.9rem] font-bold">{title}</p>
      <div className="flex gap-5">
        {data.map(
          (memberData) =>
            (memberData.position == 'LEAD' || memberData.position == 'COLEAD') && (
              <div className="flex flex-col gap-5">
                <p className="text-[1rem] pad:text-[1.25rem] font-semibold">
                  {memberData.position == 'LEAD' ? '대표' : '부대표'}
                </p>
                <div className="flex flex-wrap gap-2 pad:gap-4 web:gap-5.5">
                  {memberData.clubMembers.map((data, index) => (
                    <MemberCard key={index} data={data} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
      <div className="flex flex-col gap-20">
        {data.map(
          (memberData) =>
            memberData.position !== 'LEAD' &&
            memberData.position !== 'COLEAD' && (
              <div className="flex flex-col gap-5">
                <p className="text-[1rem] pad:text-[1.25rem] font-semibold">
                  {trackMap[memberData.track]}
                </p>
                <div className="flex flex-wrap gap-2 pad:gap-4 web:gap-5.5">
                  {memberData.clubMembers.map((data, index) => (
                    <MemberCard key={index} data={data} />
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
