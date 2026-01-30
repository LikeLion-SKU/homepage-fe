import { useState } from 'react';
import { useNavigate } from 'react-router';

import Home from '@/assets/icons/4.svg';
import Camera from '@/assets/icons/mdi-light_camera.svg';
//import defaultProfileImage from '@/assets/images/lion.png';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';

export default function MyPage() {
  const userData = {
    name: '김멋사',
    email: 'likelion@example.com',
    profileImage: '',
  };

  const defaultProfileImage = '';

  // TODO: 지원서 존재여부로 지정
  const [hasApplication, _setHasApplication] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // TODO: 추후 면접 예약 여부로 지정
  const [isInterviewReserved, _setIsInterviewReserved] = useState(false);

  const buttonStyle = `
    w-full h-10 pad:h-12 bg-white border border-black
    flex justify-center items-center 
    text-black text-lg font-semibold font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[5px_5px_0px_var(--color-yellow-shadow)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;

  const [isError, setIsError] = useState(false);
  const [preview, setPreview] = useState(null);

  // 프로필 이미지 변경하는 함수 -> 추후 이미지 백엔드에게 전달 필요!
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader(); // 선택한 사진의 url

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-52px)] pad:min-h-[calc(100vh-68px)] web:min-h-[calc(100vh-76px)] relative flex flex-col items-center web:items-stretch justify-center bg-white isolate overflow-hidden">
      <div className="flex flex-col web:flex-row web:items-start items-center web:justify-between px-6 pad:px-20 web:px-36 gap-16">
        {/* 왼쪽 부분 */}
        <div className="relative flex flex-col web:flex-row justify-start items-center gap-x-9 gap-y-14">
          <div className="w-40 h-40 pad:w-44 pad:h-44 relative">
            <div className="relative w-40 h-40 pad:w-44 pad:h-44 bg-zinc-300 border border-black group">
              {/* 이 label을 누르면 input으로 입력받을 수 있게 */}
              <label
                htmlFor="profile-upload"
                className="cursor-pointer w-full h-full flex items-center justify-center"
              >
                <img
                  src={
                    isError
                      ? defaultProfileImage
                      : preview || userData.profileImage || defaultProfileImage
                  }
                  onError={() => setIsError(true)}
                  className="w-full h-full object-cover group-hover:brightness-75"
                  alt="프로필"
                ></img>{' '}
                {/* 프로필 사진 */}
                <div className="w-8 h-8 absolute overflow-hidden">
                  <img src={Camera}></img> {/* 카메라 아이콘 */}
                </div>
              </label>
              {/* 실제 프로필 사진 입력받는 부분 -> 가림 */}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange} // 파일 선택 시 실행될 함수
              />
            </div>
          </div>
          <div className="min-w-64 pad:min-w-72 web:max-w-80 flex flex-col items-center web:items-start text-center web:text-left gap-3">
            <div className="self-stretch justify-center">
              <span className="text-black text-xl pad:text-2xl font-bold font-['Pretendard']">
                {userData.name}
              </span>
              <span className="text-black text-4xl font-bold font-['Pretendard']"> </span>
              <span className="text-zinc-600 text-lg pad:text-xl  font-semibold font-['Pretendard']">
                님, 안녕하세요
              </span>
            </div>
            <div className="self-stretch justify-start text-stone-500 text-sm pad:text-lg font-semibold pad:font-medium font-['Pretendard']">
              {userData.email}
            </div>
          </div>
        </div>
        {/* 오른쪽 부분 */}
        <div className="w-60 pad:w-full pad:max-w-120 web:max-w-96 pad:min-w-48 web:min-w-48 flex flex-col justify-start items-start gap-4">
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
          {/* 면접 예약 여부로 생겼다가 없어져야 하는 면접 일정 수정하기 버튼 -> 추후 어색하면 스켈레톤 넣자 */}
          {isInterviewReserved && (
            <div className="self-stretch">
              <Button
                onClick={() => {
                  navigate('/result');
                }}
                data-variant=""
                data-size=""
                className={buttonStyle}
              >
                면접 일정 수정하기
              </Button>
            </div>
          )}
          <div className="self-stretch">
            <Button
              onClick={() => {
                navigate('/mypage/password/change');
              }}
              data-variant=""
              data-size=""
              className={buttonStyle}
            >
              비밀번호 변경
            </Button>
          </div>
          <div className="self-stretch">
            <Button
              onClick={() => {
                setIsModalOpen(true);
              }}
              data-variant=""
              data-size=""
              className={buttonStyle}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        cancel={() => setIsModalOpen(false)}
        confirm={() => setIsModalOpen(false) /* TODO: 추후 이동할 페이지 추가 필요 */}
      >
        로그아웃 하시겠습니까?
      </Modal>
      <div className="w-72 h-72 pad:w-113.5 pad:h-96 web:w-146 web:h-145 left-18.75 bottom-0 pad:left-69.5 pad:bottom-0 web:left-186 web:bottom-0 absolute -z-10">
        <img src={Home}></img>
      </div>
    </div>
  );
}
