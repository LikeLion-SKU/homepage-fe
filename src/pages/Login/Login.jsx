import { useNavigate, useOutletContext } from 'react-router';

import { login } from '@/api/authApi';
import LoginForm from '@/components/login/LoginForm';
import useAuthStore from '@/store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const setLogin = useAuthStore((state) => state.setLogin);
  // @ts-ignore
  const { showToast } = useOutletContext() || {};

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

      // 로그인 성공 시 상태 저장 (localStorage에 isLogin 저장, 비밀번호도 저장)
      setLogin(response?.user || { email: finalEmail }, credentials.password);

      // 로그인 성공 토스트 메시지 표시
      if (showToast) {
        showToast('로그인이 되었습니다.');
      }

      // 토스트 메시지가 표시된 후 메인 페이지로 이동 (1.5초 후)
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('로그인 실패:', error);
      // 로그인 실패 토스트 메시지 표시
      if (showToast) {
        showToast('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center px-4 flex-1"
      style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: 0, overflow: 'hidden' }}
    >
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
