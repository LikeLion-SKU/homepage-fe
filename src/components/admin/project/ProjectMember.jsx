import { useState } from 'react';

import TrackOption from '@/components/admin/project/TrackOption';

export default function AdminProjectMember({ optionData, selectedTrack, setSelectedTrack }) {
  const [name, setName] = useState({});

  const handleInputChange = (track, value) => {
    setName((prev) => ({ ...prev, [track]: value }));
  };
  const inputName = (e, track) => {
    if (e.nativeEvent.isComposing) return;
    const currentName = name[track] || '';
    if (e.key === 'Enter') {
      if (currentName.trim() === '') return;
      setSelectedTrack((prev) => ({
        ...prev,
        [track]: [...(prev[track] || []), currentName.trim()],
      }));
      setName((prev) => ({ ...prev, [track]: '' })); // 해당 트랙 입력창만 비우기
    } else if (e.key === 'Backspace' && currentName === '') {
      setSelectedTrack((prev) => {
        if (!prev[track] || prev[track].length === 0) return prev;
        return {
          ...prev,
          [track]: prev[track].slice(0, -1),
        };
      });
    }
  };

  return (
    <div className="flex flex-col px-8 py-2 border w-84 h-58 gap-2">
      <TrackOption
        optionData={optionData}
        bgColor="#D9D9D9"
        selectTrack={selectedTrack}
        setSelectTrack={setSelectedTrack}
      />
      {optionData.map((track) => {
        if (track in selectedTrack) {
          return (
            <div key={track} className="flex w-75 text-[1rem] font-semibold">
              <p className="flex items-center w-25 h-8">{track}</p>
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
                  value={name[track] || ''}
                  onChange={(e) => handleInputChange(track, e.target.value)}
                  onKeyDown={(e) => inputName(e, track)}
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
