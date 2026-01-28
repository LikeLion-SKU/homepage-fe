import { useState } from 'react';
import { useOutletContext } from 'react-router';

//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import MemberTableCard from '@/components/admin/User/MemberTableCard';

export default function AdminMember() {
  const optionData = ['기수', '역할', '이름', '트랙', '학과', '학번', '수정', '복사'];
  const [allCardData, setAllCardData] = useState([
    {
      ordinalNum: '14기',
      role: '운영진',
      name: '정목진',
      track: '프론트엔드',
      major: '컴퓨터공학과',
      stdNum: '20220000',
    },
    {
      ordinalNum: '14기',
      role: '운영진',
      name: '심서현',
      track: '프론트엔드',
      major: '컴퓨터공학과',
      stdNum: '20220000',
    },
    {
      ordinalNum: '14기',
      role: '운영진',
      name: '김현수',
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
  ]);
  const [checkedList, setCheckedList] = useState([]);
  const [isEdit, setIsEdit] = useState(-1);
  const [isCopy, setIsCopy] = useState(-1);
  //@ts-ignore
  const { openModal, showToast } = useOutletContext();
  const handleCheck = () => {
    if (checkedList.length > 0) {
      // 하나라도 체크되어 있다면 -> '선택 취소' 동작 (리스트 비우기)
      setCheckedList([]);
    } else {
      // 아무것도 체크되어 있지 않다면 -> '전체 선택' 동작
      // 전체 데이터(memberList라고 가정)의 모든 index를 배열로 넣음
      const allIndexes = allCardData.map((_, i) => i);
      setCheckedList(allIndexes);
    }
  };
  const deleteData = () => {
    showToast('삭제되었습니다.');
    setAllCardData((prev) => {
      // 현재 인덱스(i)가 checkedList에 포함되지 않은 것만 필터링
      return prev.filter((_, i) => !checkedList.includes(i));
    });
    setCheckedList([]);
  };

  const cardCheckData = {
    checkedList,
    setCheckedList,
    isEdit,
    setIsEdit,
    setAllCardData,
    isCopy,
    setIsCopy,
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
              onClick={() => openModal(`구성원 정보를 삭제하시겠습니까?`, () => deleteData())}
              className="w-20 h-10 border text-center items-center bg-white"
            >
              삭제({checkedList.length})
            </button>
          )}
        </div>
        <div className="flex w-66 h-10 border items-center px-5 gap-7">
          <Search className="shrink-0 w-5 h-5" />
          <input placeholder="검색하기" className="focus:outline-none placeholder:text-[1rem]" />
        </div>
      </div>
      <div className="flex flex-col border">
        <div className="flex pl-40 pr-16 w-314 h-20 justify-between items-center font-semibold border-b">
          {optionData.map((name) => (
            <p>{name}</p>
          ))}
        </div>
        <div className="flex flex-col ">
          {allCardData.map((data, index) => (
            <MemberTableCard index={index} cardData={data} cardCheckData={cardCheckData} />
          ))}
        </div>
      </div>
    </div>
  );
}
