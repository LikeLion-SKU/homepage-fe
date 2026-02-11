import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import Modal from '@/components/common/Modal/ConfirmModal';
import useAuthStore from '@/store/useAuthStore';

import LoginButton from '../login/LoginButton';
import LoginTitle from '../login/LoginTitle';
import PasswordInput from '../login/PasswordInput';

export default function PasswordChangeForm({ onSubmit, isLoading = false }) {
  const navigate = useNavigate();
  // @ts-ignore
  const { showToast } = useOutletContext() || {};
  const currentPasswordFromStore = useAuthStore((state) => state.currentPassword);
  const isTemporaryPassword = useAuthStore((state) => state.isTemporaryPassword);
  const setLogin = useAuthStore((state) => state.setLogin);
  const user = useAuthStore((state) => state.user);

  // 임시 비밀번호로 로그인한 경우에만 현재 비밀번호 필드에 자동 입력
  const [currentPassword, setCurrentPassword] = useState(() => {
    // 초기 렌더링 시 임시 비밀번호로 로그인한 경우에만 자동 입력
    if (isTemporaryPassword && currentPasswordFromStore) {
      return currentPasswordFromStore;
    }
    return '';
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [currentPasswordTouched, setCurrentPasswordTouched] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  // 현재 비밀번호 일치 여부 확인
  const currentPasswordStatus = useMemo(() => {
    // 비밀번호 변경 후에는 항상 일치로 표시 (메시지 유지)
    if (isPasswordChanged) {
      return 'match';
    }
    if (!currentPassword || !currentPasswordFromStore) {
      return null;
    }
    if (currentPassword === currentPasswordFromStore) {
      return 'match';
    }
    return 'mismatch';
  }, [currentPassword, currentPasswordFromStore, isPasswordChanged]);

  // 비밀번호 유효성 검사: 최소 영문자 1자, 숫자 1자, 특수문자 1자를 포함한 8~20자리
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호 일치 여부 확인 (derived state)
  const passwordMatchStatus = useMemo(() => {
    if (confirmPassword.length > 0) {
      if (newPassword === confirmPassword) {
        return 'match';
      } else {
        return 'mismatch';
      }
    }
    return null;
  }, [newPassword, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 유효성 검사
    if (!isValidPassword(newPassword)) {
      setPasswordTouched(true);
      return;
    }
    // 현재 비밀번호가 일치하는지 확인
    if (currentPasswordStatus !== 'match') {
      return;
    }
    // 비밀번호가 일치하고 모든 필드가 입력되어 있을 때만 모달 표시
    if (passwordMatchStatus === 'match' && currentPassword && newPassword && confirmPassword) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);

    if (onSubmit && !isLoading) {
      try {
        await onSubmit({ currentPassword, newPassword, confirmPassword });
        // 비밀번호 변경 성공 시 저장된 비밀번호를 새 비밀번호로 업데이트, 임시 비밀번호 플래그 해제
        if (user) {
          setLogin(user, newPassword, false);
        }

        // 비밀번호 변경 완료 플래그 설정 (불일치 메시지만 숨김)
        setIsPasswordChanged(true);

        // 비밀번호 변경 성공 토스트 메시지 표시
        if (showToast) {
          showToast('비밀번호가 변경되었습니다.');
        }

        // 토스트 메시지가 표시된 후 마이페이지로 이동 (2초 후)
        setTimeout(() => {
          navigate('/mypage');
        }, 2000);
      } catch {
        // 에러 처리 (토스트 메시지 등)
        if (showToast) {
          showToast('비밀번호 변경에 실패했습니다.');
        }
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-2 sm:px-0">
      <form onSubmit={handleSubmit}>
        <LoginTitle title="비밀번호 변경" />
        <div>
          <PasswordInput
            label="현재 비밀번호"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              // 입력 중에는 메시지 표시를 위해 touched 상태 초기화
              if (isPasswordChanged) {
                // 비밀번호 변경 후에는 메시지를 다시 표시하지 않음
                return;
              }
              // 입력 중에는 항상 touched 상태를 false로 유지하여 메시지 표시
              setCurrentPasswordTouched(false);
            }}
            onBlur={() => {
              // blur 시에는 메시지를 숨기지 않음 (비밀번호 변경 버튼을 눌러도 메시지 유지)
            }}
            placeholder="abc@1234"
            mb="mb-0"
            hideToggle={true}
          />
          {currentPasswordStatus === 'match' && !currentPasswordTouched && !isPasswordChanged && (
            <div className="text-[#00A424] text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1">
              비밀번호가 일치합니다.
            </div>
          )}
          {currentPasswordStatus === 'match' && isPasswordChanged && (
            <div className="text-[#00A424] text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1">
              비밀번호가 일치합니다.
            </div>
          )}
          {currentPasswordStatus === 'mismatch' &&
            !currentPasswordTouched &&
            !isPasswordChanged && (
              <div className="text-[#FF7D56] text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1">
                비밀번호가 일치하지 않습니다.
              </div>
            )}
          {currentPasswordStatus === null && currentPassword && <div className="mb-4"></div>}
          {!currentPassword && <div className="mb-4"></div>}
        </div>
        <div>
          <PasswordInput
            label="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            placeholder="abcd@1234"
            mb="mb-0"
            hideToggle={true}
          />
          <div
            className={`text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1 break-words max-[375px]:whitespace-normal ${
              passwordTouched && newPassword
                ? isValidPassword(newPassword)
                  ? 'text-[#00A424]'
                  : 'text-[#FF7D56]'
                : 'text-[#000000]'
            }`}
          >
            비밀번호는 영문자, 숫자, 특수문자를 각각 최소 1자 이상 포함한 8~20자리여야 합니다.
          </div>
        </div>
        <div>
          <PasswordInput
            label="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력해주세요"
            mb="mb-0"
            hideToggle={true}
          />
          {passwordMatchStatus === 'mismatch' && (
            <div className="text-[#FF7D56] text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
          {passwordMatchStatus === 'match' &&
            isValidPassword(newPassword) &&
            newPassword === confirmPassword && (
              <div className="text-[#00A424] text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1">
                비밀번호가 일치합니다.
              </div>
            )}
          {passwordMatchStatus === null && <div className="mb-4"></div>}
        </div>
      </form>
      <div className="w-full mt-8">
        <LoginButton
          onClick={handleSubmit}
          disabled={
            !currentPassword ||
            !newPassword ||
            !confirmPassword ||
            !isValidPassword(newPassword) ||
            passwordMatchStatus !== 'match' ||
            currentPasswordStatus !== 'match' ||
            isLoading
          }
          isLoading={isLoading}
        >
          비밀번호 변경
        </LoginButton>
      </div>
      <Modal isOpen={isModalOpen} cancel={handleCancel} confirm={handleConfirm}>
        비밀번호를 변경하시겠습니까?
      </Modal>
    </div>
  );
}
