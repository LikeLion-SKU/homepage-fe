import { Navigate, isRouteErrorResponse, useRouteError } from 'react-router-dom';

import useAuthStore from '@/store/useAuthStore';

export default function ErrorBoundary() {
  const error = useRouteError();
  const { isLoggingOut } = useAuthStore.getState();

  if (isRouteErrorResponse(error)) {
    const status = error.status;

    if (status === 401 && isLoggingOut) {
      return <Navigate to="/" replace />;
    }

    if (status === 400) return <Navigate to="/error/400" replace />;
    if (status === 401) return <Navigate to="/error/401" replace />;
    if (status === 403) return <Navigate to="/error/403" replace />;
    if (status === 404) return <Navigate to="/error/404" replace />;
    if (status >= 500) return <Navigate to="/error/500" replace />;
  }

  // axios 에러 등 route error가 아닌 경우에도 status 확인
  // const status = error?.response?.status || error?.status;
  // if (status === 400) return <Navigate to="/error/400" replace />;
  // if (status === 403) return <Navigate to="/error/403" replace />;
  // if (status >= 500) return <Navigate to="/error/500" replace />;

  console.error('Unexpected Error:', error);
  return <Navigate to="/" replace />;
}
