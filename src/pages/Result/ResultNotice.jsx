import { useNavigate } from 'react-router';

//@ts-ignore
import Heart from '@/assets/icons/green_heart_icon.svg?react';
import PageTitle from '@/components/common/PageTitle';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';

export default function ResultNotice() {
  const navigate = useNavigate();
  return (
    <div>
      <GridSection>
        <div className="flex flex-col justify-center items-center gap-9 pt-50">
          <PageTitle title="지원 결과 확인하기" color="Navy" />
          <Heart />
          <div>
            <p className="text-[1.1rem]">지원에 감사드립니다.</p>
            <p className="text-[1.1rem]">결과를 확인해주세요.</p>
          </div>
          <div className="w-78 pad:w-104 h-13 bg-[#C6E400] flex justify-center items-center font-semibold text-[0.9rem] pad:text-[1.1rem] drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]">
            결과 조회 기간: 2026.01.01 ~ 2026.03.06
          </div>
          <CheckButton buttonName="확인하러가기" onClick={() => navigate('/result')} />
        </div>
      </GridSection>
    </div>
  );
}
