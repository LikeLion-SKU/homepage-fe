import { formatDeadline } from '@/utils/Date';

export default function ApplyTitleSection() {
  const deadline = '2026-03-30T23:59:59';
  // 기수
  const generation = '14';
  return (
    /* 윗 부분 상단 */
    <div className="inline-flex justify-between items-start">
      <div className="flex flex-col gap-6">
        <div className="self-stretch justify-center text-4xl font-extrabold font-['Pretendard']">
          지원서 작성하기
        </div>
        <div className="self-stretch justify-center text-lg font-medium font-['Pretendard']">
          멋쟁이사자처럼 {generation}기 지원서
        </div>
      </div>
      <div className="min-w-44.25 flex flex-col items-end gap-2">
        <div className="self-stretch text-right justify-center text-stone-500 text-lg font-medium font-['Pretendard']">
          마감일
        </div>
        <div className="self-stretch text-right text-black text-lg font-semibold font-['Pretendard']">
          {formatDeadline(deadline)}
        </div>
      </div>
    </div>
  );
}
