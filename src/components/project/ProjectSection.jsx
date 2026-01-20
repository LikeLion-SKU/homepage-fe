import { useLocation, useNavigate } from 'react-router';

//@ts-ignore
import Plus from '@/assets/icons/plus_icon.svg?react';
import ProjectCard from '@/components/project/ProjectCard';

export default function ProjectSection({ data }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col mt-6">
      {isAdmin && (
        <div
          onClick={() => navigate('/admin/project/edit')}
          className="flex w-318 h-15 border justify-center items-center "
        >
          <Plus />
        </div>
      )}
      <div className="grid grid-cols-3 gap-x-7 gap-y-15 mt-6">
        {data.length > 0 && data.map((data) => <ProjectCard props={data} isAdmin={isAdmin} />)}
      </div>
    </div>
  );
}
