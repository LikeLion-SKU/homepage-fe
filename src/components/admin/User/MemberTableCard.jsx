//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
import OptionBox from '@/components/common/Option/optionBox';

export default function MemberTableCard({ index, cardData, checkedList, setCheckedList }) {
  const roleOption = ['회장', '부회장', '운영진', '아기사자', '게스트'];
  const trackOption = ['PO', '프론트엔드', '백엔드', 'PM', 'Design', 'PM&Design'];
  const isChecked = checkedList.includes(index);
  const handleToggle = () => {
    if (isChecked) {
      // 이미 있으면 제외 (하나 빼기)
      setCheckedList(checkedList.filter((item) => item !== index));
    } else {
      // 없으면 추가 (하나 넣기)
      setCheckedList((prev) => [...prev, index]);
    }
  };
  return (
    <div className="w-314 h-21 flex items-center pl-11 pr-10 text-[1.1rem] font-semibold gap-22">
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-7 border-2" />
      )}
      <div className="flex w-300 justify-between">
        <p>{cardData.ordinalNum}</p>
        <OptionBox initValue={cardData.role} optionData={roleOption} />
        <p>{cardData.name}</p>
        <OptionBox initValue={cardData.track} optionData={trackOption} />
        <p>{cardData.major}</p>
        <p>{cardData.stdNum}</p>
      </div>
    </div>
  );
}
