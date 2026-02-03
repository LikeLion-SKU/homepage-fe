import { useNavigate } from 'react-router';

import { login } from '@/api/authApi';
import LoginForm from '@/components/login/LoginForm';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      // 이메일 값에 @skuniv.ac.kr이 없으면 추가
      const finalEmail = credentials.email.includes('@skuniv.ac.kr')
        ? credentials.email
        : `${credentials.email}@skuniv.ac.kr`;

      await login({
        email: finalEmail,
        password: credentials.password,
      });

      // 쿠키 기반 인증이므로 서버에서 쿠키를 설정함
      // 클라이언트에서 localStorage에 저장할 필요 없음
      // 로그인 성공 시 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 flex-1"
      style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: 0, overflow: 'hidden' }}
    >
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
