import { useMemo } from 'react';

/**
 * Welcome 페이지에 직접 접근하는 것을 방지하는 훅
 * 회원가입 완료 후에만 접근 가능하도록 sessionStorage를 사용
 */
export function usePreventDirectAccess() {
  const isAccessSuccess = useMemo(() => {
    // sessionStorage에서 회원가입 완료 플래그 확인
    const signupCompleted = sessionStorage.getItem('signupCompleted');

    if (signupCompleted === 'true') {
      // 플래그를 한 번 사용한 후 제거 (한 번만 접근 가능)
      sessionStorage.removeItem('signupCompleted');
      return true;
    }
    return false;
  }, []);

  return isAccessSuccess;
}
