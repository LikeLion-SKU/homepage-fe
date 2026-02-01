//@ts-ignore
import Right from '@/assets/icons/right_navy_icon.svg?react';

export default function CheckButton({ buttonName, onClick }) {
  return (
    <button onClick={onClick} className="flex h-10 pad:h-12 border bg-[#F9F9F9]">
      <div className="flex justify-center items-center bg-[#C6E400] px-3 border-r">
        <Right className="w-4.5 h-4 pad:w-5.5 pad:h-5" />
      </div>
      <p className="flex text-[0.9rem] pad:text-[1.1rem] font-semibold pad:font-medium items-center px-4.25">
        {buttonName}
      </p>
    </button>
  );
}
