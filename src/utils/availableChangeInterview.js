import { getCurrentForm } from '@/api/applicationForm';

export const availbleChangeInterview = async () => {
  const nowDate = new Date().getTime();
  const resultDate = await getCurrentForm();
  const applicationResultAt = new Date(resultDate.applicationResultAt).getTime();
  const interviewScheduleConfirmedAt = new Date(resultDate.interviewScheduleConfirmedAt).getTime();

  return applicationResultAt <= nowDate && nowDate <= interviewScheduleConfirmedAt;
};
