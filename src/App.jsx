import { RouterProvider, createBrowserRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootLayout from '@/layouts/RootLayout';
import ServiceLayout from '@/layouts/ServiceLayout';
import AdminApplication from '@/pages/Admin/AdminApplication';
import AdminInterview from '@/pages/Admin/AdminInterview';
import AdminNotice from '@/pages/Admin/AdminNotice';
import AdminOption from '@/pages/Admin/AdminOption';
import AdminPage from '@/pages/Admin/AdminPage';
import AdminProject from '@/pages/Admin/AdminProject';
import AdminProjectEdit from '@/pages/Admin/AdminProjectEdit';
import AdminUser from '@/pages/Admin/AdminUser';
import Apply from '@/pages/Apply/Apply';
import ApplyBasicInfo from '@/pages/Apply/ApplyBasicInfo';
import ApplyCommon from '@/pages/Apply/ApplyCommon';
import ApplyComplete from '@/pages/Apply/ApplyComplete';
import ApplyTrack from '@/pages/Apply/ApplyTrack';
import Login from '@/pages/Login/Login';
import SignUp from '@/pages/Login/SignUp';
import Welcome from '@/pages/Login/Welcome';
import Main from '@/pages/Main/Main';
import Member from '@/pages/Member/Member';
import MyPage from '@/pages/MyPage/MyPage';
import PasswordChange from '@/pages/MyPage/PasswordChange';
import PasswordFind from '@/pages/PasswordFind/PasswordFind';
import PasswordResult from '@/pages/PasswordFind/PasswordResult';
import ProjectList from '@/pages/Project/ProjectList';
import ProjectViewDetail from '@/pages/Project/ProjectViewDetail';
import Recruitment from '@/pages/Recruitment/Recruitment';
import Result from '@/pages/Result/Result';
import ResultNotice from '@/pages/Result/ResultNotice';
import AdminRoute from '@/router/AdminRoute';
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
          { path: '/mypage/password/change', Component: PasswordChange },
          { path: '/welcome', Component: Welcome },
          { path: '/apply/complete', Component: ApplyComplete },
          {
            path: '/apply',
            Component: Apply, // 부모가 중심을 잡습니다.
            children: [
              { index: true, Component: ApplyBasicInfo },
              { path: 'info', Component: ApplyBasicInfo },
              { path: 'common', Component: ApplyCommon },
              { path: 'track', Component: ApplyTrack },
            ],
          },
          { path: '/result/notice', Component: ResultNotice },
        ],
      },
      {
        // 기타 공개 페이지들, 로그인 없이도 볼 수 있는 페이지
        children: [
          { path: '/project', Component: ProjectList },
          { path: '/project/viewDetail', Component: ProjectViewDetail },
          { path: '/recruit', Component: Recruitment },
          { path: '/member', Component: Member },
          { path: '/login', Component: Login },
          { path: '/signup', Component: SignUp },
          { path: '/password/find', Component: PasswordFind },
          { path: '/password/result', Component: PasswordResult },
        ],
      },
      {
        path: '/admin',
        /*Component: AdminRoute, */
        children: [
          { index: true, Component: AdminPage },
          { path: 'user', Component: AdminUser },
          { path: 'option', Component: AdminOption },
          { path: 'project', Component: AdminProject },
          { path: 'project/edit', Component: AdminProjectEdit },
          { path: 'notice', Component: AdminNotice },
          { path: 'interview', Component: AdminInterview },
          { path: 'application', Component: AdminApplication },

          //{path: '', Component: },
        ],
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
