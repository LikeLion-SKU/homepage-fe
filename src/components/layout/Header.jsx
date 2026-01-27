import { useNavigate } from 'react-router';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import Logo from '@/assets/icons/Logo_icon.png';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const clickMenu = (menu) => {
    navigate(menu);
  };
  const date = new Date().getTime();
  const resultDate = [new Date(2026, 0, 22, 0, 0).getTime(), new Date(2026, 1, 25, 0, 0).getTime()];

  return (
    <header className="w-full h-20 flex justify-between border-b">
      <div
        onClick={() => clickMenu('/')}
        className="w-102 flex items-center justify-center text-[1.1rem] font-bold border-r cursor-pointer"
      >
        <img src={Logo} className="w-23 h-23" />
        멋쟁이사자처럼 서경대학교
      </div>
      <div className="w-min-162 flex ">
        <div className="w-min-100 flex justify-center items-center gap-15 border-x px-10">
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
                className="text-[1.1rem] font-bold bg-clip-text text-transparent block"
                style={{
                  //bg-clip-text부터 순서대로 배경 글자대로 자르기,글자 색 비우기,span상자로 만들기
                  backgroundImage: 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
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
          <button
            onClick={() => clickMenu('/join')}
            className="text-[1.1rem] font-semibold cursor-pointer"
          >
            지원하기
          </button>
          <button
            onClick={() => clickMenu('/project')}
            className="text-[1.1rem] font-semibold cursor-pointer"
          >
            프로젝트
          </button>
          <button
            onClick={() => clickMenu('/member')}
            className="text-[1.1rem] font-semibold cursor-pointer"
          >
            구성원
          </button>
        </div>
        <button
          onClick={() => clickMenu('/login')}
          className="w-62 text-[1.1rem] font-semibold items-center justify-center cursor-pointer"
        >
          로그인/회원가입
        </button>
      </div>
    </header>
  );
}
