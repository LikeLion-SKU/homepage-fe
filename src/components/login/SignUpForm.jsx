import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import { confirmEmailVerification, register, requestEmailVerification } from '@/api/authApi';
import CheckModal from '@/components/common/Modal/CheckModal';

import AgreeForm from './AgreeForm';
import EmailInput from './EmailInput';
import LoginButton from './LoginButton';
import LoginTitle from './LoginTitle';
import PasswordInput from './PasswordInput';
import SignUpInput from './SignUpInput';
import SignupLink from './SignUpLink';
import VerificationButton from './VerificationButton';

export default function SignUpForm({ onSubmit }) {
  // @ts-ignore
  const { showToast } = useOutletContext() || {};
  const [step, setStep] = useState(1); // 1: 인증번호 확인, 2: 회원정보 입력
  const [email, setEmail] = useState('');

  // 에러 메시지 매핑
  const ERROR_MESSAGE_MAP = {
    DUPLICATE_EMAIL: '이미 가입된 이메일입니다.',
    DUPLICATE_PHONE: '이미 사용 중인 전화번호입니다.',
    DUPLICATE_STUDENT_NUMBER: '이미 사용 중인 학번입니다.',
    INVALID_VERIFICATION_CODE: '인증번호가 일치하지 않습니다.',
  };

  // 인증번호
  const [verificationCode, setVerificationCode] = useState('');

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(0); // 초 단위
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'error'
  const [isVerificationSending, setIsVerificationSending] = useState(false);
  const [isVerificationChecking, setIsVerificationChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // localStorage 키
  const COUNTDOWN_STORAGE_KEY = 'signup_verification_countdown';
  const COUNTDOWN_DURATION = 300; // 5분 = 300초

  // 두 번째 단계 입력 필드
  const [name, setName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [previousPhone, setPreviousPhone] = useState('');
  const [major, setMajor] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('필수항목에 모두 입력하세요.');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [_nameTouched, setNameTouched] = useState(false);
  const [_studentNumberTouched, setStudentNumberTouched] = useState(false);
  const [_phoneTouched, setPhoneTouched] = useState(false);

  // 전화번호 포맷팅 함수 (하이픈 자동 추가)
  const formatPhoneNumber = (value, prevValue = '') => {
    const numbers = value.replace(/[^\d]/g, '');
    const prevNumbers = prevValue.replace(/[^\d]/g, '');
    const isDeleting = numbers.length < prevNumbers.length || value.length < prevValue.length;

    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return numbers;

    if (numbers.length === 3) {
      if (
        !isDeleting &&
        numbers[0] === '0' &&
        numbers[1] === '1' &&
        ['0', '1', '6', '7', '8', '9'].includes(numbers[2])
      ) {
        return `${numbers.slice(0, 3)}-`;
      }
      return numbers;
    }

    if (
      numbers[0] === '0' &&
      numbers[1] === '1' &&
      ['0', '1', '6', '7', '8', '9'].includes(numbers[2])
    ) {
      if (numbers.length <= 6) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else if (numbers.length <= 10) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, numbers.length === 10 ? 7 : 6)}-${numbers.slice(
          numbers.length === 10 ? 7 : 6
        )}`;
      } else {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
      }
    }

    if (isDeleting) return value;
    return numbers;
  };

  // 비밀번호 유효성 검사
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return passwordRegex.test(password);
  };

  // 이름 유효성 검사
  const isValidName = (nameValue) => {
    if (!nameValue) return false;
    return nameValue.length >= 2 && nameValue.length <= 17;
  };

  // 학번 유효성 검사
  const isValidStudentNumber = (studentNumberValue) => {
    const studentNumberRegex = /^[0-9]{10}$/;
    return studentNumberRegex.test(studentNumberValue);
  };

  // 전화번호 형식 검증
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleNextStep = () => {
    if (verificationStatus === 'success') {
      setStep(2);
      return;
    }

    //  기존 로직은 인증번호 입력만 해도 모달이 뜰 수 있어서,
    // 최소한 error일 때만 잘못된 인증번호로 처리
    if (verificationStatus === 'error') {
      setConfirmModalMessage(ERROR_MESSAGE_MAP.INVALID_VERIFICATION_CODE);
      setShowConfirmModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step !== 2) return;

    if (!isAgreed) {
      setConfirmModalMessage('개인정보 수집에 동의해주세요.');
      setShowConfirmModal(true);
      return;
    }

    if (!signupPassword) {
      setConfirmModalMessage('비밀번호를 입력해주세요.');
      setShowConfirmModal(true);
      return;
    }

    if (!major) {
      setConfirmModalMessage('학과를 입력해주세요.');
      setShowConfirmModal(true);
      return;
    }

    if (!name) {
      setConfirmModalMessage('이름을 입력해주세요.');
      setShowConfirmModal(true);
      return;
    }

    if (!confirmPassword || !studentNumber || !phone) {
      setConfirmModalMessage('필수 항목을 모두 입력해주세요.');
      setShowConfirmModal(true);
      return;
    }

    if (!isValidPassword(signupPassword)) {
      setConfirmModalMessage(
        '비밀번호는 영문자, 숫자, 특수문자(!@#$%^&*)를 각각 최소 1자 이상 포함한 8~20자리여야 합니다.'
      );
      setShowConfirmModal(true);
      setPasswordTouched(true);
      return;
    }

    if (signupPassword !== confirmPassword) {
      setConfirmModalMessage('비밀번호가 일치하지 않습니다.');
      setShowConfirmModal(true);
      return;
    }

    if (!isValidName(name)) {
      setConfirmModalMessage('이름은 2자 이상 17자 이하로 입력해주세요.');
      setShowConfirmModal(true);
      setNameTouched(true);
      return;
    }

    if (!isValidStudentNumber(studentNumber)) {
      setConfirmModalMessage('학번 10자리를 입력해주세요.');
      setShowConfirmModal(true);
      setStudentNumberTouched(true);
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      setConfirmModalMessage('전화번호를 입력해주세요.');
      setShowConfirmModal(true);
      setPhoneTouched(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const finalEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

      await register({
        email: finalEmail,
        password: signupPassword,
        name,
        department: major,
        studentNumber,
        phoneNumber: phone,
      });

      if (onSubmit) {
        onSubmit({
          email: finalEmail,
          name,
          password: signupPassword,
          confirmPassword,
          phone,
          major,
          studentNumber,
          isAgreed,
        });
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      const errorMessage =
        ERROR_MESSAGE_MAP.DUPLICATE_EMAIL ||
        ERROR_MESSAGE_MAP.DUPLICATE_PHONE ||
        ERROR_MESSAGE_MAP.DUPLICATE_STUDENT_NUMBER ||
        ERROR_MESSAGE_MAP.INVALID_VERIFICATION_CODE ||
        '회원가입에 실패했습니다. 다시 시도해주세요.';

      setConfirmModalMessage(errorMessage);
      setShowConfirmModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSend = async () => {
    setIsVerificationSending(true);
    try {
      const finalEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

      // 객체 파라미터 통일
      await requestEmailVerification({ email: finalEmail });

      console.log('인증번호 전송 (회원가입)');
      setIsVerificationSent(true);
      const startTime = Date.now();
      setCountdown(COUNTDOWN_DURATION);
      // localStorage에 시작 시간 저장
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, startTime.toString());
      setVerificationStatus(null);
    } catch (error) {
      console.error('인증번호 전송 실패:', error);
      // 토스트 메시지 표시
      if (showToast) {
        showToast('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsVerificationSending(false);
    }
  };

  const handleVerificationCheck = async () => {
    if (countdown === 0) return;
    if (verificationStatus === 'success') return;

    setIsVerificationChecking(true);
    try {
      const finalEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

      // 인증번호 변수명 반영
      await confirmEmailVerification({ email: finalEmail, code: verificationCode });

      console.log('인증번호 확인 (회원가입)');
      setVerificationStatus('success');
      // 인증 성공 시 localStorage에서 카운트다운 제거
      localStorage.removeItem(COUNTDOWN_STORAGE_KEY);
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
      const errorResponse = error?.response?.data;
      const errorMessage =
        ERROR_MESSAGE_MAP[errorResponse?.code] || ERROR_MESSAGE_MAP.INVALID_VERIFICATION_CODE;

      setConfirmModalMessage(errorMessage);
      setShowConfirmModal(true);
      setVerificationStatus('error');
    } finally {
      setIsVerificationChecking(false);
    }
  };

  // 컴포넌트 마운트 시 localStorage에서 카운트다운 복원
  useEffect(() => {
    const savedStartTime = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    if (savedStartTime) {
      const startTime = parseInt(savedStartTime, 10);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, COUNTDOWN_DURATION - elapsed);

      if (remaining > 0) {
        setIsVerificationSent(true);
        setCountdown(remaining);
      } else {
        // 만료된 경우 localStorage에서 제거
        localStorage.removeItem(COUNTDOWN_STORAGE_KEY);
      }
    }
  }, []);

  // 카운트다운 타이머 - localStorage의 시작 시간을 기준으로 계산
  useEffect(() => {
    if (isVerificationSent) {
      const timer = setInterval(() => {
        const savedStartTime = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
        if (savedStartTime) {
          const startTime = parseInt(savedStartTime, 10);
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          const remaining = Math.max(0, COUNTDOWN_DURATION - elapsed);

          setCountdown(remaining);

          if (remaining <= 0) {
            localStorage.removeItem(COUNTDOWN_STORAGE_KEY);
          }
        } else {
          setCountdown(0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isVerificationSent]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // 1단계: 인증번호 확인
  if (step === 1) {
    return (
      <>
        <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
          <form onSubmit={(e) => e.preventDefault()}>
            <LoginTitle title="회원가입" />
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb="mb-3"
              disabled={verificationCode.length > 0}
              textColor={verificationCode.length > 0 ? 'text-[#D3D3D3]' : 'text-black'}
              rightButton={
                <VerificationButton
                  onClick={handleVerificationSend}
                  disabled={!email}
                  isActive={!!email}
                  isResend={isVerificationSent}
                  text={isVerificationSent ? '인증번호 재전송' : '인증번호 전송'}
                  isLoading={isVerificationSending}
                />
              }
            />
            <div>
              <PasswordInput
                label="인증번호"
                value={verificationCode}
                onChange={(e) => {
                  // 인증 성공 후에는 인증번호 변경 불가
                  if (verificationStatus === 'success') return;
                  setVerificationCode(e.target.value);
                  setVerificationStatus(null);
                  setShowConfirmModal(false); // 입력 시 모달 닫기
                }}
                placeholder="인증번호를 입력해주세요"
                hideLabel
                hideToggle
                mb="mb-0"
                maxWidth="max-w-full sm:max-w-[600px]"
                disabled={verificationStatus === 'success'}
                rightButton={
                  <VerificationButton
                    onClick={handleVerificationCheck}
                    disabled={!verificationCode || verificationStatus === 'success'}
                    text="인증번호 확인"
                    isActive={!!email && verificationStatus !== 'success'}
                    isLoading={isVerificationChecking}
                  />
                }
              />
              <div className="h-0 mb-6">
                {isVerificationSent && (
                  <div
                    className="flex justify-between items-center"
                    style={{ transform: 'translateY(4px)' }}
                  >
                    <div className="text-[#FF7D56] text-sm max-[480px]:text-xs text-left font-['Pretendard'] ml-0">
                      {countdown === 0 && '입력 시간이 만료되었습니다.'}
                    </div>
                    <div className="text-[#B0B0B0] text-sm max-[480px]:text-xs text-right font-['Pretendard'] ml-3">
                      입력대기시간: {formatTime(countdown)}
                    </div>
                  </div>
                )}
                {verificationStatus === 'success' && (
                  <div
                    className="text-[#00A424] text-sm max-[480px]:text-xs text-left font-['Pretendard'] ml-0"
                    style={{ transform: 'translateY(-12px) translateX(4px)' }}
                  >
                    인증번호가 일치합니다.
                  </div>
                )}
                {verificationStatus === 'error' && countdown > 0 && (
                  <div
                    className="text-[#FF7D56] text-sm max-[480px]:text-xs text-left font-['Pretendard'] ml-0"
                    style={{ transform: 'translateY(-12px) translateX(4px)' }}
                  >
                    {ERROR_MESSAGE_MAP.INVALID_VERIFICATION_CODE}
                  </div>
                )}
              </div>
            </div>
          </form>

          <div className="w-full mt-24">
            <LoginButton onClick={handleNextStep} disabled={verificationStatus !== 'success'}>
              다음
            </LoginButton>
          </div>
        </div>

        <div className="mt-3">
          <SignupLink questionText="이미 계정이 있으신가요?" linkText="로그인" linkPath="/login" />
        </div>

        <CheckModal
          isOpen={showConfirmModal}
          cancel={() => setShowConfirmModal(false)}
          buttonColor={
            confirmModalMessage === ERROR_MESSAGE_MAP.INVALID_VERIFICATION_CODE
              ? 'bg-[#FF7D56]'
              : 'bg-button-green'
          }
        >
          {confirmModalMessage}
        </CheckModal>
      </>
    );
  }

  // 2단계: 회원정보 입력
  const displayEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit}>
        <LoginTitle title="회원가입" />
        <SignUpInput
          label="아이디"
          value={displayEmail}
          onChange={() => {}}
          disabled
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
            placeholder="abcd@1234"
            mb="mb-0"
            required={true}
            hideToggle={false}
            defaultShowPassword={false}
            isSuccess={passwordTouched && signupPassword && isValidPassword(signupPassword)}
          />
          <div className="h-5 mb-6" style={{ transform: 'translateY(5px)' }}>
            <p
              className={`text-xs min-[761px]:text-sm font-['Pretendard'] font-medium ${
                passwordTouched && signupPassword
                  ? isValidPassword(signupPassword)
                    ? 'text-[#00A424]'
                    : 'text-[#FF7D56]'
                  : 'text-[#1A1A1A]'
              }`}
            >
              비밀번호는 영문자, 숫자, 특수문자(!@#$%^&*)를 각각 최소 1자 이상 포함한 8~20자리여야
              합니다.
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
            defaultShowPassword={false}
            isSuccess={
              confirmPassword &&
              isValidPassword(signupPassword) &&
              signupPassword === confirmPassword
            }
          />
          <div className="h-5 mb-6" style={{ transform: 'translateY(5px)' }}>
            {confirmPassword &&
              isValidPassword(signupPassword) &&
              signupPassword === confirmPassword && (
                <p className="text-[#00A424] text-xs min-[761px]:text-sm font-['Pretendard'] font-medium">
                  비밀번호가 일치합니다.
                </p>
              )}
            {confirmPassword && signupPassword !== confirmPassword && (
              <p className="text-[#FF7D56] text-xs min-[761px]:text-sm font-['Pretendard'] font-medium">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>
        </div>

        <SignUpInput
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          placeholder="홍길동"
          required
          bgColor="#FAFBF8"
          mb="mb-6"
        />
        <SignUpInput
          label="학과"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="소프트웨어학과"
          required
          mb="mb-6"
          bgColor="#FAFBF8"
        />
        <SignUpInput
          label="학번"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          onBlur={() => setStudentNumberTouched(true)}
          placeholder="2000000000"
          required
          mb="mb-6"
          maxLength={10}
          bgColor="#FAFBF8"
        />
        <SignUpInput
          label="전화번호"
          type="tel"
          value={phone}
          onChange={(e) => {
            const newValue = e.target.value;
            const formatted = formatPhoneNumber(newValue, previousPhone);
            setPreviousPhone(phone);
            setPhone(formatted);
          }}
          onBlur={() => setPhoneTouched(true)}
          placeholder="010-1111-1111"
          required
          mb="mb-6"
          bgColor="#FAFBF8"
        />

        <AgreeForm onAgreeChange={setIsAgreed} required />

        <div className="w-full mt-8">
          <LoginButton
            onClick={handleSubmit}
            disabled={
              !name ||
              !signupPassword ||
              !confirmPassword ||
              !phone ||
              !major ||
              !studentNumber ||
              !isAgreed ||
              !isValidPassword(signupPassword) ||
              signupPassword !== confirmPassword ||
              isSubmitting
            }
            isLoading={isSubmitting}
          >
            다음
          </LoginButton>
        </div>
      </form>

      <div className="mt-4">
        <SignupLink questionText="이미 계정이 있으신가요?" linkText="로그인" linkPath="/login" />
      </div>

      <CheckModal
        isOpen={showConfirmModal}
        cancel={() => setShowConfirmModal(false)}
        buttonColor={
          confirmModalMessage === '잘못된 인증번호입니다.' ? 'bg-[#FF7D56]' : 'bg-button-green'
        }
      >
        {confirmModalMessage}
      </CheckModal>
    </div>
  );
}
