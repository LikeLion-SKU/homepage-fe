import { useCallback, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';

//@ts-ignore
import Search from '@/assets/icons/Search_icon.svg?react';
import ApplicantsTableCard from '@/components/admin/Application/ApplicantsTableCard';

export default function ApplicantsList({
  applicants,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  search,
  onSearch,
}) {
  const optionData = ['이름', '학과', '학번', '지원트랙', '지원서 합/불', '면접 합/불'];
  const [checkedList, setCheckedList] = useState([]);
  const [isEdit, setIsEdit] = useState(-1);
  const [isCopy, setIsCopy] = useState(-1);
  //@ts-ignore
  const { openModal, showToast } = useOutletContext();

  const [searchInput, setSearchInput] = useState(search || '');

  // 무한 스크롤 IntersectionObserver
  const observerRef = useRef(null);
  const loadMoreRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const handleCheck = () => {
    if (checkedList.length > 0) {
      setCheckedList([]);
    } else {
      const allIndexes = applicants.map((_, i) => i);
      setCheckedList(allIndexes);
    }
  };

  const deleteData = () => {
    showToast('삭제되었습니다.');
    setCheckedList([]);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchInput);
    }
  };

  const cardCheckData = {
    checkedList,
    setCheckedList,
    isEdit,
    setIsEdit,
    isCopy,
    setIsCopy,
  };

  return (
    <div className="flex flex-col gap-5.5 mt-14 w-full">
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
              onClick={() => openModal('구성원 정보를 삭제하시겠습니까?', () => deleteData())}
              className="w-20 h-10 border text-center items-center bg-white"
            >
              삭제({checkedList.length})
            </button>
          )}
        </div>
        <div className="flex w-66 h-10 border items-center px-5 gap-7">
          <Search className="shrink-0 w-5 h-5" />
          <input
            placeholder="검색하기"
            className="focus:outline-none placeholder:text-[1rem]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>
      <div className="flex flex-col border w-full">
        <div className="grid grid-cols-[80px_140px_190px_170px_160px_180px_200px_minmax(120px,1fr)] gap-4 h-20 px-4 items-center font-semibold border-b">
          <div />
          <div>{optionData[0]}</div>
          <div>{optionData[1]}</div>
          <div>{optionData[2]}</div>
          <div>{optionData[3]}</div>
          <div>{optionData[4]}</div>
          <div>{optionData[5]}</div>
          <div className="text-left">지원서</div>
        </div>
        <div className="flex flex-col">
          {applicants.map((data, index) => (
            <ApplicantsTableCard
              key={data.applicationRecordId}
              index={index}
              cardData={data}
              cardCheckData={cardCheckData}
            />
          ))}
          {/* 무한 스크롤 트리거 */}
          <div ref={loadMoreRef} className="h-1" />
          {isFetchingNextPage && (
            <div className="flex justify-center py-4 text-gray-500 text-sm">
              지원자 불러오는 중...
            </div>
          )}
          {!hasNextPage && applicants.length > 0 && (
            <div className="flex justify-center py-4 text-gray-400 text-sm">지원자 끄읕!!!</div>
          )}
          {!isFetchingNextPage && applicants.length === 0 && (
            <div className="flex justify-center py-8 text-gray-400 text-sm">지원자가 없다</div>
          )}
        </div>
      </div>
    </div>
  );
}
