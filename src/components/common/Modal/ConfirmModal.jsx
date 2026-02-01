import ReactDom from 'react-dom';

import Button from '@/components/common/Button/Button';

const Modal = ({ isOpen, cancel, confirm, children }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="fixed inset-0 z-1000 flex items-center justify-center">
      {/* 블러 배경 */}
      <div className="fixed inset-0 bg-modal-white/11 backdrop-blur-[2.7px]" onClick={cancel}></div>

      {/* 모달 박스 */}
      <div className="relative z-10 bg-white shadow-[0px_0px_9px_0px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center px-10 py-5 pad:px-9 pad:py-9">
        {/* 모달 질문 */}
        <div className="w-full flex flex-col justify-start items-center gap-5 pad:gap-6">
          <div className="self-stretch text-center text-[0.9rem] pad:text-[1.1rem] text-zinc-800 text-lg font-semibold pad:font-bold ">
            {children}
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-center items-center gap-5 w-full">
            <Button
              onClick={cancel}
              className="flex-1 px-10 py-2 pad:px-18 pad:py-4 outline -outline-offset-1 outline-neutral-400 flex justify-center items-center bg-white transition-all hover:bg-stone-100"
            >
              <span className="opacity-70  text-[0.7rem] pad:text-[1.1rem] text-neutral-400 font-medium">
                취소
              </span>
            </Button>

            <Button
              onClick={confirm}
              className="flex-1 px-10 py-2 pad:px-18 pad:py-4 bg-button-green outline -outline-offset-1 outline-black flex justify-center items-center transition-all hover:bg-button-hover"
            >
              <span className="opacity-70 text-[0.7rem] pad:text-[1.1rem] text-black font-medium ">
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

export default Modal;
