import { create } from 'zustand';

import { getSemester } from '@/api/applicationForm';

const useSemesterStore = create((set) => ({
  semesterData: null,
  isLoading: false,

  fetchSemesterData: async () => {
    set({ isLoading: true }); // 시작할때 loading true
    try {
      const response = await getSemester();
      // 데이터 구조에 따라 response 혹은 response.data 선택
      set({ semesterData: response.data || response });
    } catch (error) {
      console.error('기수 및 일정 정보 로드 실패', error);
    } finally {
      set({ isLoading: false }); // 끝날때 loading false
    }
  },
}));

export default useSemesterStore;
