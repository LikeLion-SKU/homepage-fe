//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';

export default function UserTableCard({ cardData, checkedList, setCheckedList }) {
  const isChecked = checkedList.includes(cardData.userId);
  const handleToggle = () => {
    if (isChecked) {
      // 이미 있으면 제외 (하나 빼기)
      setCheckedList(checkedList.filter((item) => item !== cardData.userId));
    } else {
      // 없으면 추가 (하나 넣기)
      setCheckedList((prev) => [...prev, cardData.userId]);
    }
  };
  return (
    <div className="w-full h-21 flex shrink-0 items-center pl-11 pr-5 text-[1.1rem] font-semibold">
      {isChecked ? (
        <Check onClick={() => handleToggle()} />
      ) : (
        <button onClick={() => handleToggle()} className="w-7 h-7 border-2" />
      )}
      <p className="shrink-0 ml-20">{cardData.name}</p>
      <p className="w-35 shrink-0 ml-15 text-center">{cardData.department}</p>
      <p className="shrink-0 ml-auto">{cardData.studentNumber}</p>
    </div>
  );
}
