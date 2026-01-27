import { useEffect, useState } from 'react';

import AgreeForm from './AgreeForm';
import EmailInput from './EmailInput';
import LoginButton from './LoginButton';
import LoginTitle from './LoginTitle';
import PasswordInput from './PasswordInput';
import SignUpConfirm from './SignUpConfim';
import SignUpInput from './SignUpInput';
import SignupLink from './SignUpLink';
import VerificationButton from './VerificationButton';

export default function SignUpForm({ onSubmit }) {
  const [step, setStep] = useState(1); // 1: 인증번호 확인, 2: 회원정보 입력
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0); // 초 단위
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'error'
  const [correctCode, setCorrectCode] = useState(''); // 실제 인증번호 (임시로 저장)

  // 두 번째 단계 입력 필드
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [major, setMajor] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('필수항목에 모두 입력하세요.');
  const [passwordTouched, setPasswordTouched] = useState(false);

  // 전화번호 포맷팅 함수 (하이픈 자동 추가)
  const formatPhoneNumber = (value) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, '');

    // 길이에 따라 하이픈 추가
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // 전화번호 형식 검증 함수
  const isValidPhoneNumber = (phoneNumber) => {
    // 하이픈 포함 형식: 010-XXXX-XXXX
    const phoneWithHyphen = /^010-\d{4}-\d{4}$/;
    // 숫자만 형식: 010XXXXXXXX
    const phoneOnlyNumbers = /^010\d{8}$/;

    return phoneWithHyphen.test(phoneNumber) || phoneOnlyNumbers.test(phoneNumber);
  };

  // 비밀번호 유효성 검사 함수: 영문, 숫자 및 특수 문자 포함 8자 이상 20자 이하
  const isValidPassword = (password) => {
    if (!password) return false;
    if (password.length < 8 || password.length > 20) return false;

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasLetter && hasNumber && hasSpecialChar;
  };

  const handleNextStep = () => {
    // 인증번호 확인이 성공했을 때만 다음 단계로 이동
    if (verificationStatus === 'success') {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2) {
      // 동의 항목 체크 여부 확인
      if (!isAgreed) {
        setConfirmModalMessage('필수 동의 항목에 동의해주세요.');
        setShowConfirmModal(true);
        return;
      }

      // 비밀번호 유효성 검사
      if (!isValidPassword(signupPassword)) {
        setConfirmModalMessage('영문, 숫자 및 특수 문자 포함 8자 이상 20자 이하로 입력해주세요.');
        setShowConfirmModal(true);
        setPasswordTouched(true);
        return;
      }

      // 비밀번호 일치 여부 확인
      if (signupPassword !== confirmPassword) {
        setConfirmModalMessage('비밀번호가 일치하지 않습니다.');
        setShowConfirmModal(true);
        return;
      }

      // 필수 항목 검증
      if (
        !userId ||
        !name ||
        !signupPassword ||
        !confirmPassword ||
        !major ||
        !studentNumber ||
        !phone
      ) {
        setConfirmModalMessage('필수 항목을 모두 입력해주세요.');
        setShowConfirmModal(true);
        return;
      }

      // 전화번호 형식 검증
      if (!isValidPhoneNumber(phone)) {
        setConfirmModalMessage('전화번호를 입력해주세요.');
        setShowConfirmModal(true);
        return;
      }

      if (onSubmit) {
        onSubmit({
          email,
          userId,
          name,
          password: signupPassword,
          confirmPassword,
          phone,
          major,
          studentNumber,
          isAgreed,
        });
      }
    }
  };

  const handleVerificationSend = async () => {
    try {
      // TODO: 회원가입용 인증번호 전송 API 호출
      // 엔드포인트 api/v1/auth/email/verify/request
      // await APIService.public.post('api/v1/auth/email/verify/request', { email });

      console.log('인증번호 전송 (회원가입)');
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
      // TODO: 회원가입용 인증번호 확인 API 호출
      // 엔드포인트/api/v1/auth/email/verify/confirm
      // const response = await APIService.public.post('api/v1/auth/email/verify/confirm', { email, code: password });

      console.log('인증번호 확인 (회원가입)');
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

  // 첫 번째 단계: 인증번호 확인
  if (step === 1) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
        <form onSubmit={(e) => e.preventDefault()}>
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
        <div className="w-full mt-26">
          <LoginButton onClick={handleNextStep} disabled={verificationStatus !== 'success'}>
            다음
          </LoginButton>
        </div>
        <SignupLink questionText="이미 계정이 있으신가요?" linkText="로그인" linkPath="/login" />
      </div>
    );
  }

  // 두 번째 단계: 회원정보 입력
  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit}>
        <LoginTitle title="회원가입" />
        <SignUpInput
          label="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="abcd1234@skuniv.ac.kr"
          required
          mb="mb-6"
        />
        <div>
          <PasswordInput
            label="비밀번호"
            value={signupPassword}
            onChange={(e) => {
              setSignupPassword(e.target.value);
              if (passwordTouched) {
                // 입력 중에는 검증 상태 유지
              }
            }}
            onBlur={() => setPasswordTouched(true)}
            placeholder="abcd1234"
            mb="mb-0"
            required
          />
          <div className="h-5 mb-6" style={{ transform: 'translateY(5px)' }}>
            <p
              className={`text-base font-['Pretendard'] font-medium ${
                passwordTouched && signupPassword
                  ? isValidPassword(signupPassword)
                    ? 'text-green-500'
                    : 'text-red-500'
                  : 'text-[#1A1A1A]'
              }`}
            >
              영문, 숫자 및 특수 문자 포함 8자 이상 20자 이하로 입력해주세요.
            </p>
          </div>
        </div>
        <div>
          <PasswordInput
            label="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요"
            mb="mb-0"
            required
          />
          <div className="h-5 mb-6" style={{ transform: 'translateY(5px)' }}>
            {confirmPassword && signupPassword === confirmPassword && (
              <p className="text-green-500 text-base font-['Pretendard'] font-medium">
                비밀번호가 일치합니다.
              </p>
            )}
            {confirmPassword && signupPassword !== confirmPassword && (
              <p className="text-red-500 text-base font-['Pretendard'] font-medium">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </div>

        <SignUpInput
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
          required
          mb="mb-6"
        />
        <SignUpInput
          label="학과"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="소프트웨어학과"
          required
          mb="mb-6"
        />
        <SignUpInput
          label="학번"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          placeholder="2000000000"
          required
          mb="mb-6"
          maxLength={10}
        />
        <SignUpInput
          label="전화번호"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
          placeholder="010-1234-5678"
          required
          mb="mb-6"
        />
        <AgreeForm onAgreeChange={setIsAgreed} required />
        <div className="w-full mt-26">
          <LoginButton onClick={handleSubmit}>다음</LoginButton>
        </div>
        <SignupLink questionText="이미 계정이 있으신가요?" linkText="로그인" linkPath="/login" />
      </form>
      <SignUpConfirm
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        message={confirmModalMessage}
      />
    </div>
  );
}
