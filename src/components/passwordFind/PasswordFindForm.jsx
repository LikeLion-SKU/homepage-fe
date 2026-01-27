import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import EmailInput from '../login/EmailInput';
import LoginButton from '../login/LoginButton';
import LoginTitle from '../login/LoginTitle';
import PasswordInput from '../login/PasswordInput';
import VerificationButton from '../login/VerificationButton';

export default function PasswordFindForm({ onSubmit }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0); // 초 단위
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'error'
  const [correctCode, setCorrectCode] = useState(''); // 실제 인증번호 (임시로 저장)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 인증이 성공한 경우에만 결과 페이지로 이동
    if (verificationStatus === 'success') {
      try {
        // TODO: 실제 임시 비밀번호 발급 API 호출
        // 엔드포인트 api/v1/auth/password/reissue
        // const response = await APIService.public.post('api/v1/auth/password/reissue', { email, code: password });
        // const tempPassword = response.data.tempPassword;

        // 임시로 하드코딩된 임시 비밀번호
        const tempPassword = 'temp1234';

        if (onSubmit) {
          onSubmit({ email, password });
        }
        navigate('/password/result', { state: { email, tempPassword } });
      } catch (error) {
        console.error('임시 비밀번호 발급 실패:', error);
        // TODO: 에러 처리 (토스트 메시지 등)
      }
    }
  };

  const handleVerificationSend = async () => {
    try {
      // TODO: 비밀번호 찾기용 인증번호 전송 API 호출
      // 엔드포인트 api/v1/auth/email/verify/request
      // await APIService.public.post('api/v1/auth/email/verify/request', { email });

      console.log('인증번호 전송 (비밀번호 찾기)');
      setIsVerificationSent(true);
      setCountdown(300); // 5분 = 300초
      // 임시로 인증번호 123456으로 테스트
      const randomCode = '123456';
      setCorrectCode(randomCode);
      setVerificationStatus(null); // 상태 초기화
      console.log('인증번호:', randomCode); // 개발용
    } catch (error) {
      console.error('인증번호 전송 실패:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  };

  const handleVerificationCheck = async () => {
    // 만료된 경우 에러 메시지 표시하지 않음
    if (countdown === 0) {
      return;
    }

    try {
      // TODO: 비밀번호 찾기용 인증번호 확인 API 호출
      // 엔드포인트 api/v1/auth/password/reissue
      // const response = await APIService.public.post('api/v1/auth/password/reissue', { email, code: password });

      console.log('인증번호 확인 (비밀번호 찾기)');
      // 임시로 하드코딩된 코드와 비교
      if (password === correctCode) {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('error');
      }
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
      setVerificationStatus('error');
      // TODO: 에러 처리 (토스트 메시지 등)
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
        <LoginTitle title="비밀번호 찾기" />
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
            label="인증번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setVerificationStatus(null); // 입력 시 상태 초기화
            }}
            placeholder="인증번호를 입력해주세요"
            hideLabel
            hideToggle
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
            {isVerificationSent && (
              <div
                className="flex justify-between items-center"
                style={{ transform: 'translateY(4px)' }}
              >
                <div className="text-[#B0B0B0] text-sm text-left font-['Pretendard'] ml-0">
                  {countdown === 0 && '입력 시간이 만료되었습니다.'}
                </div>
                <div className="text-[#B0B0B0] text-sm text-right font-['Pretendard'] ml-3">
                  입력대기시간: {formatTime(countdown)}
                </div>
              </div>
            )}
            {verificationStatus === 'success' && (
              <div
                className="text-[#B0B0B0] text-sm text-left font-['Pretendard'] ml-0"
                style={{ transform: 'translateY(-15px) translateX(4px)' }}
              >
                인증번호가 일치합니다.
              </div>
            )}
            {verificationStatus === 'error' && countdown > 0 && (
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
      <div className="w-full mb-6 text-center">
        <div
          className="border border-gray-300 rounded px-4 py-5 bg-white"
          style={{ transform: 'translateY(45px)' }}
        >
          <p className="text-black text-sm font-['Pretendard'] mb-1">아이디는 학교 이메일이며,</p>
          <p className="text-black text-sm font-['Pretendard'] mb-1">
            학교 포탈 아이디와는 연동되지 않습니다.
          </p>
          <p className="text-black text-sm font-['Pretendard'] mb-1">아이디 확인이 어려운 경우</p>
          <p className="text-black text-sm font-['Pretendard'] mb-1">
            {' '}
            skuofficial@likelion.org로 문의바랍니다.
          </p>
        </div>
      </div>
      <div className="w-full mt-20">
        <LoginButton
          onClick={handleSubmit}
          disabled={!email || !password || verificationStatus !== 'success'}
        >
          비밀번호 찾기
        </LoginButton>
      </div>
    </div>
  );
}
