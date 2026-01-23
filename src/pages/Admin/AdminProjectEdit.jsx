import { useState } from 'react';

//@ts-ignore
import Left from '@/assets/icons/left_image_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_image_icon.svg?react';
import TrackOption from '@/components/admin/project/TrackOption';
import OptionBox from '@/components/common/Option/optionBox';
import ProjectMember from '@/components/project/ProjectMember';

export default function AdminProjectEdit() {
  const [data, setData] = useState({
    imgUrl: [],
    projectName: '',
    explain: '',
    ordinalNum: '',
    prize: false,
    contest: '',
  });
  if (data.imgUrl.length > 100) {
    //프리티어 경고 없애려고 막 넣음 api연결하면서 제거예정
    setData({
      imgUrl: [],
      projectName: '',
      explain: '',
      ordinalNum: '',
      prize: false,
      contest: '',
    });
  }
  const optionData = ['14기', '13기', '12기', '11기'];
  const [imgNum, setImgNum] = useState(0);
  const imgCount = data.imgUrl.length;
  const [selectedTrack, setSelectedTrack] = useState({});
  const [name, setName] = useState(['']);

  const changeImg = async (direction) => {
    const nextNum = imgNum + direction;
    // 이미지 배열의 길이를 확인하여 처음과 끝 처리
    if (nextNum < 0) {
      setImgNum(imgCount - 1);
    } else if (nextNum > imgCount - 1) {
      setImgNum(0);
    } else {
      setImgNum(nextNum);
    }
  };
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
    <div className="flex flex-col items-center py-15 gap-7">
      <div className="relative flex flex-col w-285 h-256 bg-[#F2F2F2] py-10 px-8 gap-10">
        {data.imgUrl.length > 0 && (
          <button className="absolute top-17 right-14 w-30 h-10 text-center items-center text-[1rem] border">
            이미지 삭제
          </button>
        )}
        <img
          src={data.imgUrl[imgNum] ? data.ordinalNum : '기수선택'}
          className="w-269 h-151 bg-[#D9D9D9]"
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-8 w-164">
            <input
              placeholder={data.projectName ? data.projectName : '프로젝트 이름'}
              className="text-[2rem] font-bold placeholder:text-black focus:outline-none"
            />
            <div className="flex gap-2.5">
              <OptionBox
                initValue={data.ordinalNum ? data.ordinalNum : '기수선택'}
                optionData={optionData}
                bgColor="#D9D9D9"
              />
              <OptionBox
                initValue={data.ordinalNum ? data.ordinalNum : '기수선택'}
                optionData={optionData}
                bgColor="#D9D9D9"
              />
              <OptionBox
                initValue={data.ordinalNum ? data.ordinalNum : '기수선택'}
                optionData={optionData}
                bgColor="#D9D9D9"
              />
            </div>
            <textarea
              placeholder={data.explain ? data.explain : '프로젝트 설명'}
              className="h-42 text-[1.1rem] w-164 placeholder:text-black "
            />
          </div>

          <div className="flex flex-col gap-11 ">
            <div className="flex gap-9 items-center ml-5">
              <button className="w-43 h-10 border text-[1rem] text-center items-center bg-[#D9D9D9]">
                이미지 첨부
              </button>
              <div className="flex gap-5">
                <button
                  onClick={() => changeImg(-1)}
                  className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12"
                >
                  <Left />
                </button>
                <button
                  onClick={() => changeImg(1)}
                  className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12"
                >
                  <Right />
                </button>
              </div>
            </div>
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
                    <div key={track} className="flex w-68 text-[1rem] font-semibold items-center">
                      <p>{track}</p>
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
          </div>
        </div>
      </div>
      <button className="w-40 h-12 border bg-[#D9D9D9] text-center items-center">저장하기</button>
    </div>
  );
}
