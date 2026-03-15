import { RouterProvider, createBrowserRouter, redirect } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getCurrentForm } from '@/api/applicationForm';
import { getResumeListLoader } from '@/api/applicationQuestion';
import { questionsLoader } from '@/api/applicationQuestion';
import { getApplicationsLoader } from '@/api/applicationRecord';
import { basicInfoLoader } from '@/api/applicationRecord';
import { getResult } from '@/api/applicationResult';
import { logoutAction } from '@/api/authApi';
import { getSemester } from '@/api/semesterApi';
import { myPageLoader } from '@/api/userApi';
import RootLayout from '@/layouts/RootLayout';
import ServiceLayout from '@/layouts/ServiceLayout';
import AdminApplication from '@/pages/Admin/AdminApplication';
import AdminInterview from '@/pages/Admin/AdminInterview';
import AdminNotice from '@/pages/Admin/AdminNotice';
import AdminOption from '@/pages/Admin/AdminOption';
import AdminPage from '@/pages/Admin/AdminPage';
import AdminProject from '@/pages/Admin/AdminProject';
import AdminProjectEdit from '@/pages/Admin/AdminProjectEdit';
import AdminQuestion from '@/pages/Admin/AdminQuestion';
import AdminQuestionDetail from '@/pages/Admin/AdminQuestionDetail';
import AdminUser from '@/pages/Admin/AdminUser';
import Apply from '@/pages/Apply/Apply';
import ApplyBasicInfo from '@/pages/Apply/ApplyBasicInfo';
import ApplyCommon from '@/pages/Apply/ApplyCommon';
import ApplyComplete from '@/pages/Apply/ApplyComplete';
import ApplyTrack from '@/pages/Apply/ApplyTrack';
import FinalConfirm from '@/pages/Apply/FinalConfirm';
import Error400 from '@/pages/Error/Error400';
import Error403 from '@/pages/Error/Error403';
import Error404 from '@/pages/Error/Error404';
import ErrorBoundary from '@/pages/Error/ErrorBoundary';
import LoginRequired from '@/pages/Error/LoginRequired';
import ServerError from '@/pages/Error/ServerError';
import Login from '@/pages/Login/Login';
import SignUp from '@/pages/Login/SignUp';
import Welcome from '@/pages/Login/Welcome';
import Main from '@/pages/Main/Main';
import Member from '@/pages/Member/Member';
import Application from '@/pages/MyPage/Application';
import MyPage from '@/pages/MyPage/MyPage';
import PasswordChange from '@/pages/MyPage/PasswordChange';
import Reschedule from '@/pages/MyPage/Reschedule';
import ScheduleCheck from '@/pages/MyPage/ScheduleCheck';
import PasswordFind from '@/pages/PasswordFind/PasswordFind';
import PasswordResult from '@/pages/PasswordFind/PasswordResult';
import ProjectList from '@/pages/Project/ProjectList';
import ProjectViewDetail from '@/pages/Project/ProjectViewDetail';
import Recruitment from '@/pages/Recruitment/Recruitment';
import Result from '@/pages/Result/Result';
import ResultNotice from '@/pages/Result/ResultNotice';
import AdminRoute from '@/router/AdminRoute';
import {
  requireInterviewScheduleChangeableLoader,
  requireInterviewScheduleConfirmedLoader,
  resultNoticeLoader,
} from '@/router/applicationAccessLoader';
import { isWithinPeriod } from '@/utils/Date';

const router = createBrowserRouter([
  // 일반 서비스 브랜치 (RootLayout 사용)
  {
    Component: RootLayout,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, Component: Main }, //경로가 /일 때 보여줄 페이지

      {
        // 보호가 필요한 페이지들,ProtectedRoute에서 토큰 검사
        /*Component: ProtectedRoute,*/
        children: [
          { path: '/mypage', Component: MyPage, loader: myPageLoader },
          {
            path: '/mypage/reschedule',
            Component: Reschedule,
            loader: requireInterviewScheduleChangeableLoader,
          },
          {
            path: '/mypage/schedule-check',
            Component: ScheduleCheck,
            loader: requireInterviewScheduleConfirmedLoader,
          },
          { path: '/mypage/password/change', Component: PasswordChange },
          { path: '/welcome', Component: Welcome },
          { path: '/apply/complete', Component: ApplyComplete },
          {
            path: '/apply',
            Component: Apply,
            loader: async () => {
              const [basicInfo, formData] = await Promise.all([
                basicInfoLoader(),
                getCurrentForm(),
              ]);
              if (!isWithinPeriod(formData?.openAt, formData?.closeAt)) {
                return redirect('/recruit');
              }
              return basicInfo;
            },
            children: [
              { index: true, Component: ApplyBasicInfo },
              { path: 'info', Component: ApplyBasicInfo },
              { path: 'common', Component: ApplyCommon },
              { path: 'track', Component: ApplyTrack },
              { path: 'confirm', Component: FinalConfirm, loader: questionsLoader },
            ],
          },
          { path: '/result/notice', Component: ResultNotice, loader: resultNoticeLoader },
          { path: '/result', Component: Result, loader: getResult },
          { path: '/application', Component: Application },
        ],
      },
      {
        // 기타 공개 페이지들, 로그인 없이도 볼 수 있는 페이지
        children: [
          { path: '/project', Component: ProjectList },
          { path: '/project/viewDetail', Component: ProjectViewDetail },
          { path: '/recruit', Component: Recruitment, loader: myPageLoader },
          { path: '/member', Component: Member },
          { path: '/login', Component: Login },
          { path: '/signup', Component: SignUp },
          { path: '/password/find', Component: PasswordFind },
          { path: '/password/result', Component: PasswordResult },
          { path: '/error/400', Component: Error400 },
          { path: '/error/401', Component: LoginRequired },
          { path: '/error/403', Component: Error403 },
          { path: '*', Component: Error404 },
          { path: '/error/500', Component: ServerError },
          { path: 'logout', action: logoutAction }, // 페이지는 없지만 action 등록용
        ],
      },
      {
        path: '/admin',
        Component: AdminRoute,
        children: [
          { index: true, Component: AdminPage },
          { path: 'user', Component: AdminUser, loader: getSemester },
          { path: 'option', Component: AdminOption },
          { path: 'project', Component: AdminProject },
          { path: 'project/edit', Component: AdminProjectEdit },
          { path: 'notice', Component: AdminNotice },
          { path: 'interview', Component: AdminInterview, loader: getSemester },
          {
            path: 'application',
            Component: AdminApplication,
            loader: ({ request }) => {
              const url = new URL(request.url);
              const semester = url.searchParams.get('semester');
              const track = url.searchParams.get('track');
              const search = url.searchParams.get('search');

              // 첫 페이지를 불러오기 위해 호출 (lastCursor는 처음엔 null)
              return getApplicationsLoader(semester, track, search, null, 10);
            },
          },
          { path: 'resume', Component: AdminQuestion, loader: getResumeListLoader },
          { path: 'resume/new', Component: AdminQuestionDetail },
          { path: 'resume/:id', Component: AdminQuestionDetail },

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
