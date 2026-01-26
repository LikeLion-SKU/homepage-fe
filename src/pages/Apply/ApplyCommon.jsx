import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import ApplyStep from '@/components/common/apply/ApplyStep';
import ApplyTitleSection from '@/components/common/apply/ApplyTitleSection';
import Question from '@/components/common/apply/Question';
import { QUESTION_LIST } from '@/constants/QuestionData';

export default function ApplyCommon() {
  /** @type {any} */
  const { formData, handleAnswerChange } = useOutletContext();
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate('/apply/info'); // URL 이동
  };
  const handleNext = () => {
    navigate('/apply/track');
  };

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
              {QUESTION_LIST.filter((item) => item.track === 'COMMON').map(
                (
                  item // 공통질문만 map 돌면서 보여주기
                ) => (
                  <Question
                    key={item.id}
                    question={`${item.order_number}. ${item.question}`}
                    className={questionStyle}
                    // 2. 입력된 값: 해당 질문 ID에 맞는 답변 전달
                    value={formData?.answers?.[item.id] || ''}
                    // 3. 값 변경 시: 부모가 준 handleAnswerChange 실행
                    onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                  ></Question>
                )
              )}
            </div>
          </div>
          {/* 하단 버튼 부분 */}
          <div className="flex justify-center">
            <div className="flex justify-center items-center gap-5 w-9/17">
              <Button
                onClick={() => {}}
                className="flex-1 h-14 outline -outline-offset-1 outline-text-gray flex justify-center items-center bg-white transition-all hover:bg-stone-100"
              >
                <span className=" text-text-gray text-lg font-medium">임시저장</span>
              </Button>

              <Button
                onClick={handlePrevious}
                className="flex-1 h-14 outline -outline-offset-1 outline-text-gray flex justify-center items-center bg-white transition-all hover:bg-stone-100"
              >
                <span className=" text-text-gray text-lg font-medium">이전단계</span>
              </Button>

              <Button
                onClick={handleNext} // 추후 다음 페이지 추가 필요
                className="flex-1 h-14 bg-button-green outline -outline-offset-1 outline-black flex justify-center items-center transition-all hover:bg-button-hover"
              >
                <span className="opacity-70 text-black text-lg font-medium">다음단계</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
