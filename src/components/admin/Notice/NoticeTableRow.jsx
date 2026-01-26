import { useState } from 'react';

import NoticeButton from '@/components/admin/Notice/NoticeButton';

export default function NoticeTableRow({
  index,
  rowData,
  isEditing,
  onSave,
  checkedList,
  setCheckedList,
  setIsEditModalOpen,
  isConfirmMode = false,
  setConfirmMode,
}) {
  // rowData를 기반으로 초기 editData 생성
  // key prop을 사용하여 isEditing이 변경될 때 컴포넌트가 리마운트되므로
  // editData가 자동으로 초기화됩니다
  const [editData, setEditData] = useState({
    ordinalNum: rowData.ordinalNum,
    publicDate: rowData.publicDate,
    publicTime: rowData.publicTime || '',
    deadline: rowData.deadline,
    deadlineTime: rowData.deadlineTime || '',
    documentDate: rowData.documentDate,
    documentTime: rowData.documentTime || '',
    finalDate: rowData.finalDate,
    finalTime: rowData.finalTime || '',
  });
  const handleEdit = () => {
    if (isEditing && isConfirmMode) {
      // 수정완료 버튼 클릭 - 저장
      onSave(index, editData);
      if (setConfirmMode) {
        setConfirmMode(index, false);
      }
    } else {
      // 수정 시작 - 확인 모달 표시
      if (setIsEditModalOpen) {
        setIsEditModalOpen(index);
      }
    }
  };

  // 날짜와 시간을 합쳐서 표시하는 헬퍼 함수
  const formatDateTime = (date, time) => {
    if (!date) return '-';
    if (!time) return date;
    return `${date} ${time}`;
  };

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
    <div
      className={`w-full h-21 flex items-center pl-11 pr-10 text-[1.1rem] font-semibold border-b ${
        isChecked ? 'bg-[#E7E7E7]' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="flex w-full gap-6 items-center justify-between">
        {/* 체크박스 */}
        <NoticeButton type="checkbox" onClick={handleToggle} isChecked={isChecked} />
        {isEditing ? (
          <>
            <input
              type="text"
              value={editData.ordinalNum}
              onChange={(e) => setEditData({ ...editData, ordinalNum: e.target.value })}
              className="w-24 h-10 border text-center focus:outline-none"
              placeholder="모집 기수"
            />
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={editData.publicDate}
                onChange={(e) => setEditData({ ...editData, publicDate: e.target.value })}
                className="w-24 h-10 border text-center focus:outline-none"
                placeholder="공개일"
              />
              <input
                type="text"
                value={editData.publicTime}
                onChange={(e) => setEditData({ ...editData, publicTime: e.target.value })}
                className="w-14 h-10 border text-center focus:outline-none"
                placeholder="오전/오후"
              />
            </div>
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={editData.deadline}
                onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                className="w-24 h-10 border text-center focus:outline-none"
                placeholder="마감일"
              />
              <input
                type="text"
                value={editData.deadlineTime}
                onChange={(e) => setEditData({ ...editData, deadlineTime: e.target.value })}
                className="w-14 h-10 border text-center focus:outline-none"
                placeholder="오전/오후"
              />
            </div>
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={editData.documentDate}
                onChange={(e) => setEditData({ ...editData, documentDate: e.target.value })}
                className="w-24 h-10 border text-center focus:outline-none"
                placeholder="서류 발표일"
              />
              <input
                type="text"
                value={editData.documentTime}
                onChange={(e) => setEditData({ ...editData, documentTime: e.target.value })}
                className="w-14 h-10 border text-center focus:outline-none"
                placeholder="오전/오후"
              />
            </div>
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={editData.finalDate}
                onChange={(e) => setEditData({ ...editData, finalDate: e.target.value })}
                className="w-24 h-10 border text-center focus:outline-none"
                placeholder="최종 발표일"
              />
              <input
                type="text"
                value={editData.finalTime}
                onChange={(e) => setEditData({ ...editData, finalTime: e.target.value })}
                className="w-14 h-10 border text-center focus:outline-none"
                placeholder="오전/오후"
              />
            </div>
            <NoticeButton
              type="edit"
              onClick={handleEdit}
              isConfirmMode={isConfirmMode}
              className={isChecked ? 'bg-[#E7E7E7]' : ''}
            />
          </>
        ) : (
          <>
            <p className="w-24 text-center">{rowData.ordinalNum}</p>
            <p className="w-40 text-center whitespace-nowrap">
              {formatDateTime(rowData.publicDate, rowData.publicTime)}
            </p>
            <p className="w-40 text-center whitespace-nowrap">
              {formatDateTime(rowData.deadline, rowData.deadlineTime)}
            </p>
            <p className="w-40 text-center whitespace-nowrap">
              {formatDateTime(rowData.documentDate, rowData.documentTime)}
            </p>
            <p className="w-40 text-center whitespace-nowrap">
              {formatDateTime(rowData.finalDate, rowData.finalTime)}
            </p>
            <NoticeButton
              type="edit"
              onClick={handleEdit}
              className={isChecked ? 'bg-[#E7E7E7]' : ''}
            />
          </>
        )}
      </div>
    </div>
  );
}
