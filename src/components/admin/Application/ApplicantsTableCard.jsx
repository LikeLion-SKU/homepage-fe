//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
import OptionBox from '@/components/common/Option/optionBox';

export default function ApplicantsTableCard({ index, cardData, cardCheckData }) {
  const applicationResult = ['합격', '불합격'];
  const interviewResult = ['합격', '불합격'];

  const isChecked = cardCheckData.checkedList.includes(index);
  const isEditingThisCard = cardCheckData.isEdit === index;
  const handleToggle = () => {
    if (isChecked) {
      // 이미 있으면 제외 (하나 빼기)
      cardCheckData.setCheckedList(cardCheckData.checkedList.filter((item) => item !== index));
    } else {
      // 없으면 추가 (하나 넣기)
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

  return (
    <div
      className={`w-314 h-21 flex items-center pl-11 pr-5 text-[1.1rem] font-semibold gap-10 ${getBgColor()}`}
    >
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-6.25 border-2" />
      )}
      <div className="flex w-full gap-18 items-center">
        <p className="mr-1 ml-5">{cardData.name}</p>
        <p> {cardData.major}</p>
        <p>{cardData.stdNum}</p>
        <p className="ml-2 mr-7">{cardData.track}</p>
        {/* 서류 결과 선택 */}
        <OptionBox initValue={cardData.isApplicationPass} optionData={applicationResult} />
        {cardData.isApplicationPass && (
          <OptionBox initValue={cardData.isInterviewPass} optionData={interviewResult} />
        )}
        {/* 추후 해당 지원자의 지원서 확인 페이지로 리다이렉트 */}
        <button onClick={() => {}} className="px-2 py-2 border ml-auto">
          지원서 보러가기
        </button>
      </div>
    </div>
  );
}
