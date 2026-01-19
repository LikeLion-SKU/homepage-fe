import { useNavigate } from 'react-router';

//@ts-ignore
import Right from '@/assets/icons/right_icon.svg?react';

export default function ProjectCard({ props }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/project/viewDetail')}
      className="group relative w-101 h-86 border overflow-hidden cursor-pointer"
    >
      <div className="flex flex-col w-101 h-86">
        <img src={props.imgUrl} className="h-55 w-101" />
        <div className="flex flex-col gap-3 w-101 h-29 p-5 ">
          <div className="flex justify-between items-center   ">
            <p className="text-[1.1rem] font-bold">{props.projectName}</p>
            <div className="flex gap-1">
              <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center">
                수상작
              </div>
              <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center">
                {props.ordinalNumber}기
              </div>
              <div className="flex border rounded-3xl h-5 px-2 text-[0.9rem] text-center items-center">
                {props.contestName}
              </div>
            </div>
          </div>
          <p className="text-[0.9rem]">{props.explanation}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-[rgba(137,137,137,0.62)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex w-41 h-12 bg-white">
          <div className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12 border-r-[0.5px] border-[#8C8C8C]">
            <Right />
          </div>
          <div className="flex w-29 h-12 text-[1.1rem] justify-center items-center">
            자세히 보기
          </div>
        </div>
      </div>
    </div>
  );
}
