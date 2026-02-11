import { create } from 'zustand';

const useAdminInterviewStore = create((set) => ({
  // 전체 면접 가능 시간대 (Mock Data)
  interviews: { semester: 0, tracks: [{ track: '', dates: [] }] },

  setInterviewSchedule: (schedules) => set({ interviews: schedules }),

  setTrackInterviewSchedule: (targetTrack, schedules) =>
    set((state) => ({
      interviews: {
        ...state.interviews, // semester 등 다른 값 유지
        tracks: state.interviews.tracks.map(
          (item) =>
            item.track === targetTrack
              ? { ...item, dates: schedules } // 트랙이 일치하면 dates 교체
              : item // 일치하지 않으면 기존 데이터 유지
        ),
      },
    })),
}));

export default useAdminInterviewStore;
