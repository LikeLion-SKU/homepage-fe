import ProjectCard from '@/components/project/ProjectCard';
import { projectData } from '@/components/project/projectDummyData';

export default function ProjectSection() {
  return (
    <div className="grid grid-cols-3 gap-x-7 gap-y-15 mt-15">
      {projectData.map((data) => (
        <ProjectCard props={data} />
      ))}
    </div>
  );
}
