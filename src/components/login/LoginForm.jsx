import { useState } from 'react';

import EmailInput from './EmailInput';
import ForgotPasswordLink from './ForgotPasswordLink';
import LoginButton from './LoginButton';
import LoginTitle from './LoginTitle';
import PasswordInput from './PasswordInput';
import SignUpLink from './SignUpLink';

export default function LoginForm({ onSubmit, isLoading = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && !isLoading) {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit}>
        <LoginTitle />
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="" />
        <PasswordInput
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
          mb="mb-2"
          defaultShowPassword={false}
        />
        <ForgotPasswordLink />
        <div className="w-full">
          <LoginButton
            onClick={handleSubmit}
            disabled={!email || !password || isLoading}
            isLoading={isLoading}
          />
        </div>
      </form>
      <div className="mt-4">
        <SignUpLink />
      </div>
      <div className="w-full mb-6 text-center mt-6">
        <div
          className="border border-gray-300 rounded px-4 py-5 max-[480px]:px-3 max-[480px]:py-4 bg-[#FAFBF8]"
          style={{ transform: 'translateY(0px)' }}
        >
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            아이디는 학교 이메일이며,
          </p>
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            첫 로그인 시 회원가입이 필요합니다.
          </p>
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            로그인이 어려운 경우
          </p>
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            {' '}
            skuofficial@likelion.org로 문의바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
