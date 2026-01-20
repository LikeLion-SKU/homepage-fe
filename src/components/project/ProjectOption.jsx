import { useState } from 'react';

export default function ProjectOption() {
  const ordirnalNum = ['전체', '14기', '13기', '12기', '11기'];
  const contestName = [
    '전체',
    '중앙해커톤',
    '아이디어톤',
    '4호선톤',
    '트렌디톤',
    '블라블라',
    '블블라',
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNum, setSelectedNum] = useState('기수별');
  const [selectMenu, setSelectMenu] = useState('전체');

  return (
    <div className="flex h-20 items-center gap-15">
      <details
        open={isOpen}
        onToggle={(e) => setIsOpen(e.currentTarget.open)}
        className="relative z-50 group"
      >
        <summary className="flex w-28 h-10 list-none bg-[#D9D9D9] border justify-center items-center text-[1rem] font-bold">
          {selectedNum}
          <span className="mb-2 ml-2">⌵</span>
        </summary>
        <ul className="flex flex-col absolute items-center w-28 px-3 bg-[#D9D9D9] mt-2 text-[1rem] font-bold divide-y divide-black border">
          {ordirnalNum.map((num) => (
            <li
              onClick={() => {
                setIsOpen(false);
                setSelectedNum(num);
              }}
              className="w-22 text-[1rem] text-center py-3"
            >
              {num}
            </li>
          ))}
        </ul>
      </details>
      <div className="flex w-180 h-20 text-[1rem] gap-5 items-center overflow-x-auto no-scrollbar">
        {contestName.map((name) => (
          <div
            key={name}
            onClick={() => setSelectMenu(name)}
            className={`px-5 h-10 items-center flex shrink-0 ${selectMenu == name ? 'font-bold' : 'font-medium'}`}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
