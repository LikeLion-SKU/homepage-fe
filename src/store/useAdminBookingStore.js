import { create } from 'zustand';

const useAdminBookingStore = create((set) => ({
  // 전체 면접 가능 시간대 (Mock Data)
  bookingInterviews: {
    semester: 0,
    tracks: [
      {
        track: '',
        dates: [
          {
            date: '',
            times: [
              {
                scheduleId: 0,
                startTime: '',
                endTime: '',
                booked: false,
                bookingInfo: {
                  bookingId: 0,
                  name: '',
                  department: '',
                  studentNumber: '',
                  phone: '',
                  applicationRecordId: 0,
                },
              },
            ],
          },
        ],
      },
    ],
  },

  setBookingSchedule: (schedules) => set({ bookingInterviews: schedules }),

  setTrackBookingSchedule: (targetTrack, targetDate, newTimes) =>
    set((state) => ({
      bookingInterviews: {
        ...state.bookingInterviews,
        tracks: state.bookingInterviews.tracks.map(
          (trackItem) =>
            trackItem.track === targetTrack
              ? {
                  ...trackItem,
                  dates: trackItem.dates.map(
                    (dateItem) =>
                      dateItem.date === targetDate
                        ? { ...dateItem, times: newTimes } // 날짜가 일치하면 times만 교체
                        : dateItem // 아니면 유지
                  ),
                }
              : trackItem // 트랙 불일치 시 유지
        ),
      },
    })),
}));

export default useAdminBookingStore;
