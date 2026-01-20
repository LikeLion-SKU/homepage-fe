//@ts-ignore
import { useState } from 'react';

import Left from '@/assets/icons/left_image_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_image_icon.svg?react';
import ProjectCategory from '@/components/project/ProjectCategory';
import ProjectMember from '@/components/project/ProjectMember';

export default function ProjectDetailCard({ data }) {
  const [imgNum, setImgNum] = useState(0);

  const changeImg = async (direction) => {
    const nextNum = imgNum + direction;

    // 이미지 배열의 길이를 확인하여 처음과 끝 처리
    if (nextNum < 0) {
      setImgNum(data.imgUrl.length);
    } else if (nextNum > data.imgUrl.length) {
      setImgNum(0);
    } else {
      setImgNum(nextNum);
    }
  };
  const imgUrl = data.imgUrl[imgNum];
  const barW = 89 / data.imgUrl.length;

  return (
    <div className="flex flex-col w-285 h-256 bg-[#F2F2F2] py-10 px-8 gap-10">
      <img src={imgUrl} alt={`Project image ${imgNum}`} className="w-269 h-151 bg-[#D9D9D9]" />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-[2rem] font-bold">{data.projectName}</p>
          <div className="flex gap-12 items-center">
            <div className="flex w-93 h-5 bg-[#CACACA] px-2 items-center">
              <div style={{ width: `${barW}%` }} className="h-2 bg-white" />
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => changeImg(-1)}
                className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12"
              >
                <Left />
              </button>
              <button
                onClick={() => changeImg(+1)}
                className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12"
              >
                <Right />
              </button>
            </div>
          </div>
        </div>
        <ProjectCategory
          isPrize={data.isPrize}
          ordinalNumber={data.ordinalNumber}
          contestName={data.contestName}
        />
        <div className="flex justify-between items-center">
          <a className="text-[1.1rem] w-164 ">{data.explanation}</a>
          <ProjectMember />
        </div>
      </div>
    </div>
  );
}
