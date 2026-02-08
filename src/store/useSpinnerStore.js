import { create } from 'zustand';

const useSpinnerStore = create((set) => ({
  // 버튼 스피너 상태 관리
  buttonSpinners: {}, // { buttonId: isLoading }

  // 특정 버튼의 로딩 상태 설정
  setButtonLoading: (buttonId, isLoading) =>
    set((state) => ({
      buttonSpinners: {
        ...state.buttonSpinners,
        [buttonId]: isLoading,
      },
    })),

  // 특정 버튼의 로딩 상태 가져오기
  getButtonLoading: (buttonId) => {
    const state = useSpinnerStore.getState();
    return state.buttonSpinners[buttonId] || false;
  },

  // 모든 버튼 스피너 초기화
  resetButtonSpinners: () =>
    set({
      buttonSpinners: {},
    }),
}));

export default useSpinnerStore;
