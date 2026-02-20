import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import { reissuePassword, requestEmailVerification } from '@/api/authApi';
import CheckModal from '@/components/common/Modal/CheckModal';

import EmailInput from '../login/EmailInput';
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
  const [isVerificationSending, setIsVerificationSending] = useState(false);
  const [isVerificationChecking, setIsVerificationChecking] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  // @ts-ignore
  const { showToast } = useOutletContext();

  // localStorage 키
  const COUNTDOWN_STORAGE_KEY = 'password_find_verification_countdown';
  const COUNTDOWN_DURATION = 300; // 5분 = 300초

  // 에러 메시지 매핑
  const ERROR_MESSAGE_MAP = {
    INVALID_VERIFICATION_CODE: '인증번호가 일치하지 않습니다.',
  };

  const handleVerificationSend = async () => {
    setIsVerificationSending(true);
    try {
      // 이메일 값에 @skuniv.ac.kr이 없으면 추가
      const finalEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

      // 인증번호 전송 API 호출
      await requestEmailVerification({ email: finalEmail });

      setIsVerificationSent(true);
      const startTime = Date.now();
      setCountdown(COUNTDOWN_DURATION);
      // localStorage에 시작 시간 저장
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, startTime.toString());
      setVerificationStatus(null); // 상태 초기화
    } catch (error) {
      console.error('인증번호 전송 실패:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
      if (showToast) {
        showToast('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsVerificationSending(false);
    }
  };

  const handleVerificationCheck = async () => {
    // 만료된 경우 에러 메시지 표시하지 않음
    if (countdown === 0) {
      return;
    }

    if (!password) {
      return;
    }

    // 인증 성공 후에는 재확인 불가
    if (verificationStatus === 'success') {
      return;
    }

    // 이전 에러 상태 초기화
    if (verificationStatus === 'error') {
      setVerificationStatus(null);
    }

    setIsVerificationChecking(true);
    try {
      // 이메일 값에 @skuniv.ac.kr이 없으면 추가
      const finalEmail = email.includes('@skuniv.ac.kr') ? email : `${email}@skuniv.ac.kr`;

      // 비밀번호 재발급 API 호출 (인증번호 확인과 함께)
      const response = await reissuePassword({ email: finalEmail, code: password });

      // API 응답에서 임시 비밀번호 가져오기
      // API 응답 구조: { success: true, code: 200, message: "...", data: { temporaryPassword: "..." } }
      // reissuePassword는 .then((r) => r.data)를 반환하므로 response는 이미 r.data입니다
      const tempPassword = response?.data?.temporaryPassword;

      if (!tempPassword) {
        console.error('API 응답에 temporaryPassword가 없습니다:', response);
        setVerificationStatus('error');
        return;
      }

      setVerificationStatus('success');
      // 인증 성공 시 localStorage에서 카운트다운 제거
      localStorage.removeItem(COUNTDOWN_STORAGE_KEY);

      // 인증 성공 시 결과 페이지로 이동
      if (onSubmit) {
        onSubmit({ email: finalEmail, password });
      }
      navigate('/password/result', { state: { email: finalEmail, tempPassword } });
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
      const errorResponse = error?.response?.data;
      const errorMessage =
        ERROR_MESSAGE_MAP[errorResponse?.code] || ERROR_MESSAGE_MAP.INVALID_VERIFICATION_CODE;

      setVerificationStatus('error');
      setConfirmModalMessage(errorMessage);
      setShowConfirmModal(true);
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

  // 카운트다운 포맷팅 (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
      <form onSubmit={(e) => e.preventDefault()}>
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
              isLoading={isVerificationSending}
            />
          }
        />
        <div>
          <PasswordInput
            label="인증번호"
            value={password}
            onChange={(e) => {
              // 인증 성공 후에는 인증번호 변경 불가
              if (verificationStatus === 'success') return;
              setPassword(e.target.value);
              setVerificationStatus(null); // 입력 시 상태 초기화
              setShowConfirmModal(false); // 입력 시 모달 닫기
            }}
            placeholder="인증번호를 입력해주세요"
            hideLabel
            hideToggle
            mb="mb-0"
            maxWidth="max-w-full sm:max-w-[600px]"
            disabled={!isVerificationSent || verificationStatus === 'success'}
            rightButton={
              <VerificationButton
                onClick={handleVerificationCheck}
                disabled={!password || !isVerificationSent || verificationStatus === 'success'}
                text="인증번호 확인"
                isActive={!!email && isVerificationSent && verificationStatus !== 'success'}
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
                <div className="text-[#FF7D56] text-sm text-left font-['Pretendard'] ml-0">
                  {countdown === 0 && '입력 시간이 만료되었습니다.'}
                </div>
                <div className="text-[#B0B0B0] text-sm text-right font-['Pretendard'] ml-3">
                  입력대기시간: {formatTime(countdown)}
                </div>
              </div>
            )}
            {verificationStatus === 'success' && (
              <div
                className="text-[#00A424] text-sm text-left font-['Pretendard'] ml-0"
                style={{ transform: 'translateY(-15px) translateX(4px)' }}
              >
                인증번호가 일치합니다.
              </div>
            )}
            {verificationStatus === 'error' && countdown > 0 && (
              <div
                className="text-[#FF7D56] text-sm text-left font-['Pretendard'] ml-0"
                style={{ transform: 'translateY(-15px) translateX(4px)' }}
              >
                {ERROR_MESSAGE_MAP.INVALID_VERIFICATION_CODE}
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="w-full mb-6 text-center">
        <div
          className="border border-gray-300 rounded px-4 py-5 max-[480px]:px-3 max-[480px]:py-4 bg-[#FAFBF8]"
          style={{ transform: 'translateY(45px)' }}
        >
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            아이디는 학교 이메일이며,
          </p>
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            학교 포탈 아이디와는 연동되지 않습니다.
          </p>
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            아이디 확인이 어려운 경우
          </p>
          <p className="text-black text-xm max-[480px]:text-xs font-['Pretendard'] mb-1">
            {' '}
            skuofficial@likelion.org로 문의바랍니다.
          </p>
        </div>
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
    </div>
  );
}
