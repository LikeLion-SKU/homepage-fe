import PasswordFindForm from '@/components/passwordFind/PasswordFindForm';

export default function PasswordFind() {
  const handlePasswordFind = (credentials) => {
    console.log('Password find attempt:', credentials);
    // TODO: 실제 비밀번호 찾기 로직 구현
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 flex-1"
      style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: 0, overflow: 'hidden' }}
    >
      <PasswordFindForm onSubmit={handlePasswordFind} />
    </div>
  );
}
