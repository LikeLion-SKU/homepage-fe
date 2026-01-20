import TitleSection from '@/components/common/TitleSection';
import ProjectOption from '@/components/project/ProjectOption';
import ProjectSection from '@/components/project/ProjectSection';
import { projectData } from '@/components/project/projectDummyData';

export default function Project() {
  return (
    <div className="flex flex-col px-14.5 py-12">
      <TitleSection
        title="프로젝트"
        pageExplanation="서경대학교 멋쟁이사자처럼에서 탄생한 다양한 서비스를 둘러보세요!"
      >
        <ProjectOption />
      </TitleSection>
      <ProjectSection data={projectData} />
      {!(projectData.length > 0) && (
        <div className="flex w-330 h-40 justify-center items-center text-[1.1rem] font-bold">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
