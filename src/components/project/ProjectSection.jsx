import ProjectCard from '@/components/project/ProjectCard';

export default function ProjectSection({ data }) {
  return (
    <div className="grid grid-cols-3 gap-x-7 gap-y-15 mt-15">
      {data.length > 0 && data.map((data) => <ProjectCard props={data} />)}
    </div>
  );
}
