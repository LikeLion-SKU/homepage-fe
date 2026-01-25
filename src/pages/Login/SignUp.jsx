import { useNavigate } from 'react-router-dom';

import SignUpForm from '@/components/login/SignUpForm';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (credentials) => {
    console.log('Sign up attempt:', credentials);
    // TODO: 실제 회원가입 로직 구현
    // 회원가입 성공 후 Welcome 페이지로 이동
    // sessionStorage에 플래그 설정 (직접 접근 방지용)
    sessionStorage.setItem('signupCompleted', 'true');
    navigate(`/welcome?name=${encodeURIComponent(credentials.name)}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 flex-1"
      style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: 0, overflow: 'hidden' }}
    >
      <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
}
