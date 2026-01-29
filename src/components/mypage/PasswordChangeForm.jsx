import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import Modal from '@/components/common/Modal/ConfirmModal';

import LoginButton from '../login/LoginButton';
import LoginTitle from '../login/LoginTitle';
import PasswordInput from '../login/PasswordInput';

export default function PasswordChangeForm({ onSubmit }) {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

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
    // 비밀번호가 일치하고 모든 필드가 입력되어 있을 때만 모달 표시
    if (passwordMatchStatus === 'match' && currentPassword && newPassword && confirmPassword) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    if (onSubmit) {
      await onSubmit({ currentPassword, newPassword, confirmPassword });
    }
    // 비밀번호 변경 후 마이페이지로 이동
    navigate('/mypage');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-2 sm:px-0">
      <form onSubmit={handleSubmit}>
        <LoginTitle title="비밀번호 변경" />
        <PasswordInput
          label="현재 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="abc@1234"
          mb="mb-4"
          hideToggle={true}
        />
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
                  ? 'text-green-500'
                  : 'text-red-500'
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
            <div className="text-red-500 text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
          {passwordMatchStatus === 'match' &&
            isValidPassword(newPassword) &&
            newPassword === confirmPassword && (
              <div className="text-green-500 text-xs min-[761px]:text-sm text-left font-['Pretendard'] mb-4 mt-1">
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
            passwordMatchStatus !== 'match'
          }
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
