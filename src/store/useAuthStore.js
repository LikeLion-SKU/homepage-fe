import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem('isLogin') === 'true', // 로컬 스토리지에 있을떄
  user: null,
  currentPassword: null, // 로그인 시 저장된 현재 비밀번호
  isTemporaryPassword: false, // 임시 비밀번호로 로그인했는지 여부
  setLogin: (userData, password, isTemporary = false) => {
    localStorage.setItem('isLogin', 'true');
    set({
      isLoggedIn: true,
      user: userData,
      currentPassword: password,
      isTemporaryPassword: isTemporary,
    });
  },
  setLogout: () => {
    localStorage.removeItem('isLogin');
    set({ isLoggedIn: false, user: null, currentPassword: null, isTemporaryPassword: false });
  },
  clearPassword: () => {
    set({ currentPassword: null, isTemporaryPassword: false });
  },
}));

export default useAuthStore;
