import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

import { deleteClubMember } from '@/api/userApi';
//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import MemberTableCard from '@/components/admin/User/MemberTableCard';

export default function AdminMember({ memberData, setTrigger, setDebouncedSearch }) {
  const optionData = ['기수', '역할', '이름', '트랙', '학과', '학번', '수정', '복사'];
  const [checkedList, setCheckedList] = useState([]);
  const [isEdit, setIsEdit] = useState(-1);
  const [searchName, setSearchName] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchName), 800);
    return () => clearTimeout(t);
  }, [searchName]);

  //@ts-ignore
  const { openModal, showToast } = useOutletContext();
  const handleCheck = () => {
    if (checkedList.length > 0) {
      // 하나라도 체크되어 있다면 -> '선택 취소' 동작 (리스트 비우기)
      setCheckedList([]);
    } else {
      // 아무것도 체크되어 있지 않다면 -> '전체 선택' 동작
      const allIndexes = memberData.map((data) => data.clubMemberId);
      setCheckedList(allIndexes);
    }
  };
  const deleteData = async () => {
    try {
      await deleteClubMember(checkedList);
      setTrigger((prev) => !prev);
      showToast('삭제되었습니다.');
      setCheckedList([]);
    } catch (error) {
      console.log('구성원 삭제 실패:', error);
    }
  };

  const cardCheckData = {
    checkedList,
    setCheckedList,
    isEdit,
    setIsEdit,
    setTrigger,
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
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="검색하기"
            className="focus:outline-none placeholder:text-[1rem]"
          />
        </div>
      </div>
      <div className="flex flex-col border">
        <div className="flex pl-40 pr-16 w-314 h-20 justify-between items-center font-semibold border-b">
          {optionData.map((name) => (
            <p>{name}</p>
          ))}
        </div>
        <div className="flex flex-col max-h-150 overflow-y-auto">
          {memberData.map((data, index) => (
            <MemberTableCard index={index} cardData={data} cardCheckData={cardCheckData} />
          ))}
        </div>
      </div>
    </div>
  );
}
