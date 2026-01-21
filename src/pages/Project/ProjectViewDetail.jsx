import { useState } from 'react';

//@ts-ignore
import Left from '@/assets/icons/left_anglebraket_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_anglebraket_icon.svg?react';
import Toast from '@/components/common/Toast/Toast';
import ProjectDetailCard from '@/components/project/ProjectDetailCard';

export default function ProjectViewDetail() {
  const data = {
    isPrize: 1,
    imgUrl: ['1', '2', '3', '4', '5', '6'],
    projectName: '단추',
    ordinalNumber: 13,
    contestName: '중앙톤',
    explanation: '지류 쿠폰을 디지털화하여 편리하게 관리하고 단골이 되어보세요!',
  };
  const [isToast, setIsToast] = useState(false);
  const onToastMessage = () => {
    if (isToast) return;
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center py-15 ">
      <div className="flex flex-col ">
        <div className="flex items-center justify-center rounded-l-2xl mt-85 w-20 h-32 bg-[#F9F9F9] ml-auto">
          <Left />
        </div>
        <p className="text-[0.7rem] text-[#B0B0B0] font-bold tracking-tighter mr-5">
          이전 프로젝트 보기
        </p>
      </div>
      <ProjectDetailCard data={data} />
      <div className="flex flex-col ">
        <button
          onClick={() => onToastMessage()}
          className="flex items-center justify-center rounded-r-2xl mt-85 w-20 h-32 bg-[#F9F9F9] mr-auto relative z-1"
        >
          <Right />
        </button>
        <p className="text-[0.7rem] text-[#B0B0B0] font-bold tracking-tighter ml-5">
          다음 프로젝트 보기
        </p>
      </div>
      <Toast isToast={isToast} />
    </div>
  );
}
