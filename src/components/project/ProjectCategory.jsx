// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function ProjectCategory({ award, semester, projectTypeName }) {
  return (
    <div className="flex gap-1 items-center ml-2">
      {award && (
        <motion.div
          className="flex items-center justify-center rounded-3xl p-[1.5px]" // p값이 곧 테두리 두께입니다.
          style={{
            backgroundImage: 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['100% 0%', '-100% 0%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* 내부 배경 (안쪽을 채워 테두리만 남김) */}
          <div
            className="flex bg-white rounded-[calc(1.5rem-1.5px)] h-3.5 pad:h-5 px-2 
               text-[0.7rem] web:text-[0.9rem] text-center items-center justify-center w-full h-full"
          >
            <motion.span
              className="font-bold bg-clip-text text-transparent block whitespace-nowrap"
              style={{
                backgroundImage: 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['100% 0%', '-100% 0%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              수상작
            </motion.span>
          </div>
        </motion.div>
      )}
      <div
        className="flex border rounded-3xl h-3.5 pad:h-5 px-1
      text-[0.7rem] web:text-[0.9rem] text-center items-center bg-white"
      >
        {semester}기
      </div>
      <div
        className="flex border rounded-3xl h-3.5 pad:h-5 px-2
      text-[0.7rem] web:text-[0.9rem] text-center items-center bg-white"
      >
        {projectTypeName}
      </div>
    </div>
  );
}
