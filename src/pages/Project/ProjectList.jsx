import TitleSection from '@/components/common/TitleSection';
import ProjectOption from '@/components/project/ProjectOption';
import ProjectSection from '@/components/project/ProjectSection';

export default function Project() {
  return (
    <div className="flex flex-col px-14.5 py-12">
      <TitleSection
        title="프로젝트"
        pageExplanation="서경대학교 멋쟁이사자처럼에서 탄생한 다양한 서비스를 둘러보세요!"
      >
        <ProjectOption />
      </TitleSection>
      <ProjectSection />
    </div>
  );
}
