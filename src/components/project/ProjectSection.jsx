import { useLocation, useNavigate } from 'react-router';

//@ts-ignore
import Plus from '@/assets/icons/plus_icon.svg?react';
import ProjectCard from '@/components/project/ProjectCard';
import ProjectSkeleton from '@/components/project/ProjectSkeleton';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useIsPhone } from '@/hooks/useIsPhone';

export default function ProjectSection({ data, isLoading }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const isPhone = useIsPhone();
  const isDesktop = useIsDesktop();
  const getLength = () => {
    if (isPhone) {
      return 1;
    } else if (isDesktop) {
      return 6;
    } else {
      return 2;
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-wrap gap-7 mt-12 justify-center">
          {Array.from({ length: getLength() }).map(() => (
            <ProjectSkeleton />
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-6">
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
          <div className="max-w-7xl grid grid-cols-[repeat(auto-fill,404px)] pad:grid-cols-[repeat(auto-fill,328px)] web:grid-cols-[repeat(auto-fill,404px)] gap-7 mt-6 justify-center">
            {data.content.length > 0 &&
              data.content.map((item) => (
                <ProjectCard key={item.id} props={item} isAdmin={isAdmin} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
