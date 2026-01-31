import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/ConfirmModal';
import ApplyStep from '@/components/common/apply/ApplyStep';
import ApplyTitleSection from '@/components/common/apply/ApplyTitleSection';
import { QUESTION_LIST } from '@/constants/QuestionData';

export default function FinalConfirm() {
  const TRACK_NAMES = {
    fe: '프론트엔드',
    be: '백엔드',
    po: 'PO',
  };
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevious = () => {
    navigate('/apply/track'); // URL 이동
  };

  const handleNext = () => {
    navigate('/apply/complete');
  };
  //@ts-ignore
  const { formData } = useOutletContext();
  return (
    <div className="pb-35">
      <div className="w-full flex flex-col pt-18 px-6 pad:px-15 web:px-45.5 gap-23">
        <div className="flex flex-col gap-20 pad:gap-31">
          <div className="flex flex-col gap-15 pad:gap-20">
            {/* 지원서 작성 페이지의 기본 정보 섹션 */}
            <ApplyTitleSection></ApplyTitleSection>
            {/* 지원서 작성 단계 부분 */}
            <div className="self-stretch inline-flex items-start gap-7">
              <ApplyStep
                step="STEP 1"
                stepName="기본 인적사항"
                lineStyle="self-stretch h-1 bg-button-green mb-5"
                stepStyle="self-stretch text-center text-button-green text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-button-green text-lg pad:text-2xl font-bold"
              ></ApplyStep>
              <ApplyStep
                step="STEP 2"
                stepName="공통 질문"
                lineStyle="self-stretch h-1 bg-button-green mb-5"
                stepStyle="self-stretch text-center text-button-green text-sm font-semibold pad:text-1xl pad:font-medium mb-1.5"
                stepNameStyle="self-stretch text-center text-button-green text-lg pad:text-2xl font-bold"
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
          {/* 인적사항 기재 부분 */}
          <div>
            <div className="flex flex-col gap-4 pad:gap-10">
              <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">인적사항</div>
              <div className="self-stretch web:min-h-103 pt-11 pb-13 items-center px-6 pad:px-25 web:px-25 border bg-button-gray">
                <div className="flex justify-between gap-x-5 gap-y-6">
                  {/* 왼쪽 이름, 학과, 학번 */}
                  <div className="web:flex-1 flex flex-col gap-6 pad:gap-11">
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">이름</label>
                      <div className="text-xs pad:text-base">{formData.name || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">학과</label>
                      <div className="text-xs pad:text-base">{formData.major || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">학번</label>
                      <div className="text-xs pad:text-base">{formData.studentId || '-'}</div>
                    </div>
                  </div>
                  {/* 오른쪽 전화번호, 이메일, 지원파트 */}
                  <div className="web:flex-1 flex flex-col gap-6 pad:gap-11">
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">전화번호</label>
                      <div className="text-xs pad:text-base">{formData.phone || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">이메일</label>
                      <div className="text-xs pad:text-base">{formData.email || '-'}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-sm pad:text-lg font-semibold">지원트랙</label>
                      <div className="h-7 pad:h-11 web:h-12 min-w-14 pad:w-31 web:w-32 outline flex items-center justify-center text-sm pad:text-lg font-semibold transition-all bg-button-green text-black">
                        {TRACK_NAMES[formData.track] || '미선택'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 공통 질문 답변 부분 */}
          <div className="flex flex-col gap-4 pad:gap-10">
            <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">공통 질문</div>
            {/* 공통질문 상자 */}
            <div className="flex flex-col px-6 py-7 pad:px-10 web:px-20 pad:py-18 web:py-18.5 border bg-button-gray gap-15">
              {/* 공통질문 내용 */}
              {QUESTION_LIST.filter((item) => item.track === 'COMMON').map(
                (
                  item // 공통질문만 map 돌면서 보여주기
                ) => (
                  <div key={item.id} className="flex flex-col gap-4">
                    {/* 질문 제목 */}
                    <div className="text-lg font-bold text-zinc-800">
                      {item.order_number}. {item.question}
                    </div>
                    {/* 답변 부분 */}
                    <div className="w-full min-h-32 p-5 text-xs pad:text-base font-medium text-zinc-700 whitespace-pre-wrap">
                      {formData.answers?.[item.id] || '작성된 내용이 없습니다.'}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          {/* 트랙별 질문 답변 부분 */}
          <div className="flex flex-col gap-4 pad:gap-10">
            <div className="self-stretch h-8 text-lg pad:text-2xl font-bold">트랙별 질문</div>
            {/* 트랙별 질문 상자 */}
            <div className="flex flex-col px-6 py-7 pad:px-10 web:px-20 pad:py-18 web:py-18.5 border bg-button-gray gap-15">
              {/* formData의 track에 따라 필터링하여 답변 보여주기 */}
              {QUESTION_LIST.filter((item) => item.track === formData.track).map((item) => (
                <div key={item.id} className="flex flex-col gap-4">
                  {/* 질문 제목 */}
                  <div className="text-lg font-bold text-zinc-800">
                    {item.order_number}. {item.question}
                  </div>

                  {/* 줄바꿈 유지하도록*/}
                  <div className="w-full min-h-32 p-5 text-xs pad:text-base font-medium text-zinc-700 whitespace-pre-wrap">
                    {formData.answers?.[item.id] || '작성된 내용이 없습니다.'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 하단 버튼 부분 */}
          <div className="flex justify-center">
            <div className="flex justify-center items-center gap-3 pad:gap-5">
              <Button
                onClick={handlePrevious}
                className="w-35 pad:w-47 web:w-53 h-11 pad:h-14 outline -outline-offset-1 outline-text-gray flex justify-center items-center bg-white transition-all hover:bg-stone-100"
              >
                <span className="text-gray-900 text-base font-semibold pad:text-lg pad:font-medium">
                  이전단계
                </span>
              </Button>

              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-35 pad:w-47 web:w-53 h-11 pad:h-14 bg-button-green outline -outline-offset-1 outline-black flex justify-center items-center transition-all hover:bg-button-hover"
              >
                <span className="opacity-70 text-black text-base font-semibold pad:text-lg pad:font-medium">
                  다음단계
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} cancel={() => setIsModalOpen(false)} confirm={handleNext}>
        제출 후 수정은 불가합니다.
        <br />
        정말 제출하시겠습니까?
      </Modal>
    </div>
  );
}
