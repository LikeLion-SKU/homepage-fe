import { getCurrentForm } from '@/api/applicationForm';

export const showResultButton = async () => {
  const nowDate = new Date().getTime();
  const resultDate = await getCurrentForm();
  if (!resultDate || !resultDate.applicationResultAt || !resultDate.finalResultAt) {
    console.warn('진행 중인 지원 일정 데이터가 없습니다.');
    return false;
  }
  const applicationResultAt = new Date(resultDate?.applicationResultAt).getTime();
  const finalResultAt = new Date(resultDate?.finalResultAt);
  const finalResultEnd = new Date(finalResultAt);
  finalResultEnd.setDate(finalResultAt.getDate() + 7);

  return applicationResultAt <= nowDate && nowDate <= finalResultEnd.getTime();
};
