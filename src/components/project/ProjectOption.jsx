import { useState } from 'react';

import OptionBox from '@/components/common/Option/optionBox';

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
  const [selectMenu, setSelectMenu] = useState('전체');

  return (
    <div className="flex h-20 items-center gap-15">
      <OptionBox initValue="기수별" optionData={ordirnalNum} />
      <div className="flex w-160 h-10 text-[1rem] gap-5 items-center overflow-x-auto no-scrollbar border-r">
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
