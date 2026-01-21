import { motion } from 'framer-motion';

import Button from '@/components/common/Button/Button';

const MotionAside = motion.aside;

export default function ApplyStickyBox({ deadline, onClickModal, buttonStyle }) {
  return (
    <MotionAside
      className="sticky top-18 w-96 h-60 px-7 py-9 outline bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="w-80 flex flex-col justify-start items-start gap-6">
        <div className="w-52 flex flex-col gap-3">
          <div className="self-stretch h-4 justify-center text-stone-500 text-sm font-medium font-['Pretendard']">
            마감일
          </div>
          <div className="self-stretch h-7 justify-center text-black text-xl font-bold font-['Pretendard']">
            {deadline}
          </div>
        </div>
        <div className="w-80 border-t border-black"></div>
        <Button onClick={onClickModal} data-variant="" data-size="" className={buttonStyle}>
          지원하기
        </Button>
      </div>
    </MotionAside>
  );
}
