import ReactDom from 'react-dom';

import Button from '@/components/common/Button/Button';

const CheckModal = ({ isOpen, cancel, children, buttonColor = 'bg-button-green' }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      {/* 블러 배경 */}
      <div className="fixed inset-0 bg-modal-white/11 backdrop-blur-[2.7px]" onClick={cancel}></div>

      {/* 모달 박스 */}
      <div className="relative z-10 w-117 min-h-48 bg-white shadow-[0px_0px_9px_0px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center px-10 py-8">
        {/* 모달 질문 */}
        <div className="w-full flex flex-col justify-start items-center gap-9">
          <div className="self-stretch text-center text-zinc-800 text-lg font-bold font-['Pretendard']">
            {children}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-center items-center gap-5 w-full">
            <Button
              onClick={cancel}
              className={`w-40 h-14 ${buttonColor} outline -outline-offset-1 outline-black flex justify-center items-center transition-all hover:bg-button-hover`}
            >
              <span className="opacity-70 text-black text-lg font-medium font-['Pretendard']">
                확인
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default CheckModal;
