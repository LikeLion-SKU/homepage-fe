import { useEffect, useState } from 'react';

import EmailInput from './EmailInput';
import LoginButton from './LoginButton';
import LoginTitle from './LoginTitle';
import PasswordInput from './PasswordInput';
import SignupLink from './SignUpLink';
import VerificationButton from './VerificationButton';

export default function SignUpForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0); // 초 단위
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'error'
  const [correctCode, setCorrectCode] = useState(''); // 실제 인증번호 (임시로 저장)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ email, password });
    }
  };

  const handleVerificationSend = () => {
    console.log('인증번호 전송');
    setIsVerificationSent(true);
    setCountdown(300); // 5분 = 300초
    // 임시로 인증번호 123456으로 테스트
    const randomCode = '123456';
    setCorrectCode(randomCode);
    setVerificationStatus(null); // 상태 초기화
    console.log('인증번호:', randomCode); // 개발용
  };

  const handleVerificationCheck = () => {
    console.log('인증번호 확인');
    if (password === correctCode) {
      setVerificationStatus('success');
    } else {
      setVerificationStatus('error');
    }
  };

  // 카운트다운 타이머
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // 카운트다운 포맷팅 (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit}>
        <LoginTitle title="회원가입" />
        <EmailInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="mb-3"
          disabled={password.length > 0}
          textColor={password.length > 0 ? 'text-[#D3D3D3]' : 'text-black'}
          rightButton={
            <VerificationButton
              onClick={handleVerificationSend}
              disabled={!email}
              isActive={!!email}
              isResend={isVerificationSent}
              text={isVerificationSent ? '인증번호 재전송' : '인증번호 전송'}
            />
          }
        />
        <div>
          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setVerificationStatus(null); // 입력 시 상태 초기화
            }}
            placeholder="인증번호를 입력해주세요"
            hideLabel
            mb="mb-0"
            maxWidth="max-w-full sm:max-w-[600px]"
            rightButton={
              <VerificationButton
                onClick={handleVerificationCheck}
                disabled={!password}
                text="인증번호 확인"
                isActive={!!email}
              />
            }
          />
          <div className="h-0 mb-6">
            {isVerificationSent && countdown > 0 && (
              <div
                className="text-[#B0B0B0] text-sm text-right font-['Pretendard'] ml-3"
                style={{ transform: 'translateY(4px)' }}
              >
                입력대기시간: {formatTime(countdown)}
              </div>
            )}
            {verificationStatus === 'success' && (
              <div
                className="text-[#B0B0B0] text-sm text-left font-['Pretendard'] ml-0"
                style={{ transform: 'translateY(-15px) translateX(4px)' }}
              >
                인증번호가 일치합니다
              </div>
            )}
            {verificationStatus === 'error' && (
              <div
                className="text-[#B0B0B0] text-sm text-left font-['Pretendard'] ml-0"
                style={{ transform: 'translateY(-15px) translateX(4px)' }}
              >
                잘못된 인증번호입니다. 다시 입력해주세요.
              </div>
            )}
          </div>
        </div>
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
