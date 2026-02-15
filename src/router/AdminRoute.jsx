import { useEffect, useState } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import { getUserRole } from '@/api/userApi';
import useAuthStore from '@/store/useAuthStore';

export default function AdminRoute() {
  const isLogin = useAuthStore((state) => state.isLoggedIn);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const showAdmin = async () => {
      if (isLogin) {
        const userRole = await getUserRole();

        if (userRole === 'ADMIN') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };
    showAdmin();
  }, [isLogin]);
  const context = useOutletContext();

  if (!isAdmin) {
    return <Navigate to="/" replace />; //토큰 없으면 로그인 페이지로 경로는 추후 수정
  }

  return <Outlet context={context} />;
}
