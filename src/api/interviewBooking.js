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
