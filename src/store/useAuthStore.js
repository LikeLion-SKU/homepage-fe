import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // 상태
  isLoggedIn: !!localStorage.getItem('accessToken'), // 토큰
  userRole: localStorage.getItem('userRole') || null, // 사용자 권한

  // 로그인, 로그아웃 시 상태 변경
  login: (token, role) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', role);
    set({ isLoggedIn: true, userRole: role });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    set({ isLoggedIn: false, userRole: null });
  },
}));

export default useAuthStore;
