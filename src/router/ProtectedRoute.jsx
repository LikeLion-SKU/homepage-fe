import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('accessToken');
  const context = useOutletContext();

  if (!token) {
    return <Navigate to="/" replace />; //토큰 없으면 로그인 페이지로 경로는 추후 수정
  }

  return <Outlet context={context} />;
}
