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

    if (status === 401) return <Navigate to="/error/401" replace />;
    if (status === 403) return <Navigate to="/error/403" replace />;
    if (status >= 500) return <Navigate to="/error/500" replace />;
    if (status === 404) return <Navigate to="/error/404" replace />;
  }
  console.error('Unexpected Error:', error);
  return <Navigate to="/" replace />;
}
