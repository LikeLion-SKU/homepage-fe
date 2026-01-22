import { useState } from 'react';

import EmailInput from './EmailInput';
import LoginButton from './LoginButton';
import LoginTitle from './LoginTitle';
import PasswordInput from './PasswordInput';
import SignupLink from './SignupLink';
import VerificationButton from './VerificationButton';

export default function SignUpForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <LoginTitle title="회원가입" />
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="mb-3"
          rightButton={
            <VerificationButton
              onClick={() => console.log('인증번호 전송')}
              disabled={!email}
              isActive={!!email}
            />
          }
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="인증번호를 입력해주세요"
          hideLabel
          mb="mb-6"
          maxWidth="max-w-[456px]"
          rightButton={
            <VerificationButton
              onClick={() => console.log('인증번호 확인')}
              disabled={!password}
              text="인증번호 확인"
              isActive={!!email}
            />
          }
        />
      </form>
      <div className="w-full mt-26">
        <LoginButton onClick={handleSubmit} disabled={!email || !password}>
          다음
        </LoginButton>
      </div>
      <SignupLink questionText="이미 계정이 있으신가요?" linkText="로그인" linkPath="/login" />
    </div>
  );
}
