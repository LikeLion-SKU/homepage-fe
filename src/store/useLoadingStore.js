import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  isLoading: false, // create: 전역 상태 저장소를 만드는 함수

  // 로딩 상태 변경하는 함수
  setIsLoading: (status) => set({ isLoading: status }), // 초기값은 로딩 상태X
}));

export default useLoadingStore;
