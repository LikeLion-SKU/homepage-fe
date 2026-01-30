import { useOutletContext } from 'react-router';

//@ts-ignore
import Left from '@/assets/icons/left_anglebraket_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_anglebraket_icon.svg?react';
import GridSection from '@/components/layout/background/GridSection';
import ProjectDetailCard from '@/components/project/ProjectDetailCard';

export default function ProjectViewDetail() {
  const data = {
    isPrize: 1,
    imgUrl: ['1', '2', '3', '4', '5', '6'],
    projectName: '단추',
    ordinalNumber: 13,
    contestName: '중앙톤',
    explanation: '지류 쿠폰을 디지털화하여 편리하게 관리하고 단골이 되어보세요!',
    member: {
      PM: ['신채린', '금시언'],
      Design: ['김현수', '윤희준'],
      Frontend: ['정영진', '임다현', '경찬희', '이은현'],
      Backend: ['정목진', '심서현', '최운조'],
    },
  };
  //@ts-ignore
  const { showToast } = useOutletContext();

  return (
    <GridSection>
      <div className="flex px-5 pad:px-10 web:px-15 pt-18 pb-41">
        <div className="flex flex-col ">
          <div className="flex px-1 py-3 pad:px-3 pad:py-5 web:px-6.5 web:py-8 rounded-l-2xl mt-50 pad:mt-85 bg-[#F9F9F9] ml-auto">
            <Left className="web:w-9 pad:w-7 w-5" />
          </div>
          <p className="text-[0.3rem] pad:text-[0.5rem] web:text-[0.7rem] text-[#B0B0B0] font-bold tracking-tighter">
            이전 프로젝트 보기
          </p>
        </div>
        <ProjectDetailCard data={data} />
        <div className="flex flex-col ">
          <button
            onClick={() => showToast('마지막 프로젝트 입니다.')}
            className="flex px-1 py-3 pad:px-3 pad:py-5 web:px-6.5 web:py-8 rounded-r-2xl mt-50 pad:mt-85 bg-[#F9F9F9] mr-auto relative z-1"
          >
            <Right className="web:w-9 pad:w-7 w-5" />
          </button>
          <p className="text-[0.3rem] pad:text-[0.5rem] web:text-[0.7rem] text-[#B0B0B0] font-bold tracking-tighter text-end">
            다음 프로젝트 보기
          </p>
        </div>
      </div>
    </GridSection>
  );
}
