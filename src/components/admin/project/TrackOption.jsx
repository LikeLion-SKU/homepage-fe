import { useState } from 'react';

export default function TrackOption({
  optionData,
  bgColor = 'white',
  selectTrack,
  setSelectTrack,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (track) => {
    setSelectTrack((prev) => {
      if (track in prev) {
        // 1. 선택 해제: 해당 track 키만 제외하고 나머지를 추출 (삭제 로직)
        const { [track]: _, ...rest } = prev;
        return rest;
      } else {
        // 2. 선택 추가: 기존 객체에 새로운 [track]: [] 추가
        return {
          ...prev,
          [track]: [],
        };
      }
    });
  };
  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
      className={`relative group w-28 ${isOpen ? 'z-15' : 'z-10'}`}
    >
      <summary
        style={{ backgroundColor: bgColor }}
        className="flex w-28 h-10 list-none  border justify-center items-center text-[1rem] font-semibold"
      >
        {isOpen ? '선택확정' : '트랙선택'}
        <span className="mb-2 ml-2">⌵</span>
      </summary>
      <ul
        style={{ backgroundColor: bgColor }}
        className="flex flex-col absolute items-center w-28 px-3 mt-2 text-[1rem] font-semibold divide-y divide-black border"
      >
        {optionData.map((track) => (
          <li
            onClick={() => handleSelect(track)}
            className={`flex gap-1 items-center justify-center w-22 text-[1rem] text-center py-3`}
          >
            <p>{track in selectTrack ? '▣' : '▢'}</p>
            {track}
          </li>
        ))}
      </ul>
    </details>
  );
}
