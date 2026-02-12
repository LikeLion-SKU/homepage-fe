import { useState } from 'react';

export default function OptionBox({
  initValue,
  optionData,
  bgColor = 'white',
  selectedNum,
  setSelectedNum,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
      className={`relative group w-19 pad:w-28 ${isOpen ? 'z-15' : 'z-10'}`}
    >
      <summary
        style={{ backgroundColor: bgColor }}
        className="flex w-19 pad:w-28 h-7.5 pad:h-10 list-none  border justify-center items-center 
        text-[0.7rem] pad:text-[1rem] font-bold pad:font-semibold"
      >
        {selectedNum || initValue}
        <span className="mb-1 ml-1 pad:mb-2 pad:ml-2">⌵</span>
      </summary>
      <ul
        style={{ backgroundColor: bgColor }}
        className="flex flex-col absolute items-center w-19 pad:w-28 px-2 pad:px-3 mt-2 
        text-[0.7rem] pad:text-[1rem] font-bold pad:font-semibold divide-y divide-black border"
      >
        {optionData.map((num) => (
          <li
            key={num}
            onClick={() => {
              setIsOpen(false);
              setSelectedNum(num);
            }}
            className="flex w-15.5 pad:w-22 h-7.5 pad:h-10 pad:text-[1rem] items-center justify-center"
          >
            {num}
          </li>
        ))}
      </ul>
    </details>
  );
}
