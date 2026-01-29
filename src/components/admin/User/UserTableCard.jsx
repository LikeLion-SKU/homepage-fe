//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';

export default function UserTableCard({ index, cardData, checkedList, setCheckedList }) {
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
    <div className="w-142 h-21 flex items-center justify-between pl-11 pr-10 text-[1.1rem] font-semibold">
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-7 border-2" />
      )}
      <p>{cardData.name}</p>
      <p>{cardData.major}</p>
      <p>{cardData.stdNum}</p>
    </div>
  );
}
