import { useEffect } from 'react';

import useSemesterStore from '@/store/useSemesterStore';
import { formatDeadline } from '@/utils/Date';

export default function ApplyTitleSection() {
  const { semesterData, fetchSemesterData } = useSemesterStore();

  useEffect(() => {
    if (!semesterData) fetchSemesterData();
  }, [fetchSemesterData, semesterData]);
  return (
    /* 윗 부분 상단 */
    <div className="flex flex-col pad:inline-flex pad:flex-row justify-between items-start gap-y-5">
      <div className="flex flex-col gap-6">
        <div className="self-stretch justify-center text-4xl font-extrabold font-['Pretendard']">
          지원서 작성하기
        </div>
        <div className="self-stretch justify-center text-lg font-medium font-['Pretendard']">
          멋쟁이사자처럼 {semesterData?.semester}기 지원서
        </div>
      </div>
      <div className="min-w-44.25 self-end flex flex-col items-start gap-2">
        <div className="self-stretch text-right justify-center text-stone-500 text-lg font-medium font-['Pretendard']">
          마감일
        </div>
        <div className="self-stretch text-right text-black text-lg font-semibold font-['Pretendard']">
          {formatDeadline(semesterData?.closeAt)}
        </div>
      </div>
    </div>
  );
}
