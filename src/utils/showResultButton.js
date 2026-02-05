import { getCurrentForm } from '@/api/applicationForm';

export const showResultButton = async () => {
  const nowDate = new Date().getTime();
  const resultDate = await getCurrentForm();
  const applicationResultAt = new Date(resultDate.applicationResultAt).getTime();
  const interviewScheduleConfirmedAt = new Date(resultDate.interviewScheduleConfirmedAt).getTime();
  const finalResultAt = new Date(resultDate.finalResultAt);
  const finalResultEnd = new Date(finalResultAt);
  finalResultEnd.setDate(finalResultAt.getDate() + 7);

  return (
    (applicationResultAt <= nowDate && nowDate <= interviewScheduleConfirmedAt) ||
    (finalResultAt.getTime() <= nowDate && nowDate <= finalResultEnd.getTime())
  );
};
