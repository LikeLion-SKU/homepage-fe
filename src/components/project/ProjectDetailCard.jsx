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
    <div className="relative w-full z-2 flex flex-col bg-[#F9F9F9] py-4 pad:py-7 web:py-10 px-3 pad:px-5 web:px-8 gap-10 rounded-3xl shadow-[0_0_9px_0_rgba(0,0,0,0.25)]">
      <img
        src={imgUrl}
        alt={`Project image ${imgNum}`}
        className="h-55 pad:h-84 web:h-151 bg-[#D9D9D9]"
      />

      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-[1.1rem] pad:text-[1.5rem] web:text-[2rem] font-bold">
            {data.projectName}
          </p>
          <div className="flex gap-4 pad:gap-7 web:gap-12 items-center">
            <div className="flex pl-2 w-30 pad:w-70 web:w-93 h-3 pad:h-5 bg-[#00156A] items-center overflow-hidden">
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
                  className="h-0.5 pad:h-2 bg-white"
                />
              </div>
            </div>

            <div className="flex gap-3 pad:gap-5">
              <button
                onClick={() => changeImg(-1)}
                className="flex justify-center items-center bg-[#00156A] w-5 h-5 pad:w-9 pad:h-9 web:w-12 web:h-12"
              >
                <Left className="w-3 pad:w-5 web:w-7" />
              </button>
              <button
                onClick={() => changeImg(+1)}
                className="flex justify-center items-center bg-[#00156A] w-5 h-5 pad:w-9 pad:h-9 web:w-12 web:h-12"
              >
                <Right className="w-3 pad:w-5 web:w-7" />
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
          <p className="flex text-[0.6rem] pad:text-[0.7rem] web:text-[1.1rem] w-full pad:mr-7 web:mr-15 h-25 pad:h-30 web:h-50  text-[#3C3C3C] p-0 ">
            {data.explanation}
          </p>
          <ProjectMember memberData={data.member} />
        </div>
      </div>
    </div>
  );
}
