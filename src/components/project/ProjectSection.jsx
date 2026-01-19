import ProjectCard from '@/components/project/ProjectCard';

export default function ProjectSection() {
  const data = {
    imgUrl: '@/assets/icons/Logo_icon.png',
    projectName: '단추',
    ordinalNumber: 13,
    contestName: '중앙톤',
    explanation: '지류 쿠폰을 디지털화하여 편리하게 관리하고 단골이 되어보세요!',
  };
  return (
    <div className="grid grid-cols-3 gap-x-7 gap-y-15 mt-15">
      <ProjectCard props={data} />
    </div>
  );
}
