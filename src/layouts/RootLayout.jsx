//import { useState } from 'react';
//import { useLocation } from 'react-router';
import { Outlet, ScrollRestoration } from 'react-router';

import CustomCursor from '@/components/common/CustomCursor';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function RootLayout() {
  //const { pathname } = useLocation();
  //const [isModalOpen, setIsModalOpen] = useState(false);

  //const hasToken = !!localStorage.getItem('accessToken'); //true,false를 두번 바꿈으로써 boolean값만 남김

  //const hideNav = !hasToken && pathname === '/'; //하단바 판단 변수

  return (
    <main className="flex flex-col w-full min-h-screen">
      <CustomCursor />
      <Header />
      <Outlet /* context={{ onModalChange: setIsModalOpen }} */ />
      <ScrollRestoration />
      <Footer />
    </main>
  ); //헤더 만들면 추가, 모달이 켜지거나 hideNav가 참이면 하단바 제거
}
