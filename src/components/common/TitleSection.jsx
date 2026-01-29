// @ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';

export default function TitleSection({ title, pageExplanation, children }) {
  //children으로 dom구조 받아서 넣으므로 내용으로 옵션박스 넣기
  return (
    <div className="flex flex-col gap-5.5 px-7 border-b">
      <div className="relative w-39 h-15 border-[1.5px] text-[2.25rem] font-bold text-center">
        {title}
        <span className="absolute -top-1 -left-1 w-2 Small h-2 bg-black border border-white"></span>
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-black border border-white"></span>
        <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-black border border-white"></span>
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-black border border-white"></span>
      </div>
      <p className="text-[1.1rem]">{pageExplanation}</p>
      <div className="flex justify-between h-30 items-center">
        <div>{children}</div>
        <div className="w-83 h-10 border flex justify-between items-center px-7">
          <Search />
          <input placeholder="검색하기" className="w-61 cursor-pointer focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
