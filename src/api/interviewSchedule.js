import { APIService } from '@/api/api';

export const getInterviewSchedule = async () => {
  try {
    const res = await APIService.private.get('/v1/interviews/schedules');
    return res.data;
  } catch (error) {
    console.log('면접 시간 조회 실패', error);
  }
};

export const getInterviewScheduleAdmin = async (parameter) => {
  try {
    const res = await APIService.private.get(
      `/v1/admin/interviews/schedules/${parameter.semester}`,
      {
        params: {
          track: parameter.track,
          dateFrom: parameter.dateFrom,
          dateTo: parameter.dateTo,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('관리자 면접 시간 조회 실패', error);
  }
};

export const deleteInterviewSchedule = async (scheduleId) => {
  try {
    const res = await APIService.private.delete(`/v1/admin/interviews/schedules/${scheduleId}`);

    return res.data;
  } catch (error) {
    console.log('면접 일정 삭제 실패:', error);
  }
};

export const postInterviewSchedule = async (parameter, dateData) => {
  try {
    const res = await APIService.private.post(
      `/v1/admin/interviews/schedules/${parameter.semester}`,
      {
        date: dateData.date,
        startTime: dateData.startTime,
        endTime: dateData.endTime,
      },
      { params: { track: parameter.track } }
    );

    return res.data;
  } catch (error) {
    console.log('면접 일정 추가 실패:', error);
  }
};
