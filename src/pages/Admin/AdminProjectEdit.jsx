import { useState } from 'react';

//@ts-ignore
import Left from '@/assets/icons/left_image_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_image_icon.svg?react';
import ProjectEditRule from '@/components/admin/project/ProjectEditRule';
import AdminProjectMember from '@/components/admin/project/ProjectMember';
import OptionBox from '@/components/common/Option/optionBox';

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
            <AdminProjectMember
              optionData={optionData}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
            />
          </div>
        </div>
      </div>
      <div className="flex w-285 pl-120">
        <button className="w-40 h-12 border bg-[#D9D9D9] text-center items-center">저장하기</button>
        <ProjectEditRule />
      </div>
    </div>
  );
}
