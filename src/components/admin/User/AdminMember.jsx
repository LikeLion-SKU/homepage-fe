import { useState } from 'react';

//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import MemberTableCard from '@/components/admin/User/MemberTableCard';
import Modal from '@/components/common/Modal/ConfirmModal';
import Toast from '@/components/common/Toast/Toast';

export default function AdminMember() {
  const optionData = ['기수', '역할', '이름', '트랙', '학과', '학번'];
  const cardData = [
    {
      ordinalNum: '14기',
      role: '운영진',
      name: '홍길동',
      track: '프론트엔드',
      major: '컴퓨터공학과',
      stdNum: '20220000',
    },
    {
      ordinalNum: '14기',
      role: '운영진',
      name: '홍길동',
      track: '프론트엔드',
      major: '컴퓨터공학과',
      stdNum: '20220000',
    },
    {
      ordinalNum: '14기',
      role: '운영진',
      name: '홍길동',
      track: '프론트엔드',
      major: '컴퓨터공학과',
      stdNum: '20220000',
    },
    {
      ordinalNum: '14기',
      role: '운영진',
      name: '홍길동',
      track: '프론트엔드',
      major: '컴퓨터공학과',
      stdNum: '20220000',
    },
  ];
  const [checkedList, setCheckedList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isToast, setIsToast] = useState(false);
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
  const onToastMessage = () => {
    if (isToast) return;
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5.5 mt-14">
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
              onClick={() => setIsModal(true)}
              className="w-20 h-10 border text-center items-center bg-white"
            >
              삭제({checkedList.length})
            </button>
          )}
        </div>
        <div className="flex w-66 h-10 border items-center px-5 gap-7">
          <Search />
          <input placeholder="검색하기" className="focus:outline-none placeholder:text-[1rem]" />
        </div>
      </div>
      <div className="flex flex-col border">
        <div className="flex pl-40 pr-16 h-20 justify-between items-center font-semibold border-b">
          {optionData.map((name) => (
            <p>{name}</p>
          ))}
        </div>
        <div className="flex flex-col ">
          {cardData.map((data, index) => (
            <MemberTableCard
              index={index}
              cardData={data}
              checkedList={checkedList}
              setCheckedList={setCheckedList}
            />
          ))}
        </div>
      </div>
      <Toast isToast={isToast} message="삭제되었습니다!" />
      <Modal
        isOpen={isModal}
        cancel={() => setIsModal(false)}
        confirm={() => {
          setIsModal(false);
          onToastMessage();
        }}
      >
        구성원 정보를 삭제하시겠습니까?
      </Modal>
    </div>
  );
}
