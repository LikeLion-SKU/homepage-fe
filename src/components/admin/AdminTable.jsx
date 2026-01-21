//@ts-ignore
import { useState } from 'react';

import Search from '@/assets/icons/Search_icon.svg?react';
import Table from '@/components/admin/Table';

export default function AdminTable({ title, bgColor = 'white' }) {
  const optionData = ['이름', '학과', '학번'];
  const cardData = [
    ['홍길동', '컴퓨터공학과', '20220000'],
    ['홍길동', '컴퓨터공학과', '20220000'],
    ['홍길동', '컴퓨터공학과', '20220000'],
    ['홍길동', '컴퓨터공학과', '20220000'],
  ];
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ backgroundColor: bgColor }} className="flex flex-col px-8.5 py-15 gap-5 ">
      <p className="text-[1.4rem] font-bold">{title}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setIsChecked(!isChecked)}
          className="w-20 h-10 border text-center items-center bg-white"
        >
          전체선택
        </button>
        <div className="flex w-66 h-10 border items-center px-5 gap-7">
          <Search />
          <input placeholder="검색하기" className="focus:outline-none placeholder:text-[1rem]" />
        </div>
      </div>
      <Table option={optionData} cardData={cardData} width="35rem" isChecked={isChecked} />
    </div>
  );
}
