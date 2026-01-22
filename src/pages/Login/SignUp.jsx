import SignUpForm from '@/components/login/SignUpForm';

export default function SignUp() {
  const handleSignUp = (credentials) => {
    console.log('Sign up attempt:', credentials);
    // TODO: 실제 회원가입 로직 구현
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 flex-1"
      style={{ paddingTop: '120px', paddingBottom: '160px', minHeight: 0, overflow: 'hidden' }}
    >
      <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
}
