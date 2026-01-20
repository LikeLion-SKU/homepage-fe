import { useState } from 'react';

export default function OptionBox({ initValue, optionData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNum, setSelectedNum] = useState(initValue);
  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
      className="relative z-50 group"
    >
      <summary className="flex w-28 h-10 list-none  border justify-center items-center text-[1rem] font-bold">
        {selectedNum}
        <span className="mb-2 ml-2">⌵</span>
      </summary>
      <ul className="flex flex-col absolute items-center w-28 px-3 bg-white mt-2 text-[1rem] font-bold divide-y divide-black border">
        {optionData.map((num) => (
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
  );
}
