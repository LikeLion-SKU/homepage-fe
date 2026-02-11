import { APIService } from '@/api/api';

export const interviewBooking = async (scheduleId) => {
  try {
    const res = await APIService.private.post('/v1/interviews/bookings', {
      scheduleId: scheduleId,
    });
    return res;
  } catch (error) {
    console.log('면접 예약 실패:', error);
  }
};

export const getInterviewBooking = async () => {
  try {
    const res = await APIService.private.get('/v1/interviews/bookings');

    return res.data;
  } catch (error) {
    console.log('예약된 면접 조회 실패:', error);
  }
};

export const putInterviewChange = async (scheduleId) => {
  try {
    const res = await APIService.private.put(`/v1/interviews/bookings/${scheduleId}`);

    return res;
  } catch (error) {
    console.log('면접 변경 실패:', error);
  }
};

export const getInterviewBookingAdmin = async (parameter) => {
  try {
    const res = await APIService.private.get('/v1/admin/interviews/bookings', {
      params: {
        semester: parameter.semester,
        date: parameter.date,
        track: parameter.track,
        search: parameter.search,
      },
    });

    return res.data;
  } catch (error) {
    console.log('예약된 면접 일정 조회 실패:', error);
  }
};
