import { create } from 'zustand';

const useInterviewStore = create((set) => ({
  // 전체 면접 가능 시간대 (Mock Data)
  interviews: { semester: 0, documentPassed: true, track: '', dates: [] },

  // 내가 예약한 스케줄
  myInterviews: {
    semester: 12,
    booking: {
      bookingId: 0,
      track: '',
      scheduleId: 0,
      date: '',
      startTime: '',
      endTime: '',
    },
  },

  setInterviewSchdule: (schdules) =>
    set(() => {
      return { interviews: schdules };
    }),

  //나의 면접 액션
  setMyInterview: (interview) =>
    set(() => {
      return { myInterviews: interview };
    }),
}));

export default useInterviewStore;
