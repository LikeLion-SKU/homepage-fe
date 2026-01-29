import { useMemo } from 'react';

/**
 * 회원가입 완료 시점을 기록하는 함수
 * TTL 방식으로 5분 동안 재접속 허용
 */
export function markSignupCompleted() {
  sessionStorage.setItem('signupCompletedAt', String(Date.now()));
}

/**
 * Welcome 페이지에 직접 접근하는 것을 방지하는 훅
 * 회원가입 완료 후 5분 이내에만 접근 가능하도록 sessionStorage를 사용
 */
export function usePreventDirectAccess() {
  const isAccessSuccess = useMemo(() => {
    const at = Number(sessionStorage.getItem('signupCompletedAt'));
    // 5분(5 * 60 * 1000ms) 이내인지 확인
    const ok = Number.isFinite(at) && new Date().getTime() - at < 5 * 60 * 1000;
    return ok;
  }, []);

  return isAccessSuccess;
}
