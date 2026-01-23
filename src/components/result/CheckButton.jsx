//@ts-ignore
import Right from '@/assets/icons/right_navy_icon.svg?react';

export default function CheckButton({ buttonName, onClick }) {
  return (
    <button onClick={onClick} className="flex h-12 border bg-[#F9F9F9]">
      <div className="flex justify-center items-center bg-[#C6E400] px-3 border-r">
        <Right />
      </div>
      <p className="flex items-center px-4.25">{buttonName}</p>
    </button>
  );
}
