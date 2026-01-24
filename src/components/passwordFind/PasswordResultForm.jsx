import { useState } from 'react';
import { useNavigate } from 'react-router';

import LoginButton from '../login/LoginButton';
import LoginTitle from '../login/LoginTitle';
import SignUpInput from '../login/SignUpInput';

export default function PasswordResultForm({ email = '', tempPassword = '' }) {
  const navigate = useNavigate();
  const [newPassword] = useState(tempPassword);

  // 이메일 값에 @skuniv.ac.kr이 포함되어 있지 않으면 추가
  const fullEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

  const handleLoginClick = () => {
    // 로그인 페이지로 이동
    navigate('/login');
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
        <SignUpInput
          label="비밀번호"
          value={newPassword}
          onChange={() => {}} // 수정 불가
          mb="mb-6"
          disabled={true}
          textColor="text-[#1A1A1A]"
          bgColor="#FFFFFF"
          textAlign="center"
        />
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
