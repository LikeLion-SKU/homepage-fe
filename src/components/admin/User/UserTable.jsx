import { useState } from 'react';
import { useOutletContext } from 'react-router';

//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import UserTableCard from '@/components/admin/User/UserTableCard';

export default function UserTable({
  option,
  cardData,
  setCardData,
  setOtherData,
  onDelete = true,
}) {
  const [checkedList, setCheckedList] = useState([]);
  const handleAllCheck = () => {
    if (checkedList.length > 0) {
      // 하나라도 체크되어 있다면 -> '선택 취소' 동작 (리스트 비우기)
      setCheckedList([]);
    } else {
      // 아무것도 체크되어 있지 않다면 -> '전체 선택' 동작
      // 전체 데이터(memberList라고 가정)의 모든 index를 배열로 넣음
      const allIndexes = cardData.map((_, i) => i);
      setCheckedList(allIndexes);
    }
  };
  //@ts-ignore
  const { openModal, showToast } = useOutletContext();
  const handleMove = () => {
    const movePerson = cardData.filter((_, index) => checkedList.includes(index));

    setCardData((prev) => prev.filter((_, index) => !checkedList.includes(index)));
    setOtherData((prev) => [...prev, ...movePerson]);
    setCheckedList([]);
  };
  const handleDelete = () => {
    setCardData((prev) => prev.filter((_, index) => !checkedList.includes(index)));
    setCheckedList([]);
  };
  return (
    <div className="flex flex-col gap-5.5">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleAllCheck()}
            className="w-20 h-10 border text-center items-center bg-white"
          >
            {checkedList.length > 0 ? '선택취소' : '전체선택'}
          </button>
          {checkedList.length > 0 && (
            <button
              onClick={() => {
                handleMove();
                showToast('이동되었습니다.');
              }}
              className="w-25 h-10 border text-center items-center bg-white"
            >
              구성원 이동
            </button>
          )}
          {onDelete && checkedList.length > 0 && (
            <button
              onClick={() =>
                openModal('구성원 정보를 삭제하시겠습니까?', () => {
                  handleDelete();
                  showToast('삭제되었습니다!');
                })
              }
              className="w-20 h-10 border text-center items-center bg-white"
            >
              삭제
            </button>
          )}
        </div>
        <div className="flex w-66 h-10 border items-center px-5 gap-7">
          <Search className="shrink-0 w-5 h-5" />
          <input placeholder="검색하기" className="focus:outline-none placeholder:text-[1rem]" />
        </div>
      </div>
      <div className="flex flex-col border">
        <div className="flex pl-40 pr-16 h-20 justify-between items-center font-semibold border-b">
          {option.map((name) => (
            <p>{name}</p>
          ))}
        </div>
        <div className="flex flex-col ">
          {cardData.length > 0 &&
            cardData.map((data, index) => (
              <UserTableCard
                index={index}
                cardData={data}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
