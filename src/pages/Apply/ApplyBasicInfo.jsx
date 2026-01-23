import ApplyStep from '@/components/common/apply/ApplyStep';

export default function ApplyBasicInfo() {
  const deadline = '2026.03.30 오후 5:00';
  return (
    <div>
      <div>
        {/* 윗 부분 상단 */}
        <div>
          <div>지원서 작성하기</div>
          <div>멋쟁이사자처럼 14기 지원서</div>
        </div>
        <div>
          <div>마감일</div>
          <div>{deadline}</div>
        </div>
        {/* 지원서 작성 단계 부분 */}
        <ApplyStep
          step="STEP 1"
          stepName="기본 인적사항"
          lineStyle="self-stretch h-1 bg-button-green mb-5"
          stepStyle="self-stretch text-center text-button-green text-1xl font-medium font-['Pretendard'] mb-1.5"
          stepNameStyle="self-stretch text-center text-button-green text-2xl font-bold font-['Pretendard']"
        ></ApplyStep>
        <ApplyStep
          step="STEP 2"
          stepName="공통 질문"
          lineStyle="self-stretch h-1 bg-navy-blue mb-5"
          stepStyle="self-stretch text-center text-navy-blue text-1xl font-medium font-['Pretendard'] mb-1.5"
          stepNameStyle="self-stretch text-center text-navy-blue text-2xl font-bold font-['Pretendard']"
        ></ApplyStep>
        <ApplyStep
          step="STEP 3"
          stepName="트랙별 질문"
          lineStyle="self-stretch h-1 bg-navy-blue mb-5"
          stepStyle="self-stretch text-center text-navy-blue text-1xl font-medium font-['Pretendard'] mb-1.5"
          stepNameStyle="self-stretch text-center text-navy-blue text-2xl font-bold font-['Pretendard']"
        ></ApplyStep>
      </div>
    </div>
  );
}
