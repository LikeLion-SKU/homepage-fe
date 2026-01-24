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

  if (!isAccessSuccess) {
    return <Navigate to={'/'} replace />;
  }

  // 홈으로 버튼 클릭 //
  function toHomeClick(e) {
    e.preventDefault();

    navigate('/'); // 2번째 페이지 보여줌.
  }

  return (
    <GridSection rows={15}>
      <div className="relative text-center h-full mt-[5vh] mb-[3vh] pb-[5vh] flex flex-col items-center w-full">
        <div className="absolute top-[15vh] left-1/2 -translate-x-1/2 flex flex-col items-center w-full">
          <p className="text-[#000000] text-[3.2rem] font-bold mb-4 mt-[-1.6vh]">
            {name}님 안녕하세요!
          </p>
          <p className="text-[#000000] text-[1.2rem] font-medium mt-[-1.3vh]">
            서경대학교 멋쟁이사자처럼 홈페이지 가입을 환영합니다!
          </p>
        </div>
        <div className="mb-4 mt-[27vh]">
          <img src={logo} className="max-w-[70vw] w-[22.4rem]" alt="Logo" />
        </div>
        <div className="ml-[8vh]">
          <RedirectButton buttonName="홈으로" onClick={toHomeClick} />
        </div>
      </div>
    </GridSection>
  );
}
