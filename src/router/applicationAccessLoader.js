import { redirect } from 'react-router';

import { getCurrentForm } from '@/api/applicationForm';
import { getApplicationStatus } from '@/api/userApi';

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
