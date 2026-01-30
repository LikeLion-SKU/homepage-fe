import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import CheckModal from '@/components/common/Modal/CheckModal';
import ApplyStep from '@/components/common/apply/ApplyStep';
import ApplyTitleSection from '@/components/common/apply/ApplyTitleSection';
import Question from '@/components/common/apply/Question';
import { QUESTION_LIST } from '@/constants/QuestionData';

export default function ApplyTrack() {
  /** @type {any} */
  const { formData, handleAnswerChange } = useOutletContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handlePrevious = () => {
    navigate('/apply/common'); // URL 이동
  };

  // 모든 답변을 한 후 최종확인 페이지로 이동하는 모달의 '확인'버튼을 누를 경우
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (shouldNavigate) {
      navigate('/apply/confirm');
    }
  };

  const handleNext = () => {
    const commonQuestions = QUESTION_LIST.filter((item) => item.track === formData.track); // 트랙별 질문만 가져오기
    const isAllAnswered = validateAnswers(commonQuestions, formData.answers);

    if (!isAllAnswered) {
      setShouldNavigate(false);
      setIsModalOpen(true);
    } else {
      // 모든 답변이 완료되었을 때
      setShouldNavigate(true); // 최종 확인 페이지로 이동해야 함
      setIsModalOpen(true);
    }
  };

  // 트랙별 질문 유효성 검사
  const validateAnswers = (questions, currentAnswers) => {
    // 질문마다 currentAnswers에 답변들이 다 존재하고, 내용이 비어있지 않은지 확인
    const answers = currentAnswers || {};

    return questions.every((q) => {
      const answer = answers[q.id];
      // 값이 존재하고, 공백을 제외한 길이가 0보다 큰지 확인
      return typeof answer === 'string' && answer.trim().length > 0;
    });
  };

  const textareaStyle = `self-stretch px-8 py-7 bg-white border justify-center items-center min-h-109 pad:min-h-80 web:min-h-56 resize-none overflow-y-auto`;

  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-6 pad:px-15 web:px-45.5 gap-23">
        <div className="flex flex-col gap-20 pad:gap-31">
          <div className="flex flex-col gap-15 pad:gap-20">
            {/* 지원서 작성 페이지의 기본 정보 섹션 */}
            <ApplyTitleSection></ApplyTitleSection>
            {/* 지원서 작성 단계 부분 */}
            <div className="self-stretch inline-flex items-center gap-7">
              <ApplyStep
                step="STEP 1"
                stepName="기본 인적사항"
                lineStyle="self-stretch h-1 bg-navy-blue mb-5"
                stepStyle="self-stretch text-center text-navy-blue text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-navy-blue text-lg pad:text-2xl font-bold"
              ></ApplyStep>
              <ApplyStep
                step="STEP 2"
                stepName="공통 질문"
                lineStyle="self-stretch h-1 bg-navy-blue mb-5"
                stepStyle="self-stretch text-center text-navy-blue text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-navy-blue text-lg pad:text-2xl font-bold"
              ></ApplyStep>
              <ApplyStep
                step="STEP 3"
                stepName="트랙별 질문"
                lineStyle="self-stretch h-1 bg-button-green mb-5"
                stepStyle="self-stretch text-center text-button-green text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-button-green text-lg pad:text-2xl font-bold"
              ></ApplyStep>
            </div>
          </div>
          {/* 트랙별 질문 부분 */}
          <div className="flex flex-col gap-4 pad:gap-10">
            <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">트랙별 질문</div>
            {/* 트랙별 질문 상자 */}
            <div className="flex flex-col px-6 py-7 pad:px-10 web:px-20 pad:py-18 web:py-18.5 border bg-button-gray gap-15">
              {/* 트랙별 질문 내용 */}
              {/* formData의 track에 따라 질문 보여주기*/}
              {QUESTION_LIST.filter((item) => item.track === formData.track).map((item) => (
                <Question
                  key={item.id}
                  question={`${item.order_number}. ${item.question}`}
                  className={textareaStyle}
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
            <div className="flex flex-col pad:flex-row justify-center items-center gap-5">
              <Button
                onClick={() => {}}
                className="w-45 pad:w-47 web:w-53 h-11 pad:h-14 outline -outline-offset-1 outline-text-gray flex justify-center items-center bg-white transition-all hover:bg-stone-100"
              >
                <span className=" text-gray-900 text-base font-semibold pad:text-lg pad:font-medium">
                  임시저장
                </span>
              </Button>

              <Button
                onClick={handlePrevious}
                className="w-45 pad:w-47 web:w-53 h-11 pad:h-14 outline -outline-offset-1 outline-text-gray flex justify-center items-center bg-white transition-all hover:bg-stone-100"
              >
                <span className=" text-gray-900 text-base font-semibold pad:text-lg pad:font-medium">
                  이전단계
                </span>
              </Button>

              <Button
                onClick={handleNext}
                className="w-45 pad:w-47 web:w-53 h-11 pad:h-14 bg-button-green outline -outline-offset-1 outline-black flex justify-center items-center transition-all hover:bg-button-hover"
              >
                <span className="opacity-70 text-black text-base font-semibold pad:text-lg pad:font-medium">
                  다음단계
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CheckModal isOpen={isModalOpen} cancel={handleModalConfirm}>
        {shouldNavigate ? (
          <>
            최종 확인 페이지로 이동합니다.
            <br />
            최종 확인 후 제출하기 버튼을 통해
            <br />
            제출 완료를 해주세요.
          </>
        ) : (
          '모든 답변을 작성해 주세요!'
        )}
      </CheckModal>
    </div>
  );
}
