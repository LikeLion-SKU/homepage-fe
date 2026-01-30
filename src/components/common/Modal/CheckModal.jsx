import ReactDom from 'react-dom';

import Button from '@/components/common/Button/Button';

const CheckModal = ({ isOpen, cancel, children, buttonColor = 'bg-button-green' }) => {
  if (!isOpen) return null;

  // 버튼 색상이 #FF7D56일 때 hover 색상 설정
  const isErrorButton = buttonColor === 'bg-[#FF7D56]';
  const hoverColor = isErrorButton ? 'hover:bg-[#FF6B3D]' : 'hover:bg-button-hover';

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      {/* 블러 배경 */}
      <div className="fixed inset-0 bg-modal-white/11 backdrop-blur-[2.7px]" onClick={cancel}></div>

      {/* 모달 박스 */}
      <div className="relative z-10 bg-white shadow-[0px_0px_9px_0px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center px-15 py-4 pad:px-25 pad:py-8 ">
        {/* 모달 질문 */}
        <div className="w-full flex flex-col justify-start items-center gap-9">
          <div className="self-stretch text-center text-[0.9rem] pad:text-[1.1rem] text-zinc-800 text-lg font-semibold pad:font-bold ">
            {children}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-center items-center gap-5 w-full">
            <Button
              onClick={cancel}
              className={`px-10 py-2 pad:px-18 pad:py-4 ${buttonColor} outline -outline-offset-1 outline-black flex justify-center items-center transition-all ${hoverColor}`}
            >
              <span className="opacity-70 text-[0.7rem] pad:text-[1.1rem] text-black text-lg font-medium">
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
