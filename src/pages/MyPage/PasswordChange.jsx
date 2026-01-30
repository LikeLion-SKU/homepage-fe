import PasswordChangeForm from '@/components/mypage/PasswordChangeForm';

export default function PasswordChange() {
  const handlePasswordChange = async (credentials) => {
    try {
      // TODO: 실제 비밀번호 변경 API 호출
      // 엔드포인트 예: api/v1/auth/password/change
      // await APIService.private.put('api/v1/auth/password/change', {
      //   currentPassword: credentials.currentPassword,
      //   newPassword: credentials.newPassword,
      // });
      console.log('Password change attempt:', credentials);
      // 비밀번호 변경 성공 시 마이페이지로 이동 (PasswordChangeForm에서 처리)
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  };

  return (
    <div
      className="bg-white"
      style={{
        marginLeft: '-100vw',
        marginRight: '-100vw',
        paddingLeft: '100vw',
        paddingRight: '100vw',
      }}
    >
      <div
        className="flex flex-col items-center justify-center px-4 flex-1"
        style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: 0, overflow: 'hidden' }}
      >
        <PasswordChangeForm onSubmit={handlePasswordChange} />
      </div>
    </div>
  );
}
