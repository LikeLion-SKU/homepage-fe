import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

//@ts-ignore
import Plus from '@/assets/icons/plus_icon.svg?react';
import ProjectCard from '@/components/project/ProjectCard';
import ProjectSkeleton from '@/components/project/ProjectSkeleton';

export default function ProjectSection({ data }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = () => {
    setIsLoading(true);
  }; //esLint 제거를 위해 임시로 넣음
  handleLoading;

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-x-7 gap-y-15 mt-12 px-7">
          {Array.from({ length: 6 }).map(() => (
            <ProjectSkeleton />
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-6 px-7">
          {isAdmin && (
            <div
              onClick={() =>
                navigate('/admin/project/edit', { state: { id: null, isEdit: false } })
              }
              className="flex h-15 border justify-center items-center "
            >
              <Plus />
            </div>
          )}
          <div className="flex flex-wrap gap-7 mt-6 justify-center">
            {data.length > 0 && data.map((data) => <ProjectCard props={data} isAdmin={isAdmin} />)}
          </div>
        </div>
      )}
    </>
  );
}
