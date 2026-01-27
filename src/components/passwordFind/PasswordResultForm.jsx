import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

//@ts-ignore
import CopyIcon from '@/assets/icons/copy_icon.svg?react';

import LoginButton from '../login/LoginButton';
import LoginTitle from '../login/LoginTitle';
import SignUpInput from '../login/SignUpInput';

export default function PasswordResultForm({ email = '', tempPassword = '' }) {
  const navigate = useNavigate();
  //@ts-ignore
  const { showToast } = useOutletContext();
  const [newPassword] = useState(tempPassword);

  // 이메일 값에 @skuniv.ac.kr이 포함되어 있지 않으면 추가
  const fullEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

  const handleLoginClick = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(newPassword);
      if (showToast) {
        showToast('복사되었습니다.');
      }
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginTitle title="비밀번호 찾기 결과" />
        <SignUpInput
          label="이메일"
          value={fullEmail}
          onChange={() => {}} // 수정 불가
          mb="mb-6"
          disabled={true}
          textColor="text-[#1A1A1A]"
          bgColor="#FFFFFF"
          textAlign="center"
        />
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-black text-base font-medium font-['Pretendard']">비밀번호</label>
          <div className="relative w-full">
            <input
              type="text"
              value={newPassword}
              onChange={() => {}} // 수정 불가
              disabled={true}
              className="w-full h-14 px-4 py-3 pr-12 bg-[#FFFFFF] border border-[1px] border-[#B0B0B0] text-[#1A1A1A] text-base text-center font-['Pretendard'] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={handleCopyPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 hover:bg-[#F5F5F5] rounded transition-colors cursor-pointer"
              aria-label="비밀번호 복사"
            >
              <CopyIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div>
          <div className="w-full mb-6 text-center">
            <div
              className="border border-gray-300 rounded px-4 py-6 bg-white"
              style={{ transform: 'translateY(30px)' }}
            >
              <p className="text-black text-sm font-['Pretendard'] mb-1">
                위 비밀번호는 임시 비밀번호입니다.
              </p>
              <p className="text-black text-sm font-['Pretendard'] mb-1">
                로그인 후 "마이페이지"-&gt;"비밀번호 변경"에서 비밀번호를 변경해주세요.
              </p>
              <p className="text-black text-sm font-['Pretendard'] mb-1">
                반드시 비밀번호를 변경해주세요.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mt-20">
          <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
        </div>
      </form>
    </div>
  );
}
