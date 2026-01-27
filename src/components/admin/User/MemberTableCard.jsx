import { useState } from 'react';
import { useOutletContext } from 'react-router';

//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
//@ts-ignore
import Copy from '@/assets/icons/copy_icon.svg?react';
import OptionBox from '@/components/common/Option/optionBox';

export default function MemberTableCard({ index, cardData, cardCheckData }) {
  const roleOption = ['회장', '부회장', '운영진', '아기사자', '게스트'];
  const trackOption = ['PO', '프론트엔드', '백엔드', 'PM', 'Design', 'PM&Design'];
  //@ts-ignore
  const { openModal, showToast } = useOutletContext();
  const isChecked = cardCheckData.checkedList.includes(index);
  const [onEdit, setOnEdit] = useState(false);
  const handleToggle = () => {
    if (isChecked) {
      // 이미 있으면 제외 (하나 빼기)
      cardCheckData.setCheckedList(cardCheckData.checkedList.filter((item) => item !== index));
    } else {
      // 없으면 추가 (하나 넣기)
      cardCheckData.setCheckedList((prev) => [...prev, index]);
    }
  };
  const handleEdit = () => {
    if (cardCheckData.isEdit == index) {
      setOnEdit(false);
      cardCheckData.setIsEdit(-1);
    } else if (cardCheckData.isEdit == -1) {
      setOnEdit(true);
      cardCheckData.setIsEdit(index);
    } else {
      showToast('한 번에 한 명의 수정만 가능합니다. 수정 완료를 눌러주세요.');
    }
  };
  const handleCopyClick = () => {
    openModal(`선택한 구성원을 복사하시겠습니까?`, () => {
      // 실제 복사 로직 (예: navigator.clipboard.writeText...)
      cardCheckData.setAllCardData((prev) => {
        const targetCard = prev[index];
        const newCardData = { ...targetCard, name: `${targetCard.name}` };
        return [
          ...prev.slice(0, index + 1), // 현재 인덱스까지 자르고
          newCardData, // 그 뒤에 복사본 삽입
          ...prev.slice(index + 1), // 나머지 데이터 붙이기
        ];
      });
      showToast('복사가 완료되었습니다.');
    });
  };

  return (
    <div className="w-314 h-21 flex items-center pl-11 pr-10 text-[1.1rem] font-semibold gap-22">
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-6.25 border-2" />
      )}
      <div className="flex w-300 gap-10 items-center">
        <p className="mr-7">{cardData.ordinalNum}</p>
        {onEdit ? (
          <OptionBox initValue={cardData.role} optionData={roleOption} />
        ) : (
          <p className="w-28 text-center">{cardData.role}</p>
        )}
        <p className="mx-6.5">{cardData.name}</p>
        {onEdit ? (
          <OptionBox initValue={cardData.track} optionData={trackOption} />
        ) : (
          <p className="w-28 text-center">{cardData.track}</p>
        )}
        <p>{cardData.major}</p>
        <p className="mx-5">{cardData.stdNum}</p>
        <button
          onClick={() => handleEdit()}
          className={`text-[1.1rem] font-semibold ${onEdit ? 'text-[#F80000]' : 'text-black'}`}
        >
          <p className="ml-1">{onEdit ? '수정완료' : '수정하기'}</p>
        </button>
        <div className="w-6 h-6 ml-16">{onEdit && <Copy onClick={() => handleCopyClick()} />}</div>
      </div>
    </div>
  );
}
