//@ts-ignore
import Left from '@/assets/icons/left_image_icon.svg?react';
//@ts-ignore
import Right from '@/assets/icons/right_image_icon.svg?react';
import OptionBox from '@/components/common/Option/optionBox';
import ProjectMember from '@/components/project/ProjectMember';

export default function AdminProjectEdit() {
  const optionData = ['14기', '13기', '12기', '11기'];
  return (
    <div className="flex flex-col items-center py-15 gap-7">
      <div className="flex flex-col w-285 h-256 bg-[#F2F2F2] py-10 px-8 gap-10">
        <img className="w-269 h-151 bg-[#D9D9D9]" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-8 w-164">
            <input
              placeholder="프로젝트 이름"
              className="text-[2rem] font-bold placeholder:text-black focus:outline-none"
            />
            <div className="flex gap-2.5">
              <OptionBox initValue="기수선택" optionData={optionData} bgColor="#D9D9D9" />
              <OptionBox initValue="수상여부" optionData={optionData} bgColor="#D9D9D9" />
              <OptionBox initValue="대회선택" optionData={optionData} bgColor="#D9D9D9" />
            </div>
            <textarea
              placeholder="프로젝트 설명"
              className="h-42 text-[1.1rem] w-164 placeholder:text-black "
            />
          </div>

          <div className="flex flex-col gap-11 ">
            <div className="flex gap-9 items-center ml-5">
              <button className="w-43 h-10 border text-[1rem] text-center items-center bg-[#D9D9D9]">
                이미지 첨부
              </button>
              <div className="flex gap-5">
                <button className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12">
                  <Left />
                </button>
                <button className="flex justify-center items-center bg-[#D9D9D9] w-12 h-12">
                  <Right />
                </button>
              </div>
            </div>
            <div className="flex px-8 py-2 border w-84 h-58">
              <OptionBox initValue="트랙선택" optionData={optionData} bgColor="#D9D9D9" />
            </div>
          </div>
        </div>
      </div>
      <button className="w-40 h-12 border bg-[#D9D9D9] text-center items-center">저장하기</button>
    </div>
  );
}
