import { useState } from 'react';

//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
import OptionBox from '@/components/common/Option/optionBox';

const TRACK_LABEL = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  PO: 'PO',
  PM: 'PM',
  DESIGN: '디자인',
  PM_DESIGN: 'PM & 디자인',
};

export default function ApplicantsTableCard({ index, cardData, cardCheckData }) {
  const applicationResult = ['합격', '불합격'];
  const interviewResult = ['합격', '불합격'];
  const [docResult, setDocResult] = useState(null);

  const isChecked = cardCheckData.checkedList.includes(index);
  const isEditingThisCard = cardCheckData.isEdit === index;

  const handleToggle = () => {
    if (isChecked) {
      cardCheckData.setCheckedList(cardCheckData.checkedList.filter((item) => item !== index));
    } else {
      cardCheckData.setCheckedList((prev) => [...prev, index]);
    }
  };

  const getBgColor = () => {
    if (isEditingThisCard) {
      if (cardCheckData.isCopy === index) {
        return 'bg-[#DFEBB5]';
      }
      return 'bg-[#E7E7E7]';
    } else {
      return '';
    }
  };

  // 서류 합/불 표시값
  const docPassDisplay =
    cardData.isDocumentPassed === true
      ? '합격'
      : cardData.isDocumentPassed === false
        ? '불합격'
        : '선택';

  // 면접 합/불 표시값
  const interviewPassDisplay =
    cardData.isInterviewPassed === true
      ? '합격'
      : cardData.isInterviewPassed === false
        ? '불합격'
        : null;

  return (
    <div
      className={`w-314 h-21 flex items-center pl-11 pr-5 text-[1.1rem] font-semibold gap-10 ${getBgColor()}`}
    >
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-6.25 border-2" />
      )}
      <div className="flex w-full gap-15 items-center">
        <p className="mr-1 ml-5">{cardData.name}</p>
        <p>{cardData.department}</p>
        <p>{cardData.studentNumber}</p>
        <p className="ml-2 mr-7">{TRACK_LABEL[cardData.track] || cardData.track}</p>
        {/* 서류 결과 선택 */}
        <OptionBox
          initValue={docPassDisplay}
          optionData={applicationResult}
          selectedNum={docResult}
          setSelectedNum={setDocResult}
        />
        {cardData.isDocumentPassed && (
          <OptionBox
            initValue={interviewPassDisplay}
            optionData={interviewResult}
            selectedNum={docResult}
            setSelectedNum={setDocResult}
          />
        )}
        {/* 추후 해당 지원자의 지원서 확인 페이지로 리다이렉트 */}
        <button onClick={() => {}} className="px-2 py-2 border ml-auto text-base">
          지원서 보러가기
        </button>
      </div>
    </div>
  );
}
