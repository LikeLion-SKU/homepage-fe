import { APIService } from '@/api/api';

export const getInterviewSchedule = async () => {
  try {
    const res = await APIService.private.get('/v1/interviews/schedules');
    return res.data;
  } catch (error) {
    console.log('면접 시간 조회 실패', error);
  }
};
