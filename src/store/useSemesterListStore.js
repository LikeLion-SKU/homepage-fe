import { create } from 'zustand';

import { getSemester } from '@/api/semesterApi';

const useSemesterListStore = create((set) => ({
  semesterData: [],
  fetchSemesters: async () => {
    const data = await getSemester();
    set({ semesterData: data });
  },
}));
export default useSemesterListStore;
