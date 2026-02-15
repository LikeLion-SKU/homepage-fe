import { useMemo } from 'react';

export default function ProjectMember({ memberData }) {
  const trackNameMap = {
    FRONTEND: 'Frontend',
    BACKEND: 'Backend',
    PM: 'PM',
    DESIGN: 'Design',
    PO: 'PO',
    PMDESIGN: 'PM&Design',
  };
  // 컴포넌트 내부에서 데이터를 가공합니다.
  const member = useMemo(() => {
    if (!memberData) return [];

    // 1. 트랙별 그룹화
    const grouped = memberData.reduce((acc, member) => {
      const rawTrack = member.track;
      const track = trackNameMap[rawTrack] || rawTrack;
      const { projectMemberName } = member;
      if (!acc[track]) acc[track] = [];
      acc[track].push(projectMemberName);
      return acc;
    }, {});

    // 2. [트랙, [이름...]] 형태의 배열로 변환
    return Object.entries(grouped);
  }, [memberData]);

  return (
    <div className="flex flex-col shrink-0 w-full pad:w-58 web:w-84 px-4 pad:px-6 web:px-8 py-3 pad:py-5 web:py-9 border gap-3">
      {member.map(([track, names]) => (
        <div key={track} className="flex gap-3 pad:gap-5 web:gap-9">
          <p className="text-[0.7rem] w-30 web:w-40 web:text-[1rem] font-semibold pad:font-medium web:font-semibold">
            {track}
          </p>
          <div className="flex gap-x-5 w-full flex-wrap text-[0.7rem] web:text-[1rem]">
            {names.map((name, idx) => (
              <p key={idx}>{name}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
