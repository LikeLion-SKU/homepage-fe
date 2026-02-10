import { APIService } from '@/api/api';

export const getInterviewSchedule = async () => {
  try {
    const res = await APIService.private.get('/v1/interviews/schedules');
    return res.data;
  } catch (error) {
    console.log('면접 시간 조회 실패', error);
  }
};

export const getInterviewScheduleAdmin = async (semester) => {
  try {
    const res = await APIService.private.get(`/v1/admin/interviews/schedules/${semester}`);
    return res.data;
  } catch (error) {
    console.log('관리자 면접 시간 조회 실패', error);
  }
};
