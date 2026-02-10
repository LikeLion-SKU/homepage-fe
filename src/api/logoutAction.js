import { APIService } from '@/api/api';
import useAuthStore from '@/store/useAuthStore';

export const logoutAction = async () => {
  const { startLogout, setLogout } = useAuthStore.getState();
  startLogout(); // 로그아웃 시작 상태
  try {
    // 백엔드에 로그아웃 요청 (쿠키 삭제 요청)
    await APIService.private.post('/v1/auth/logout');
  } catch (error) {
    console.error('로그아웃 API 호출 실패:', error);
  } finally {
    setLogout(); // 클라이언트 메모리에 남은 유저 정보 삭제(쿠키랑 별개)

    // 쿠키 삭제할 시간 주기
    setTimeout(() => {
      window.location.href = '/';
    }, 100); // 로그아웃 되면 메인 페이지로 이동
  }
};
