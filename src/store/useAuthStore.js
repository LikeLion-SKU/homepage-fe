import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: localStorage.getItem('isLogin') === 'true', // 로컬 스토리지에 있을떄
  user: null,
  setLogin: (userData) => {
    localStorage.setItem('isLogin', 'true');
    set({ isLoggedIn: true, user: userData });
  },
  setLogout: () => {
    localStorage.removeItem('isLogin');
    set({ isLoggedIn: false, user: null });
  },
}));

export default useAuthStore;
