import ApplyStep from '@/components/common/apply/ApplyStep';
import ApplyTitleSection from '@/components/common/apply/ApplyTitleSection';
import Input from '@/components/common/apply/Input';

export default function ApplyBasicInfo() {
  const inputStyle = `text-text-gray outline h-12 px-4 py-4 placeholder:font-medium placeholder:font-['Pretendard']`;
  return (
    <div>
      <div className="w-full pt-18 px-45.5">
        <div className="flex flex-col gap-20">
          {/* 지원서 작성 페이지의 기본 정보 섹션 */}
          <ApplyTitleSection></ApplyTitleSection>
          {/* 지원서 작성 단계 부분 */}
          <div className="self-stretch inline-flex items-center gap-7">
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
        {/* 인적사항 기재 부분 */}
        <div>
          <div className="flex flex-col gap-10">
            <div className="self-stretch h-8 opacity-70 text-2xl font-bold font-['Pretendard']">
              인적사항
            </div>
            <div className="self-stretch h-103 px-36 pt-11 border bg-button-gray">
              <div className="flex justify-between gap-48">
                {/* 왼쪽 이름, 학과, 학번 */}
                <div className="flex-1 flex flex-col gap-6">
                  <Input
                    label="이름"
                    placeholder="김멋사"
                    type="text"
                    className={inputStyle}
                  ></Input>
                  <Input
                    label="학과"
                    placeholder="소프트웨어학과"
                    type="text"
                    className={inputStyle}
                  ></Input>
                  <Input
                    label="학번"
                    placeholder="2020202020"
                    type="text"
                    className={inputStyle}
                  ></Input>
                </div>
                {/* 오른쪽 전화번호, 이메일, 지원파트 */}
                <div className="flex-1 flex flex-col gap-6">
                  <Input
                    label="전화번호"
                    placeholder="김멋사"
                    type="text"
                    className={inputStyle}
                  ></Input>
                  <div className="self-stretch flex flex-col">
                    <label className="font-['Pretendard']">이메일</label>
                    <div className="flex items-center justify-between">
                      <div className="w-2/3">
                        <Input
                          label=""
                          placeholder="김멋사"
                          type="text"
                          className={inputStyle}
                        ></Input>
                      </div>
                      <div className="opacity-70 text-text-gray font-medium font-['Pretendard']">
                        @skuniv.ac.kr
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 하단 버튼 부분 */}
          <div></div>
        </div>
      </div>
    </div>
  );
}
