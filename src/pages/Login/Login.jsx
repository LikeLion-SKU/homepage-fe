import { useNavigate } from 'react-router';

import { login } from '@/api/authApi';
import LoginForm from '@/components/login/LoginForm';
import useAuthStore from '@/store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);

  const handleLogin = async (credentials) => {
    try {
      // 이메일 값에 @skuniv.ac.kr이 없으면 추가
      const finalEmail = credentials.email.includes('@skuniv.ac.kr')
        ? credentials.email
        : `${credentials.email}@skuniv.ac.kr`;

      const response = await login({
        email: finalEmail,
        password: credentials.password,
      });

      // 로그인 성공 시 상태 저장 (localStorage에 isLogin 저장)
      setLogin(response?.user || { email: finalEmail });

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
