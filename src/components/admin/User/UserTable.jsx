import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';

import { deleteGuest, deleteToGuest, postToClubMember } from '@/api/userApi';
//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import UserTableCard from '@/components/admin/User/UserTableCard';

export default function UserTable({
  option,
  cardData,
  onDelete = true,
  setIsGetGuest,
  setTrigger,
  handleGuestData,
  setDebouncedGuestName,
  isGuest,
}) {
  const [checkedList, setCheckedList] = useState([]);
  const observerRef = useRef(null);
  const [searchName, setSearchName] = useState('');
  //@ts-ignore
  const { openModal, showToast } = useOutletContext();
  const handleAllCheck = () => {
    if (checkedList.length > 0) {
      // 하나라도 체크되어 있다면 -> '선택 취소' 동작 (리스트 비우기)
      setCheckedList([]);
    } else {
      // 아무것도 체크되어 있지 않다면 -> '전체 선택' 동작
      // 전체 데이터(memberList라고 가정)의 모든 index를 배열로 넣음
      const allIndexes = cardData.userInformationList.content.map((data) => data.userId);
      setCheckedList(allIndexes);
    }
  };
  const handleMove = async () => {
    //이동 api
    try {
      if (cardData.guest) {
        await postToClubMember(checkedList);
      } else {
        await deleteToGuest(checkedList);
      }
    } catch (error) {
      console.log('이동 실패:', error);
    } finally {
      setCheckedList([]);
      handleGuestData(2);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteGuest(checkedList);
      setCheckedList([]);
    } catch (error) {
      console.log('게스트 삭제 실패:', error);
    } finally {
      handleGuestData(0);
    }
  };
  useEffect(() => {
    if (!cardData.userInformationList.hasNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsGetGuest(true); // 바닥에 닿으면 추가 로드 호출
          setTrigger((prev) => !prev);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [cardData.userInformationList.hasNext]);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedGuestName(searchName), 800);
    return () => clearTimeout(t);
  }, [searchName]);
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
              {isGuest ? '구성원 이동' : '게스트 이동'}
            </button>
          )}
          {onDelete && checkedList.length > 0 && (
            <button
              onClick={() =>
                openModal(
                  isGuest ? '게스트 정보를 삭제하시겠습니까?' : '구성원 정보를 삭제하시겠습니까?',
                  () => {
                    handleDelete();
                    showToast('삭제되었습니다!');
                  }
                )
              }
              className="w-20 h-10 border text-center items-center bg-white"
            >
              삭제
            </button>
          )}
        </div>
        <div className="flex w-66 h-10 border items-center px-5 gap-7">
          <Search className="shrink-0 w-5 h-5" />
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="검색하기"
            className="focus:outline-none placeholder:text-[1rem]"
          />
        </div>
      </div>
      <div className="flex flex-col border">
        <div className="flex pl-40 pr-16 h-20 justify-between items-center font-semibold border-b">
          {option.map((name) => (
            <p>{name}</p>
          ))}
        </div>
        <div className="flex flex-col overflow-y-auto max-h-100 no-scrollbar">
          {cardData.userInformationList.content.length > 0 &&
            cardData.userInformationList.content.map((data) => (
              <UserTableCard
                cardData={data}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
              />
            ))}
          <div ref={observerRef} className="h-10 w-full flex justify-center items-center">
            {cardData.userInformationList.hasNext && <div className="h-10 w-full" />}
          </div>
        </div>
      </div>
    </div>
  );
}
