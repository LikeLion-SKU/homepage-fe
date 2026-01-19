import { RouterProvider, createBrowserRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootLayout from '@/layouts/RootLayout';
import ServiceLayout from '@/layouts/ServiceLayout';
import Main from '@/pages/Main/Main';
import MyPage from '@/pages/MyPage/MyPage';
import Project from '@/pages/Project/Project';
import ProtectedRoute from '@/router/ProtectedRoute';

const router = createBrowserRouter([
  // 일반 서비스 브랜치 (RootLayout 사용)
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Main }, //경로가 /일 때 보여줄 페이지

      {
        // 보호가 필요한 페이지들,ProtectedRoute에서 토큰 검사
        Component: ProtectedRoute,
        children: [
          { path: '/mypage', Component: MyPage },
          // { path: "", Component:  },
        ],
      },
      {
        // 기타 공개 페이지들, 로그인 없이도 볼 수 있는 페이지
        children: [{ path: '/project', Component: Project }],
      },
    ],
  },

  // 인증/회원가입 브랜치 (ServiceLayout 사용, RootLayout 미사용)
  {
    path: '/auth',
    Component: ServiceLayout,
    children: [
      //{ index: true, Component:  },//로그인 페이지 만들어서 컴포넌트에 추가
      // { path: "", Component: SignupPage },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 1 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
