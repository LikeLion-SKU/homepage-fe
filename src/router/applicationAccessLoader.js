import { redirect } from 'react-router';

import { getCurrentForm } from '@/api/applicationForm';
import { getApplicationStatus, myPageLoader } from '@/api/userApi';

export const requireSubmittedApplicationLoader = async () => {
  try {
    const status = await getApplicationStatus();
    if (!status?.documentSubmitted) {
      return redirect('/');
    }
    return null;
  } catch (error) {
    console.log('지원서 제출 여부 확인 실패:', error);
    return redirect('/');
  }
};

export const resultNoticeLoader = async () => {
  const accessGuard = await requireSubmittedApplicationLoader();
  if (accessGuard) {
    return accessGuard;
  }
  return getCurrentForm();
};

export const requireInterviewScheduleConfirmedLoader = async () => {
  try {
    const userData = await myPageLoader();
    if (!userData?.interviewScheduleConfirmed) {
      return redirect('/');
    }
    return null;
  } catch (error) {
    console.log('면접 일정 확인 접근 권한 확인 실패:', error);
    return redirect('/');
  }
};

export const requireInterviewScheduleChangeableLoader = async () => {
  try {
    const userData = await myPageLoader();
    if (!userData?.interviewScheduleChangeable) {
      return redirect('/');
    }
    return null;
  } catch (error) {
    console.log('면접 일정 수정 접근 권한 확인 실패:', error);
    return redirect('/');
  }
};
