import { useEffect, useState } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import { getUserRole } from '@/api/userApi';
import useAuthStore from '@/store/useAuthStore';

export default function AdminRoute() {
  const isLogin = useAuthStore((state) => state.isLoggedIn);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  useEffect(() => {
    const showAdmin = async () => {
      if (isLogin) {
        const userRole = await getUserRole();

        if (userRole === 'ADMIN') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    showAdmin();
  }, [isLogin]);
  const context = useOutletContext();

  if (isLoading) {
    return <div>권한 확인 중...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />; //토큰 없으면 로그인 페이지로 경로는 추후 수정
  }

  return <Outlet context={context} />;
}
