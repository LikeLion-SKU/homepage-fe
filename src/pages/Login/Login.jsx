import LoginForm from '@/components/login/LoginForm';

export default function Login() {
  const handleLogin = (credentials) => {
    console.log('Login attempt:', credentials);
    // TODO: 실제 로그인 로직 구현
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
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
