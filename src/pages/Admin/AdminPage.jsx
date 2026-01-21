import { useState } from 'react';
import { useNavigate } from 'react-router';

import Home from '@/assets/icons/4.svg';
import Camera from '@/assets/icons/mdi-light_camera.svg';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';

export default function AdminPage() {
  const userData = {
    name: '김멋사',
    email: 'likelion@example.com',
    profileImage: '',
  };
  // TODO: 지원서 존재여부로 지정
  const navigate = useNavigate();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const buttonStyle = `
    w-full h-12 bg-white border border-black
    flex justify-center items-center 
    text-black text-lg font-semibold font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;

  return (
    <div className="h-191 relative bg-white overflow-hidden border-b-8 border-[#D9D9D9]">
      <div className="relative w-142 h-44 left-46.25 top-55.5 inline-flex justify-start items-center gap-9">
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

      <div className="w-96 left-222.5 top-55.25 absolute inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch">
          <Button onClick={() => navigate('/admin/user')} className={buttonStyle}>
            사용자 관리
          </Button>
        </div>
        <div className="self-stretch">
          <Button onClick={() => navigate('/admin/option')} className={buttonStyle}>
            기수 / 트랙명 / 대회명 관리
          </Button>
        </div>
        <div className="self-stretch">
          <Button onClick={() => navigate('/admin/project')} className={buttonStyle}>
            프로젝트 관리
          </Button>
        </div>
        <div className="self-stretch">
          <Button onClick={() => navigate('/admin/notice')} className={buttonStyle}>
            모집 공고 관리
          </Button>
        </div>
        <div className="self-stretch">
          <Button onClick={() => navigate('/admin/interview')} className={buttonStyle}>
            면접 일정 관리
          </Button>
        </div>
        <div className="self-stretch">
          <Button onClick={() => navigate('/admin/application')} className={buttonStyle}>
            지원자/지원서 관리
          </Button>
        </div>
        <div className="self-stretch">
          <Button
            onClick={() => {
              setIsPasswordModalOpen(true);
            }}
            className={buttonStyle}
          >
            로그아웃
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isPasswordModalOpen}
        cancel={() => setIsPasswordModalOpen(false)}
        confirm={() => setIsPasswordModalOpen(false) /* TODO: 추후 이동할 페이지 추가 필요 */}
      >
        로그아웃 하시겠습니까?
      </Modal>
      <div className="w-146 h-145 left-186 top-46.25 mt-auto absolute">
        <img src={Home} />
      </div>
    </div>
  );
}
