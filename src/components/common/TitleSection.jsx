// @ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import PageTitle from '@/components/common/PageTitle';

export default function TitleSection({ title, pageExplanation, onSearch = true, children }) {
  //children으로 dom구조 받아서 넣으므로 내용으로 옵션박스 넣기
  return (
    <div className="flex flex-col gap-5.5 px-7 border-b">
      <PageTitle title={title} />
      <p className="text-[0.9rem] pad:text-[1.1rem]">{pageExplanation}</p>
      <div className="flex justify-between h-30 items-center">
        <div>{children}</div>
        {onSearch && (
          <div className="w-83 h-10 border flex justify-between items-center px-7 bg-[#F9F9F9] gap-7 ">
            <Search />
            <input
              placeholder="검색하기"
              className="w-61 cursor-pointer focus:outline-none placeholder:text-[1rem] placeholder:font-bold placeholder:text-black"
            />
          </div>
        )}
      </div>
    </div>
  );
}
