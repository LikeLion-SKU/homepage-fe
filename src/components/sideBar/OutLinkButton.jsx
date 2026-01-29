//@ts-ignore
import LeftDown from '@/assets/icons/left_down_icon.svg?react';

export default function OutLinkButton({ name, imgUrl, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="flex h-15 justify-between items-center bg-[#F9F9F9] pl-9 pr-7 
                pad:pl-21 pad:pr-17 pad:text-[1.4rem] pad:font-semibold"
    >
      <LeftDown />
      <div className="flex gap-4 items-center">
        <p className="text-[1rem]">{name}</p>
        <img src={imgUrl} />
      </div>
    </a>
  );
}
