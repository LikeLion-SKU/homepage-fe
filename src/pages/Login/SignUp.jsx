import { useNavigate } from 'react-router-dom';

import SignUpForm from '@/components/login/SignUpForm';
import { markSignupCompleted } from '@/hooks/usePreventDirectAccess';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (credentials) => {
    console.log('Sign up attempt:', credentials);
    // TODO: 실제 회원가입 로직 구현
    // 회원가입 성공 후 Welcome 페이지로 이동
    // TTL 방식으로 5분 동안 재접속 허용
    markSignupCompleted();
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
