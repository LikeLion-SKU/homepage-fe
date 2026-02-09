import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { useFetcher } from 'react-router-dom';

//import { useRevalidator } from 'react-router-dom';

import { APIService } from '@/api/api';
import Home from '@/assets/icons/4.svg';
import Camera from '@/assets/icons/mdi-light_camera.svg';
import defaultProfileImage from '@/assets/icons/profile_smile.svg';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';

export default function MyPage() {
  const userData = useLoaderData(); // 데이터 가져오기
  //const revalidator = useRevalidator();

  const navigate = useNavigate();

  const hasApplication = userData.documentSubmitted; // 지원서 제출 여부

  const canReschedule = userData.interviewScheduleSubmitted && userData.interviewScheduleChangable; // 면접 일정 변경 가능 여부

  const fetcher = useFetcher();

  // 로그아웃
  const handleLogout = () => {
    setIsModalOpen(false); // 모달 닫고 로그아웃 해야함

    fetcher.submit(null, { method: 'post', action: '/logout' }); // action 실행하기 위함
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [isError, setIsError] = useState(false); // 이미지 로딩 실패
  const [preview, setPreview] = useState(null); // 이미지 미리보기

  const renderProfileImage = () => {
    if (isError) {
      return (
        <div className="w-full h-full bg-toggle-green flex items-center justify-center">
          <img src={defaultProfileImage} className="w-16 h-16 pad:w-24 pad:h-24"></img>
        </div>
      );
    }
    if (preview) {
      return (
        <img
          src={preview}
          className="w-full h-full object-cover" // 미리보기 강조 스타일
          alt="미리보기"
        />
      );
    }
    if (userData.profileImageUrl) {
      return (
        <img
          src={userData.profileImageUrl}
          onError={() => setIsError(true)}
          className="w-full h-full object-cover"
          alt="사용자 프로필"
        />
      );
    }
    return (
      <div className="w-full h-full bg-toggle-green flex items-center justify-center">
        <img src={defaultProfileImage} className="w-16 h-16 pad:w-24 pad:h-24"></img>
      </div>
    );
  };

  const buttonStyle = `
    w-full h-10 pad:h-12 bg-white border border-black
    flex justify-center items-center 
    text-black text-lg font-semibold font-['Pretendard']
    relative z-[1] transition-all duration-200
    hover:drop-shadow-[5px_5px_0px_var(--color-yellow-shadow)]
    active:translate-x-[0.5px] active:translate-y-[0.5px]
  `;

  const minHeight =
    'min-h-[calc(100vh-52px)] pad:min-h-[calc(100vh-68px)] web:min-h-[calc(100vh-76px)]';

  // 프로필 이미지 수정
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader(); // 선택한 사진의 url

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);

      // 서버에 사용자가 변경한 사진 url 전달
      const formData = new FormData();
      formData.append('profile-image', file);

      try {
        const response = await APIService.private.patch('/v1/users/me/image', formData);
        if (response.success) {
          //revalidator.revalidate();
          setPreview(response.data.profileImageUrl); // 서버에 이미지 보내고 받은 이미지 url 띄우기
          console.log(response);
          console.log('프로필 이미지 수정 완료');
        }
      } catch (error) {
        console.error('프로필 이미지 수정 실패', error);
      }
    }
  };

  return (
    <div
      className={`w-full ${minHeight} relative flex flex-col items-center web:items-stretch justify-center bg-white isolate overflow-hidden"`}
    >
      <div className="flex flex-col web:flex-row items-center web:justify-between px-6 pad:px-20 web:px-36 gap-16">
        {/* 좌측 개인정보 부분 */}
        <div className="relative flex flex-col web:flex-row justify-start items-center gap-x-9 gap-y-14">
          <div className="w-40 h-40 pad:w-44 pad:h-44 relative">
            <div className="relative w-40 h-40 pad:w-44 pad:h-44 bg-zinc-300 border border-black group">
              {renderProfileImage()}
              <label
                htmlFor="profile-upload"
                className="outline cursor-pointer w-full h-10 items-center justify-center flex flex-row gap-6 bg-button-green hover:bg-button-hover"
              >
                <div className="text-sm font-semibold pad:text-lg pad:font-bold">이미지 수정</div>
                {/* 카메라 아이콘 */}
                <div className="w-8 h-8">
                  <img src={Camera}></img>
                </div>
              </label>
              {/* 실제 프로필 사진 입력받는 부분 -> 가림 */}
              <input
                id="profile-upload"
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                className="hidden"
                onChange={handleFileChange} // 파일 선택 시 실행될 함수
              ></input>
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
                  navigate('/apply/info');
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
          {canReschedule && (
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
      <Modal isOpen={isModalOpen} cancel={() => setIsModalOpen(false)} confirm={handleLogout}>
        로그아웃 하시겠습니까?
      </Modal>
      <div className="w-72 h-72 pad:w-113.5 pad:h-96 web:w-146 web:h-145 left-18.75 bottom-0 pad:left-69.5 pad:bottom-0 web:left-186 web:bottom-0 absolute -z-10">
        <img src={Home}></img>
      </div>
    </div>
  );
}
