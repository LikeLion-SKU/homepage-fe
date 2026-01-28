import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import logo from '@/assets/images/skulogo.png';
import RedirectButton from '@/components/common/Button/RedirectButton';
import GridSection from '@/components/layout/background/GridSection';
import { usePreventDirectAccess } from '@/hooks/usePreventDirectAccess';

export default function WelcomeSection() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'GUEST';
  const navigate = useNavigate();
  const isAccessSuccess = usePreventDirectAccess();

  if (!isAccessSuccess) return <Navigate to="/" replace />;

  function toHomeClick(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    // 이 컴포넌트는 main안에 들어간다는 전제
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 격자 배경: 섹션 범위 안에서만 */}
      <GridSection>
        {/* 격자 위 콘텐츠 */}
        <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 text-center">
          {/* 타이틀 + 이미지 + 버튼을 레이아웃 기준으로 아래로 이동 */}
          <div className="flex flex-col items-center w-full max-w-[28rem] pt-[12vh] pb-[8vh] sm:pt-[14vh] sm:pb-0">
            <div className="mb-4 sm:mb-6">
              <p className="text-black text-2xl sm:text-[3.2rem] font-bold mb-2 sm:mb-3">
                {name}님 안녕하세요!
              </p>
              <p className="text-black text-sm sm:text-[1.2rem] font-medium px-2">
                서경대학교 멋쟁이사자처럼 홈페이지 가입을 환영합니다!
              </p>
            </div>

            <img
              src={logo}
              className="max-w-[70vw] w-[14rem] sm:w-[20rem] mb-8 sm:mb-10"
              alt="Logo"
            />

            {/* 버튼만 오른쪽 정렬 */}
            <div className="w-full flex justify-center">
              <div className="ml-22">
                <RedirectButton buttonName="홈으로" onClick={toHomeClick} />
              </div>
            </div>
          </div>
        </div>
      </GridSection>
    </div>
  );
}
