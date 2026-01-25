import { useState } from 'react';

//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import UserTableCard from '@/components/admin/User/UserTableCard';
import Modal from '@/components/common/Modal/ConfirmModal';
import Toast from '@/components/common/Toast/Toast';

export default function Table({ option, cardData, onDelete = true }) {
  const [moveToast, setMoveToast] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const handleCheck = () => {
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
  const onToastMessage = (t) => {
    if (t == 'move') {
      if (moveToast) return;
      setMoveToast(true);
      setTimeout(() => {
        setMoveToast(false);
      }, 1500);
    } else {
      if (deleteToast) return;
      setDeleteToast(true);
      setTimeout(() => {
        setDeleteToast(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col gap-5.5">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleCheck()}
            className="w-20 h-10 border text-center items-center bg-white"
          >
            {checkedList.length > 0 ? '선택취소' : '전체선택'}
          </button>
          {checkedList.length > 0 && (
            <button
              onClick={() => onToastMessage('move')}
              className="w-25 h-10 border text-center items-center bg-white"
            >
              구성원 이동
            </button>
          )}
          {onDelete && checkedList.length > 0 && (
            <button
              onClick={() => setIsModal(true)}
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
          {cardData.map((data, index) => (
            <UserTableCard
              index={index}
              cardData={data}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
            />
          ))}
        </div>
      </div>
      <Toast isToast={moveToast} message="이동되었습니다." />
      <Toast isToast={deleteToast} message="삭제되었습니다!" />
      <Modal
        isOpen={isModal}
        cancel={() => setIsModal(false)}
        confirm={() => {
          setIsModal(false);
          onToastMessage('delete');
        }}
      >
        구성원 정보를 삭제하시겠습니까?
      </Modal>
    </div>
  );
}
