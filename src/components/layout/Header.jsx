import { useNavigate } from 'react-router';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import Logo from '@/assets/icons/Logo_icon.png';
//@ts-ignore
import Hamberger from '@/assets/icons/hambergerBar_icon.svg?react';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useIsPhone } from '@/hooks/useIsPhone';

export default function Header({ handleSideBar }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const isDesktop = useIsDesktop();
  const isPhone = useIsPhone();

  const clickMenu = (menu) => {
    navigate(menu);
  };
  const date = new Date().getTime();
  const resultDate = [new Date(2026, 0, 22, 0, 0).getTime(), new Date(2026, 1, 25, 0, 0).getTime()];

  return (
    <header className="w-full h-13 pad:h-17 web:h-19  flex justify-between border-b">
      <div
        onClick={() => clickMenu('/')}
        className="flex items-center justify-center text-[1.1rem] font-bold web:border-r cursor-pointer"
      >
        <img src={Logo} className="w-11 h-11 pad:w-18 pad:h-18 web:w-23 web:h-23" />
        {isDesktop && <p className="mr-15">멋쟁이사자처럼 서경대학교</p>}
      </div>

      <div className="flex">
        {isDesktop && (
          <div className="flex items-center web:gap-10 border-l px-10 text-[1.1rem] ">
            {!!token && (
              <button
                onClick={() => clickMenu('/admin')}
                className="text-[1.1rem] font-semibold cursor-pointer"
              >
                관리자
              </button>
            )}
            {date > resultDate[0] && date < resultDate[1] && (
              <button onClick={() => clickMenu('/result/notice')}>
                <motion.span
                  className="font-bold bg-clip-text text-transparent block"
                  style={{
                    //bg-clip-text부터 순서대로 배경 글자대로 자르기,글자 색 비우기,span상자로 만들기
                    backgroundImage:
                      'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['100% 0%', '-100% 0%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  지원결과
                </motion.span>
              </button>
            )}
            <button onClick={() => clickMenu('/recruit')} className="font-semibold cursor-pointer">
              지원하기
            </button>
            <button onClick={() => clickMenu('/project')} className="font-semibold cursor-pointer">
              프로젝트
            </button>
            <button onClick={() => clickMenu('/member')} className="font-semibold cursor-pointer">
              구성원
            </button>
          </div>
        )}
        {!isPhone && (
          <button
            onClick={() => clickMenu('/login')}
            className="px-10 font-semibold items-center justify-center 
          border-x web:border-l web:border-r-0"
          >
            {token ? '마이페이지' : '로그인/회원가입'}
          </button>
        )}
        {!isDesktop && (
          <button
            onClick={() => handleSideBar()}
            className="flex w-14 h-13 border-l pad:border-none pad:w-22 pad:h-17 justify-center items-center"
          >
            <Hamberger />
          </button>
        )}
      </div>
    </header>
  );
}
