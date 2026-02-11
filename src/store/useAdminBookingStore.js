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

  setPlusBookingSchedule: (targetTrack, targetDate, newTimes) =>
    set((state) => ({
      bookingInterviews: {
        ...state.bookingInterviews,
        tracks: state.bookingInterviews.tracks.map((trackItem) => {
          // 1. 해당 트랙을 찾음
          if (trackItem.track !== targetTrack) return trackItem;

          // 2. 해당 날짜가 이미 dates 배열에 있는지 확인
          const dateExists = trackItem.dates.some((d) => d.date === targetDate);

          let newDates;
          if (dateExists) {
            // 3-1. 날짜가 존재하면 해당 날짜의 times만 교체
            newDates = trackItem.dates.map((d) =>
              d.date === targetDate ? { ...d, times: newTimes } : d
            );
          } else {
            // 3-2. 날짜가 존재하지 않으면 새로운 객체 추가
            newDates = [...trackItem.dates, { date: targetDate, times: newTimes }];

            // (선택사항) 날짜순으로 정렬하고 싶다면 추가
            newDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          }

          return { ...trackItem, dates: newDates };
        }),
      },
    })),

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
