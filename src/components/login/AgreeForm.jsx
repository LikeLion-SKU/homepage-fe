import { useState } from 'react';

export default function AgreeForm({
  onAgreeChange,
  required = true,
  title = '(필수) 개인정보 수집 및 이용 동의서',
  collectionPurpose = '재학생(휴학생 포함) 여부 확인, 입부 지원 처리, 지원 내역 및 합격 여부 확인, 지원자 의사 확인 및 원활한 의사소통',
  requiredItems = '이름, 연락처, 이메일 주소, 학과, 학번',
  retentionPeriod = '지원자: 서류 지원 결과 통지일로부터 1개월 동안 보관 후 파기\n부원: 활동 기간 동안 보관하며, 활동 종료 후에도 원활한 운영 및 기록 보관 목적으로 보유할 수 있으며, 본인의 요청이 있는 경우 지체 없이 파기',
}) {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsAgreed(checked);
    if (onAgreeChange) {
      onAgreeChange(checked);
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              required={required}
              className="w-5 h-5 max-[380px]:w-4 max-[380px]:h-4 border border-[#1C1B1A] cursor-pointer focus:outline-none focus:border-[#1A1A1A] focus:ring-0 appearance-none"
            />
            {isAgreed && (
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ transform: 'translateY(-5px)' }}
              >
                <span className="text-[#1C1B1A] text-xl max-[380px]:text-lg font-bold">v</span>
              </div>
            )}
          </div>
          <p
            className="text-[#1C1B1A] text-lg max-[380px]:text-base font-['Pretendard'] font-medium"
            style={{ transform: 'translateY(-3px)' }}
          >
            {title}
          </p>
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="flex gap-3 items-center">
              <div className="bg-[#F5F5F7] flex h-[44px] max-[380px]:h-[40px] items-center justify-center px-8 max-[380px]:px-4 w-[120px] max-[380px]:w-[92px]">
                <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px]">
                  수집 목적
                </p>
              </div>
              <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px] flex-1">
                {collectionPurpose}
              </p>
            </div>
            <div className="h-px bg-[#E0E0E0] w-full"></div>
          </div>
          <div className="flex flex-col" style={{ transform: 'translateY(-8px)' }}>
            <div className="flex gap-3 items-center">
              <div className="bg-[#F5F5F7] flex h-[44px] max-[380px]:h-[40px] items-center justify-center px-8 max-[380px]:px-4 w-[120px] max-[380px]:w-[92px]">
                <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px]">
                  필수 항목
                </p>
              </div>
              <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px] flex-1">
                {requiredItems}
              </p>
            </div>
            <div className="h-px bg-[#E0E0E0] w-full"></div>
          </div>
          <div
            className="flex gap-3 h-[72px] max-[380px]:h-[64px] items-center"
            style={{ transform: 'translateY(-16px)' }}
          >
            <div className="bg-[#F5F5F7] flex h-full items-center justify-center px-8 max-[380px]:px-4 w-[120px] max-[380px]:w-[92px]">
              <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px]">
                보유 기간
              </p>
            </div>
            <div className="flex-1">
              <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px] leading-[1.25] whitespace-pre-line">
                {retentionPeriod}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-0.3 mt-0" style={{ marginTop: '-16px' }}>
            <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px]">
              귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.
            </p>
            <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px]">
              다만, 동의를 거부할 경우 지원 및 입부 절차가 진행되지 않을 수 있음을 알려드립니다.
            </p>
            <p className="font-['Pretendard'] font-medium text-[#1C1B1A] text-[10px] max-[380px]:text-[9px]">
              위의 내용을 충분히 숙지하였으며, 이에 동의합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
