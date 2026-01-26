import { useState } from 'react';
import { useOutletContext } from 'react-router';

//@ts-ignore
import Trashcan from '@/assets/icons/trashcan_icon.svg?react';

export default function OptionAdminTable({ title, optionData, setOptionData }) {
  const [plusName, setPlusName] = useState('');
  const handleOptionData = (plusName) => {
    setOptionData((prev) => [plusName, ...prev]);
    setPlusName('');
  };
  //@ts-ignore
  const { openModal } = useOutletContext();
  return (
    <div className="flex flex-col border pt-10 pl-33.5 gap-12 w-156 h-190">
      <p className="text-[1.6rem] font-semibold ml-30">{title} 관리</p>
      <div className="flex flex-col gap-5">
        <p className="text-[1.25rem] font-bold">{title} 추가하기</p>
        <div className="flex border w-90 h-11 items-center justify-center gap-5">
          <input
            value={plusName}
            onChange={(e) => setPlusName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == 'Enter') handleOptionData(plusName);
            }}
            placeholder={`추가할 ${title == '기수' ? '기수를' : '대회명을'} 입력해주세요.`}
            className="w-67 focus:outline-none placeholder:text-[1.1rem] placeholder:text-black"
          />
          <button
            onClick={() => handleOptionData(plusName)}
            className="w-12 h-7.5 text-center items-center text-[1.1rem] border"
          >
            추가
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mr-auto">
        <p className="text-[1.25rem] font-bold">등록된 {title}</p>
        {optionData.map((name, index) => (
          <div key={index} className="flex h-6 justify-between w-50 ml-5">
            • {name}
            <Trashcan
              onClick={() =>
                openModal(`삭제하시겠습니까?`, () =>
                  setOptionData((prev) => prev.filter((_, idx) => idx !== index))
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
