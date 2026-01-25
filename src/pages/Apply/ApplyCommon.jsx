import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import ApplyStep from '@/components/common/apply/ApplyStep';
import ApplyTitleSection from '@/components/common/apply/ApplyTitleSection';
import Question from '@/components/common/apply/Question';

export default function ApplyCommon() {
  /** @type {any} */
  const { formData, handleAnswerChange } = useOutletContext();
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate('/apply/info'); // URL 이동
  };

  const QUESTION_LIST = [
    {
      id: 1,
      question:
        '다양한 IT 동아리 중에서 멋쟁이사자처럼 대학 14기를 선택하고 지원하시게 된 이유를 작성해주세요. (자기소개 / 장단점 / 지원 동기) (500자 이내)',
      type: 'common', // 공통 질문인지 트랙별 질문인지 구분
    },
    {
      id: 2,
      question:
        '멋쟁이사자처럼을 통해 이루고 싶은 최종 목표와 멋쟁이사자처럼을 1년간 진행 후 자신이 어떻게 발전할 것 같은지 작성해주세요 (500자 이내)',
      type: 'common',
    },
    {
      id: 3,
      question:
        '협업 경험이 있다면 힘들었던 점과 극복 과정을 적어주세요. 만약 협업 경험이 없을 경우, 팀원 간에 의견 마찰이 있을 때 어떻게 할 것인지 적어주세요. (500자 이내)',
      type: 'common',
    },
    {
      id: 4,
      question:
        '멋쟁이사자처럼은 주 1회 매주 월요일 18시 30분 교육 세션 필참 및 개인적으로 주 6시간 이상의 시간 투자를 권장합니다. 활동 기간 동안 매주 얼마만큼 시간을 할애할 수 있는지 작성해주세요. (500자 이내)',
      type: 'common',
    },
  ];

  const questionStyle = `self-stretch px-8 py-7 bg-white border justify-center items-center min-h-62 resize-none overflow-y-auto`;

  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-45.5 gap-23">
        <div className="flex flex-col gap-31">
          <div className="flex flex-col gap-20">
            {/* 지원서 작성 페이지의 기본 정보 섹션 */}
            <ApplyTitleSection></ApplyTitleSection>
            {/* 지원서 작성 단계 부분 */}
            <div className="self-stretch inline-flex items-center gap-7">
              <ApplyStep
                step="STEP 1"
                stepName="기본 인적사항"
                lineStyle="self-stretch h-1 bg-navy-blue mb-5"
                stepStyle="self-stretch text-center text-navy-blue text-1xl font-medium font-['Pretendard'] mb-1.5"
                stepNameStyle="self-stretch text-center text-navy-blue text-2xl font-bold font-['Pretendard']"
              ></ApplyStep>
              <ApplyStep
                step="STEP 2"
                stepName="공통 질문"
                lineStyle="self-stretch h-1 bg-button-green mb-5"
                stepStyle="self-stretch text-center text-button-green text-1xl font-medium font-['Pretendard'] mb-1.5"
                stepNameStyle="self-stretch text-center text-button-green text-2xl font-bold font-['Pretendard']"
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
          {/* 공통질문 부분 */}
          <div className="flex flex-col gap-10">
            <div className="self-stretch h-8 text-2xl font-bold font-['Pretendard']">공통 질문</div>
            {/* 공통질문 상자 */}
            <div className="flex flex-col px-20 py-18 border bg-button-gray gap-15">
              {/* 공통질문 내용 */}
              {QUESTION_LIST.map((item) => (
                <Question
                  key={item.id}
                  question={`${item.id}. ${item.question}`}
                  className={questionStyle}
                  // 2. 입력된 값: 해당 질문 ID에 맞는 답변 전달
                  value={formData?.answers?.[item.id] || ''}
                  // 3. 값 변경 시: 부모가 준 handleAnswerChange 실행
                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                ></Question>
              ))}
            </div>
          </div>
          {/* 하단 버튼 부분 */}
          <div className="flex justify-center">
            <div className="flex justify-center items-center gap-5 w-9/17">
              <Button
                onClick={() => {}}
                className="flex-1 h-14 outline -outline-offset-1 outline-neutral-400 flex justify-center items-center bg-white transition-all hover:bg-stone-100"
              >
                <span className="opacity-70 text-neutral-400 text-lg font-medium font-['Pretendard']">
                  임시저장
                </span>
              </Button>

              <Button
                onClick={handlePrevious}
                className="flex-1 h-14 outline -outline-offset-1 outline-neutral-400 flex justify-center items-center bg-white transition-all hover:bg-stone-100"
              >
                <span className="opacity-70 text-neutral-400 text-lg font-medium font-['Pretendard']">
                  이전단계
                </span>
              </Button>

              <Button
                onClick={() => {}} // 추후 다음 페이지 추가 필요
                className="flex-1 h-14 bg-button-green outline -outline-offset-1 outline-black flex justify-center items-center transition-all hover:bg-button-hover"
              >
                <span className="opacity-70 text-black text-lg font-medium font-['Pretendard']">
                  다음단계
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
