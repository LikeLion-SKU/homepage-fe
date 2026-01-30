import { useNavigate } from 'react-router';

//@ts-ignore
import RightDown from '@/assets/icons/right_down_icon.svg?react';

export default function MenuButton({ name, path, handleSideBar }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(path);
        handleSideBar();
      }}
      className="w-full flex h-15 justify-between items-center bg-[#F9F9F9] pl-7 pr-9 
        pad:pl-17 pad:pr-21 pad:text-[1.4rem] pad:font-semibold"
    >
      <p className="text-[1rem]">{name}</p>
      <RightDown />
    </button>
  );
}
