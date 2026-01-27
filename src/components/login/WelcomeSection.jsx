import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import logo from '@/assets/images/skulogo.png';
import RedirectButton from '@/components/common/Button/RedirectButton';
import GridSection from '@/components/layout/background/GridSection';
import { usePreventDirectAccess } from '@/hooks/usePreventDirectAccess';

export default function WelcomeSection() {
  const [searchParams] = useSearchParams();
  // 파라미터에서 name 읽기
  const name = searchParams.get('name') || 'GUEST';
  const navigate = useNavigate();

  const isAccessSuccess = usePreventDirectAccess();

  // 디버깅: 모바일에서 확인용
  if (typeof window !== 'undefined') {
    console.log('WelcomeSection - isAccessSuccess:', isAccessSuccess);
    console.log('WelcomeSection - signupCompleted:', sessionStorage.getItem('signupCompleted'));
  }

  if (!isAccessSuccess) {
    return <Navigate to={'/'} replace />;
  }

  // 홈으로 버튼 클릭 //
  function toHomeClick(e) {
    e.preventDefault();

    navigate('/'); // 2번째 페이지 보여줌.
  }

  return (
    <GridSection>
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-col items-center w-full px-4 absolute top-[8vh] sm:top-[15vh] left-1/2 -translate-x-1/2 z-20">
          <p className="text-[#000000] text-2xl sm:text-[3.2rem] font-bold mb-2 sm:mb-4">
            {name}님 안녕하세요!
          </p>
          <p className="text-[#000000] text-sm sm:text-[1.2rem] font-medium px-2">
            서경대학교 멋쟁이사자처럼 홈페이지 가입을 환영합니다!
          </p>
        </div>
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <img src={logo} className="max-w-[70vw] w-[16rem] sm:w-[22.4rem]" alt="Logo" />
        </div>
        <div className="absolute bottom-[10vh] sm:bottom-[5vh] left-1/2 -translate-x-1/2 sm:ml-[8vh] z-20">
          <RedirectButton buttonName="홈으로" onClick={toHomeClick} />
        </div>
      </div>
    </GridSection>
  );
}
