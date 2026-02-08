import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem('isLogin') === 'true', // 로컬 스토리지에 있을떄
  user: null,
  currentPassword: null, // 로그인 시 저장된 현재 비밀번호
  setLogin: (userData, password) => {
    localStorage.setItem('isLogin', 'true');
    set({ isLoggedIn: true, user: userData, currentPassword: password });
  },
  setLogout: () => {
    localStorage.removeItem('isLogin');
    set({ isLoggedIn: false, user: null, currentPassword: null });
  },
  clearPassword: () => {
    set({ currentPassword: null });
  },
}));

export default useAuthStore;
