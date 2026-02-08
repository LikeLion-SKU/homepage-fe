import { create } from 'zustand';

import { getSemester } from '@/api/applicationForm';

const useSemesterStore = create((set) => ({
  semester: null, // 초깃값 null
  fetchSemester: async () => {
    set({ isLoading: true });
    try {
      const res = await getSemester();
      set({ semester: res.semester });
    } catch (error) {
      console.error('학기 정보 로드 실패', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSemesterStore;
