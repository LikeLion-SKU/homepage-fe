import { useNavigate } from 'react-router';

// @ts-ignore
import Logo from '@/assets/icons/Logo_icon.png';

export default function Header() {
  const navigate = useNavigate();

  const clickMenu = (menu) => {
    navigate(menu);
  };

  return (
    <header className="w-screen h-20 flex justify-between border-b">
      <div
        onClick={() => clickMenu('/')}
        className="w-102 flex items-center justify-center text-[1.1rem] font-bold border-r cursor-pointer"
      >
        <img src={Logo} className="w-23 h-23" />
        멋쟁이사자처럼 서경대학교
      </div>
      <div className="w-162 flex">
        <div className="w-100 flex justify-center items-center gap-15 border-x">
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
          onClick={() => clickMenu('/auth')}
          className="w-62 text-[1.1rem] font-semibold items-center justify-center cursor-pointer"
        >
          로그인/회원가입
        </button>
      </div>
    </header>
  );
}
