// @ts-ignore
import Skon from '@/assets/icons/SKON_icon.svg?react';

export default function Footer() {
  return (
    <footer className="w-full web:h-40 flex items-center justify-between bg-[#F9F9F9] mt-auto px-6 pt-8">
      <div>
        <div className="flex flex-wrap items-baseline web:gap-2">
          <div className="text-[#00156A]">
            <span className="font-sku-icon text-[1.5rem] mr-1.5">SKU</span>
            <span className="font-sku-text text-[1.5rem]">SKU LIKELION</span>
            <span className="font-sku-text text-[2rem]">.</span>
          </div>
          <p className="font-sku-text text-[0.9rem] text-[#3C3C3C]">ALL RIGHTS RESERVED.</p>
        </div>

        <div className="flex flex-wrap items-baseline gap-1">
          <div className="flex items-baseline gap-1">
            <span className="font-sku-text text-[0.7rem] text-gray-800">SEOKEYONG UNIVERSITY,</span>
            <span className="font-[nerko] text-[0.8rem] text-gray-800">124</span>
          </div>

          <span className="font-sku-text text-[0.7rem] text-gray-800">SEOKEYONG, SEONGBUK-GU,</span>

          <div>
            <span className="font-sku-text text-[0.7rem] text-gray-800">SEOUL,</span>
            <span className="font-[nerko] text-[0.8rem] text-gray-800">02726</span>
            <span className="font-sku-text text-[0.7rem] text-gray-800">, RRPUBLIC OF KOREA</span>
          </div>
        </div>
      </div>
      <Skon className="shrink-0" />
    </footer>
  );
}
