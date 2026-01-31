// @ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import PageTitle from '@/components/common/PageTitle';

export default function TitleSection({ title, pageExplanation, onSearch = true, children }) {
  //children으로 dom구조 받아서 넣으므로 내용으로 옵션박스 넣기
  return (
    <div className="flex flex-col gap-5.5 px-2 pad:px-7 border-b">
      <PageTitle title={title} />
      <p className="text-[0.9rem] pad:text-[1.1rem]">{pageExplanation}</p>
      <div className="flex justify-between h-30 items-center">
        <div className="flex-1 min-w-0">{children}</div>
        {onSearch && (
          <div
            className="w-25.5 pad:w-34 web:w-83 h-7.5 pad:h-10 border flex justify-between items-center px-2 pad:px-3 web:px-7
           bg-[#F9F9F9] gap-2 pad:gap-4 web:gap-7 ml-10  pad:ml-12 web:ml-30"
          >
            <Search className="w-4 pad:w-6" />
            <input
              placeholder="검색하기"
              className="w-full focus:outline-none placeholder:text-[0.7rem] pad:placeholder:text-[1rem] 
              text-[0.7rem] pad:text-[1rem] placeholder:font-bold placeholder:text-black"
            />
          </div>
        )}
      </div>
    </div>
  );
}
