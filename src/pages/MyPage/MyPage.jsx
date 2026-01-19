import { useState } from 'react';
import { useNavigate } from 'react-router';

import Home from '@/assets/icons/4.svg';
import Camera from '@/assets/icons/mdi-light_camera.svg';
import Button from '@/components/common/Button/Button';

export default function MyPage() {
  const userData = {
    name: '김멋사',
    email: 'likelion@example.com',
    profileImage: '',
  };
  // TODO: 지원서 존재여부로 지정
  const [hasApplication, _setHasApplication] = useState(false);
  const navigate = useNavigate();

  const buttonStyle = `
    w-full h-12 bg-white border border-black
    flex justify-center items-center 
    text-black text-lg font-semibold font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;

  return (
    <div className="w-[1440px] h-[916px] relative bg-white overflow-hidden">
      <div className="relative w-[568px] h-44 left-[185px] top-[222px] inline-flex justify-start items-center gap-9">
        <div className="w-44 h-44 relative">
          <div className="relative w-44 h-44 bg-zinc-300 border border-black">
            <img src={userData.profileImage}></img> {/* 프로필 사진 */}
            <div className="w-8 h-8 left-[137.10px] top-[138.42px] absolute overflow-hidden">
              <img src={Camera}></img> {/* 카메라 아이콘 */}
            </div>
          </div>
        </div>

        <div className="w-80 inline-flex flex-col justify-start items-start gap-3">
          <div className="self-stretch justify-center">
            <span className="text-black text-2xl font-bold font-['Pretendard']">
              {userData.name}
            </span>
            <span className="text-black text-4xl font-bold font-['Pretendard']"> </span>
            <span className="text-zinc-600 text-xl font-semibold font-['Pretendard']">
              님, 안녕하세요
            </span>
          </div>
          <div className="self-stretch justify-start text-stone-500 text-lg font-medium font-['Pretendard']">
            {userData.email}
          </div>
        </div>
      </div>

      <div className="w-96 left-[902px] top-[221px] absolute inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch">
          <Button
            onClick={() => {
              if (hasApplication) {
                navigate('/application');
              } else {
                navigate('/apply');
              }
            }}
            data-variant=""
            data-size=""
            className={buttonStyle}
          >
            {hasApplication ? '내 지원서 보러가기' : '지원서 작성하기'}
          </Button>
        </div>
        <div className="self-stretch">
          <Button onClick={() => {}} data-variant="" data-size="" className={buttonStyle}>
            비밀번호 변경
          </Button>
        </div>
        <div className="self-stretch">
          <Button onClick={() => {}} data-variant="" data-size="" className={buttonStyle}>
            로그아웃
          </Button>
        </div>
      </div>
      <div className="w-[584px] h-[580px] left-[744px] top-[185px] absolute">
        <img src={Home}></img>
      </div>
    </div>
  );
}
