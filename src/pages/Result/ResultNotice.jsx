import { useLoaderData, useNavigate } from 'react-router';

//@ts-ignore
import Heart from '@/assets/icons/green_heart_icon.svg?react';
import PageTitle from '@/components/common/PageTitle';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';

export default function ResultNotice() {
  const navigate = useNavigate();
  const todayDate = new Date().getTime();
  const date = useLoaderData();
  const applicationResultAt = new Date(date.applicationResultAt);
  const finalResultAt = new Date(date.finalResultAt);
  const finalResultEnd = new Date(finalResultAt);
  finalResultEnd.setDate(finalResultAt.getDate() + 7);
  const finalResultDate = finalResultEnd.toISOString();

  const getResultDate = () => {
    if (applicationResultAt.getTime() <= todayDate && todayDate <= finalResultAt.getTime()) {
      return {
        date: `${date.applicationResultAt.slice(5, 10).replace('-', '/')} ${date.applicationResultAt.slice(11, 16)} 
      ~ ${date.applicationResultAt.slice(5, 10).replace('-', '/')} ${date.applicationResultAt.slice(11, 16)}`,
        test: '서류 결과 확인하기',
      };
    } else if (finalResultAt.getTime() <= todayDate && todayDate <= finalResultEnd.getTime()) {
      return {
        date: `${date.applicationResultAt.slice(5, 10).replace('-', '/')} ${date.applicationResultAt.slice(11, 16)}
       ~ ${finalResultDate.slice(5, 10).replace('-', '/')} ${finalResultDate.slice(11, 16)}`,
        test: '최종 결과 확인하기',
      };
    } else {
      return { date: `결과 조회 기간이 아닙니다.`, test: '지원 기간이 아닙니다' };
    }
  };
  return (
    <div>
      <GridSection>
        <div className="flex flex-col justify-center items-center gap-9 pt-50">
          <PageTitle title={getResultDate().test} color="Navy" />
          <Heart />
          <div>
            <p className="text-[1.1rem]">지원에 감사드립니다.</p>
            <p className="text-[1.1rem]">결과를 확인해주세요.</p>
          </div>
          <div className="w-78 pad:w-104 h-13 bg-[#C6E400] flex justify-center items-center font-semibold text-[0.9rem] pad:text-[1.1rem] drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]">
            결과 조회 기간: {getResultDate().date}
          </div>
          <CheckButton buttonName="확인하러가기" onClick={() => navigate('/result')} />
        </div>
      </GridSection>
    </div>
  );
}
