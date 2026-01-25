import { useState } from 'react';

import MemberCard from '@/components/Member/MemberCard';
import MemberSkeleton from '@/components/Member/MemberSkeleton';

export default function MemberSection({ title, data }) {
  const [isLoading, setIsLoading] = useState(true);
  const skeletonData = [
    {
      name: '대표',
      member: [''],
    },
    {
      name: '부대표',
      member: [''],
    },
    {
      name: 'PO',
      member: ['', '', '', ''],
    },
  ];
  const handleLoading = () => {
    setIsLoading(true);
  }; //esLint 제거를 위해 임시로 넣음
  handleLoading;
  return (
    <>
      {isLoading ? (
        <div className="flex h-500 flex-col gap-12">
          <p className="text-[1.9rem] font-bold">운영진</p>
          <div className="flex flex-col gap-20">
            {skeletonData.map((track) => (
              <div className="flex flex-col gap-5">
                <p className="text-[1.25rem] font-semibold">{track.name}</p>
                <div className="flex w-317 flex-wrap gap-5.5">
                  {track.member.map(() => (
                    <MemberSkeleton />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
