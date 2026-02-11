import { useState } from 'react';

import { changePassword } from '@/api/userApi';
import PasswordChangeForm from '@/components/mypage/PasswordChangeForm';

export default function PasswordChange() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (credentials) => {
    setIsLoading(true);
    try {
      await changePassword({
        currentPassword: credentials.currentPassword,
        newPassword: credentials.newPassword,
        newPasswordConfirmation: credentials.confirmPassword,
      });
      // 비밀번호 변경 성공 시 마이페이지로 이동 (PasswordChangeForm에서 처리)
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
      throw error; // PasswordChangeForm에서 에러 처리할 수 있도록 throw
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 flex-1"
      style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: 0, overflow: 'hidden' }}
    >
      <PasswordChangeForm onSubmit={handlePasswordChange} isLoading={isLoading} />
    </div>
  );
}
