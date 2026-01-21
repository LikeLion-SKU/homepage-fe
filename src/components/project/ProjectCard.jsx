import { useNavigate } from 'react-router';

//@ts-ignore
import Right from '@/assets/icons/right_navy_icon.svg?react';
import ProjectCategory from '@/components/project/ProjectCategory';

export default function ProjectCard({ props, isAdmin }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        !isAdmin && navigate('/project/viewDetail');
      }}
      className="group relative w-101 h-86 border overflow-hidden bg-[#F9F9F9] "
    >
      <div className="flex flex-col w-101 h-86">
        <img src={props.imgUrl} className="h-55 w-101 bg-[#D9D9D9]" />
        <div className="flex flex-col gap-3 w-101 h-29 p-5 ">
          <div className="flex justify-between items-center   ">
            <p className="text-[1.1rem] font-bold">{props.projectName}</p>
            <ProjectCategory
              isPrize={props.isPrize}
              ordinalNumber={props.ordinalNumber}
              contestName={props.contestName}
            />
          </div>
          <p className="text-[0.9rem]">{props.explanation}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-[rgba(137,137,137,0.62)] flex flex-col gap-2.5 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {isAdmin ? (
          <>
            <div className="flex w-41 h-12 bg-[#F8F8F8]">
              <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12 border-r-[0.5px] border-[#8C8C8C]">
                <Right />
              </div>
              <div
                onClick={() => {
                  navigate('/admin/project/edit');
                }}
                className="flex w-29 h-12 text-[1.1rem] justify-center items-center"
              >
                수정하기
              </div>
            </div>
            <div className="flex w-41 h-12 bg-[#F8F8F8]">
              <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12 border-r-[0.5px] border-[#8C8C8C]">
                <Right />
              </div>
              <div className="flex w-29 h-12 text-[1.1rem] justify-center items-center">
                삭제하기
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-41 h-12 bg-[#F8F8F8] border">
            <div className="flex justify-center items-center bg-[#C6E400] w-12 border-r ">
              <Right />
            </div>
            <div className="flex w-29 h-12 text-[1.1rem] justify-center items-center font-semibold">
              자세히 보기
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
