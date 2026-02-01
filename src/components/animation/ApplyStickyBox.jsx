import { motion } from 'framer-motion';

import Button from '@/components/common/Button/Button';

const MotionAside = motion.aside;

export default function ApplyStickyBox({ deadline, onClickModal, isExpired, buttonStyle }) {
  return (
    <MotionAside
      className="sticky top-18 w-full web:w-96 max-w-full pad:h-60 py-3 px-7 pad:py-9 outline bg-white shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="flex flex-col justify-start items-start gap-4 pad:gap-6">
        <div className=" flex flex-col gap-1 pad:gap-3">
          <div className="self-stretch justify-center text-stone-500 text-xs pad:text-sm font-medium">
            마감일
          </div>
          <div className="self-stretch justify-center text-black text-sm font-semibold pad:text-xl pad:font-bold">
            {deadline}
          </div>
        </div>
        <div className="w-full border-t border-black"></div>
        <Button
          onClick={onClickModal}
          data-variant=""
          data-size=""
          disabled={isExpired}
          className={`${buttonStyle} self-center`}
        >
          지원하기
        </Button>
      </div>
    </MotionAside>
  );
}
