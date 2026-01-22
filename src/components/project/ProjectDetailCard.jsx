import { useRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

//@ts-ignore
import Left from '@/assets/icons/left_yellowgreen_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_yellowgreen_icon.svg?react';
import ProjectCategory from '@/components/project/ProjectCategory';
import ProjectMember from '@/components/project/ProjectMember';

export default function ProjectDetailCard({ data }) {
  const [imgNum, setImgNum] = useState(0);
  const imgCount = data.imgUrl.length;
  const barRef = useRef(null);
  const imgUrl = data.imgUrl[imgNum];

  const changeImg = async (direction) => {
    const nextNum = imgNum + direction;

    // 이미지 배열의 길이를 확인하여 처음과 끝 처리
    if (nextNum < 0) {
      setImgNum(imgCount - 1);
    } else if (nextNum > imgCount - 1) {
      setImgNum(0);
    } else {
      setImgNum(nextNum);
    }
  };
  // 인덱스에 따른 바의 위치 계산 (이미지 개수에 따라 w-1/3, w-1/4 등이 됨)
  // 인라인 스타일로 처리하여 매번 변하는 값을 적용합니다.
  const handleWidth = 89 / imgCount;
  const handleLeft = `${(imgNum / imgCount) * 100}%`;

  return (
    <div className="relative z-2 flex flex-col w-285 h-256 bg-[#F9F9F9] py-10 px-8 gap-10 rounded-3xl shadow-[0_0_9px_0_rgba(0,0,0,0.25)]">
      <img src={imgUrl} alt={`Project image ${imgNum}`} className="w-269 h-151 bg-[#D9D9D9]" />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-[2rem] font-bold">{data.projectName}</p>
          <div className="flex gap-12 items-center">
            <div className="flex pl-2 w-93 h-5 bg-[#00156A] items-center overflow-hidden">
              <div
                ref={barRef}
                className="relative w-full h-full flex items-center overflow-hidden"
              >
                <motion.div
                  drag="x"
                  dragConstraints={barRef}
                  dragElastic={0.1}
                  animate={{ left: handleLeft }} // 버튼 클릭 시에도 위치 이동
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{
                    width: `${handleWidth}%`,
                    position: 'absolute',
                    top: 6,
                    bottom: 0,
                  }}
                  className="h-2 bg-white"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => changeImg(-1)}
                className="flex justify-center items-center bg-[#00156A] w-12 h-12"
              >
                <Left />
              </button>
              <button
                onClick={() => changeImg(+1)}
                className="flex justify-center items-center bg-[#00156A] w-12 h-12"
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
          <p className="flex text-[1.1rem] w-164 h-50  text-[#3C3C3C] p-0 ">{data.explanation}</p>
          <ProjectMember memberData={data.member} />
        </div>
      </div>
    </div>
  );
}
