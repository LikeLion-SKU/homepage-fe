//@ts-ignore
import Left from '@/assets/icons/left_anglebraket_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_anglebraket_icon.svg?react';
import ProjectDetailCard from '@/components/project/ProjectDetailCard';

export default function ProjectViewDetail() {
  const data = {
    isPrize: 1,
    imgUrl: '@/assets/icons/Logo_icon.png',
    projectName: '단추',
    ordinalNumber: 13,
    contestName: '중앙톤',
    explanation: '지류 쿠폰을 디지털화하여 편리하게 관리하고 단골이 되어보세요!',
  };
  return (
    <div className="flex justify-center py-15 gap-7.5">
      <div className="mt-85">
        <Left />
      </div>
      <ProjectDetailCard props={data} />
      <div className="mt-85">
        <Right />
      </div>
    </div>
  );
}
