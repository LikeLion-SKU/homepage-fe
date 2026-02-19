import dayjs from 'dayjs';

import { getCurrentForm } from '@/api/applicationForm';

export const showResultButton = async () => {
  const resultDate = await getCurrentForm();

  if (!resultDate || !resultDate.applicationResultAt || !resultDate.finalResultAt) {
    console.warn('진행 중인 지원 일정 데이터가 없습니다.');
    return { show: false, isFinal: false };
  }

  const now = dayjs(); // 현재 시간

  // 1. 결과 발표일의 '날짜' 기준 00:00:00
  const startShow = dayjs(resultDate.applicationResultAt).startOf('day');

  // 2. 최종 발표일의 '날짜' 기준 + 7일 뒤의 23:59:59 (그날 전체 포함)
  const endShow = dayjs(resultDate.finalResultAt).add(7, 'day').endOf('day');

  const finalResultDisplayStart = dayjs(resultDate.finalResultAt).startOf('day');
  const finalResultEnd = finalResultDisplayStart.add(7, 'day').endOf('day');

  // 현재 시간이 시작점보다 같거나 늦고, 끝점보다 같거나 이르면 true
  return {
    show:
      (now.isAfter(startShow) || now.isSame(startShow)) &&
      (now.isBefore(endShow) || now.isSame(endShow)),
    isFinal:
      (now.isAfter(finalResultDisplayStart) || now.isSame(finalResultDisplayStart)) &&
      now.isBefore(finalResultEnd),
  };
};
