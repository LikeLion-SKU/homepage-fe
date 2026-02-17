import { useLoaderData, useNavigate, useOutletContext } from 'react-router';

import dayjs from 'dayjs';

//@ts-ignore
import Heart from '@/assets/icons/green_heart_icon.svg?react';
//@ts-ignore
import NotCheck from '@/assets/icons/uncheck_button.svg?react';
import PageTitle from '@/components/common/PageTitle';
import GridSection from '@/components/layout/background/GridSection';
import CheckButton from '@/components/result/CheckButton';

export default function ResultNotice() {
  //@ts-ignore
  const { showToast } = useOutletContext();
  const navigate = useNavigate();
  const date = useLoaderData();
  const now = dayjs(); // 현재 시간

  // 1. 화면 표시용 (00시 기준)
  const appResultDisplayStart = dayjs(date.applicationResultAt).startOf('day');
  const finalResultDisplayStart = dayjs(date.finalResultAt).startOf('day');
  const finalResultEnd = finalResultDisplayStart.add(7, 'day').endOf('day');

  // 2. 실제 버튼 활성화용 (데이터에 포함된 진짜 시간 기준)
  const realAppResultTime = dayjs(date.applicationResultAt);
  const realFinalResultTime = dayjs(date.finalResultAt);

  // 현재 버튼이 작동할 수 있는 '진짜 시간'인지 체크
  const isClickable = () => {
    // 서류 결과 기간이면서 진짜 시간이 지났거나, 최종 결과 기간이면서 진짜 시간이 지났을 때
    const isAppTime =
      (now.isAfter(realAppResultTime) || now.isSame(realAppResultTime)) &&
      now.isBefore(finalResultDisplayStart);
    const isFinalTime =
      (now.isAfter(realFinalResultTime) || now.isSame(realFinalResultTime)) &&
      now.isBefore(finalResultEnd);

    return isAppTime || isFinalTime;
  };

  const getResultDate = () => {
    // 날짜 포맷팅용 헬퍼 함수 (MM/DD HH:mm)
    const formatDate = (d) => dayjs(d).format('MM/DD HH:mm');

    // A. 서류 결과 확인 기간 (서류 발표 00시 ~ 최종 발표 00시 전)
    if (
      (now.isAfter(appResultDisplayStart) || now.isSame(appResultDisplayStart)) &&
      now.isBefore(finalResultDisplayStart)
    ) {
      return {
        date: `${formatDate(date.applicationResultAt)} ~ ${formatDate(finalResultDisplayStart)}`,
        test: '서류 결과 확인하기',
      };
    }

    // B. 최종 결과 확인 기간 (최종 발표 00시 ~ 7일 후)
    else if (
      (now.isAfter(finalResultDisplayStart) || now.isSame(finalResultDisplayStart)) &&
      now.isBefore(finalResultEnd)
    ) {
      const finalEndStr = finalResultEnd.toISOString();
      return {
        date: `${formatDate(realFinalResultTime)} ~ ${formatDate(finalEndStr)}`,
        test: '최종 결과 확인하기',
      };
    }

    // C. 그 외 기간
    else {
      return { date: `결과 조회 기간이 아닙니다.`, test: '지원 기간이 아닙니다' };
    }
  };

  const result = getResultDate();
  const canClick = isClickable(); // 클릭 가능 여부

  const handleCheckClick = () => {
    if (!canClick) {
      showToast('아직 결과 확인 기간이 아닙니다.');
      return;
    }
    navigate('/result', { state: { fromA: true } });
  };

  return (
    <div>
      <GridSection>
        <div className="flex flex-col justify-center items-center gap-9 pt-50">
          <PageTitle title={result.test} color="Navy" />
          <Heart />
          <div>
            <p className="text-[1.1rem]">지원에 감사드립니다.</p>
            <p className="text-[1.1rem]">결과를 확인해주세요.</p>
          </div>
          <div className="w-78 pad:w-104 h-13 bg-[#C6E400] flex justify-center items-center font-semibold text-[0.9rem] pad:text-[1.1rem] drop-shadow-[3px_4px_0px_rgba(212,212,212,1)]">
            조회 가능 기간: {result.date}
          </div>
          {canClick ? (
            <CheckButton buttonName="확인하러가기" onClick={() => handleCheckClick()} />
          ) : (
            <NotCheck onClick={() => handleCheckClick()} />
          )}
        </div>
      </GridSection>
    </div>
  );
}
