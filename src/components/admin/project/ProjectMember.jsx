import { useState } from 'react';

import TrackOption from '@/components/admin/project/TrackOption';

export default function AdminProjectMember({ optionData, selectedTrack, setSelectedTrack }) {
  const [name, setName] = useState(['']);

  const handleInputChange = (index, value) => {
    setName((prev) => {
      const newNames = [...prev]; // 1. 배열 복사
      newNames[index] = value; // 2. 특정 인덱스 수정
      return newNames; // 3. 새 배열 반환
    });
  };
  const inputName = (e, track, newName, index) => {
    if (e.key === 'Enter') {
      if (newName.trim() === '') return;
      handleInputChange(index, ''); // 해당 입력창만 비우기
      setSelectedTrack((prev) => ({
        ...prev,
        // 기존에 해당 트랙의 배열이 있으면 복사 후 추가, 없으면 새로 생성
        [track]: prev[track] ? [...prev[track], newName] : [newName],
      }));
    } else if (e.key === 'Backspace' && newName === '') {
      setName((prev) => {
        const newNames = [...prev]; // 1. 배열 복사
        newNames[index] = selectedTrack[track][selectedTrack[track].length - 1]; // 2. 특정 인덱스 수정
        return newNames; // 3. 새 배열 반환
      });
      setSelectedTrack((prev) => {
        // 1. 해당 트랙에 지울 이름이 있는지 확인
        if (prev[track] && prev[track].length > 0) {
          return {
            ...prev,
            // 2. slice(0, -1)을 사용해 마지막 요소만 제거한 새 배열 생성
            [track]: prev[track].slice(0, -1),
          };
        }
        return prev; // 지울 게 없으면 그대로 반환
      });
    }
  };

  return (
    <div className="flex flex-col px-8 py-2 border w-84 h-58 gap-3">
      <TrackOption
        optionData={optionData}
        bgColor="#D9D9D9"
        selectTrack={selectedTrack}
        setSelectTrack={setSelectedTrack}
      />
      {optionData.map((track, index) => {
        if (track in selectedTrack) {
          return (
            <div key={track} className="flex w-68 text-[1rem] font-semibold">
              <p className="flex items-center h-8">{track}</p>
              <div className="flex gap-x-3 w-55 ml-auto flex-wrap items-center">
                {selectedTrack[track] &&
                  selectedTrack[track].map((nameItem, idx) => (
                    <p key={idx} className="px-2 py-1 text-[1rem]">
                      {nameItem}
                    </p>
                  ))}
                <input
                  placeholder="이름입력"
                  className="focus:outline-none w-16 text-[1rem]"
                  value={name[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => inputName(e, track, name[index], index)}
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
