import { useNavigate } from 'react-router';

//@ts-ignore
import Right from '@/assets/icons/right_navy_icon.svg?react';
import AdminCardHover from '@/components/admin/project/ProjectCardHover';
import ProjectCategory from '@/components/project/ProjectCategory';

export default function ProjectCard({ props, isAdmin }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        !isAdmin && navigate('/project/viewDetail');
      }}
      className="group relative border overflow-hidden bg-[#F9F9F9] "
    >
      <div className="flex flex-col">
        <img
          src={props.imgUrl}
          className="h-23 pad:h-46 web:h-55 w-41 pad:w-82 web:w-101 bg-[#D9D9D9]"
        />
        <div className="flex flex-col pad:gap-2 web:gap-4 w-41 pad:w-82 web:w-101 p-2 pad:p-5 ">
          <div className="flex justify-between items-center">
            <p className="text-[0.6rem] pad:text-[1rem] web:text-[1.1rem] font-bold">
              {props.projectName}
            </p>
            <ProjectCategory
              isPrize={props.isPrize}
              ordinalNumber={props.ordinalNumber}
              contestName={props.contestName}
            />
          </div>
          <p className="text-[0.4rem] pad:text-[0.7rem] web:text-[0.9rem]">{props.explanation}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-[rgba(137,137,137,0.62)] flex flex-col gap-2.5 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {isAdmin ? (
          <AdminCardHover />
        ) : (
          <button className="flex bg-[#F8F8F8] border">
            <div className="flex justify-center items-center bg-[#C6E400] px-1 pad:p-2 web:p-3 border-r ">
              <Right className="w-3 pad:w-4 web:w-5" />
            </div>
            <div className="flex px-3 pad:px-5 text-[0.7rem] pad:text-[0.9rem] web:text-[1.1rem] text-center justify-center items-center font-semibold">
              자세히 보기
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
