// @ts-ignore
import GitHub from '@/assets/icons/GitHub_icon.svg?react';
// @ts-ignore
import Instagram from '@/assets/icons/Instagram_icon.svg?react';
// @ts-ignore
import LionLogo from '@/assets/icons/LionLogo_icon.svg?react';

export default function Footer() {
  return (
    <footer className="w-full h-66 flex flex-col items-center justify-center bg-[#D9D9D9]  gap-5 mt-auto">
      <div className="flex items-center text-[2.5rem] font-bold">
        <LionLogo />
        SKU LIKELION
      </div>
      <div className="flex items-center">
        <a
          href="https://www.instagram.com/likelion_skuniv/"
          className="cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
        <a
          href="https://github.com/"
          className="cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
      </div>
      <div className="text-[0.8rem] font-medium text-[#9F9C98] mt-5">
        © 2026 SKU LIKELION. All rights reserved.
      </div>
    </footer>
  );
}
