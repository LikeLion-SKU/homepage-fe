//@ts-ignore
import Left from '@/assets/icons/left_image_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_image_icon.svg?react';
import ProjectCategory from '@/components/project/ProjectCategory';
import ProjectMember from '@/components/project/ProjectMember';

export default function ProjectDetailCard({ props }) {
  return (
    <div className="flex flex-col w-285 h-256 bg-[#F2F2F2] py-10 px-8 gap-10">
      <img src={props.imgUrl} className="w-269 h-151 bg-[#D9D9D9]" />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-[2rem] font-bold">{props.projectName}</p>
          <div className="flex gap-12 items-center">
            <div className="w-93 h-5 bg-[#CACACA]"></div>
            <div className="flex gap-5">
              <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12">
                <Left />
              </div>
              <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12">
                <Right />
              </div>
            </div>
          </div>
        </div>
        <ProjectCategory
          isPrize={props.isPrize}
          ordinalNumber={props.ordinalNumber}
          contestName={props.contestName}
        />
        <div className="flex justify-between items-center">
          <a className="text-[1.1rem] w-164 ">{props.explanation}</a>
          <ProjectMember />
        </div>
      </div>
    </div>
  );
}
