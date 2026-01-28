import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function NoticeTableData({ children }) {
  // RootLayout의 모달/토스트 기능 사용
  const context = useOutletContext();
  // @ts-ignore
  const openModal = context?.openModal || (() => {});
  // @ts-ignore
  const showToast = context?.showToast || (() => {});
  const [noticeData, setNoticeData] = useState([
    {
      ordinalNum: '14기',
      publicDate: '2026.03.30',
      publicTime: '17:00',
      deadline: '2026.03.31',
      deadlineTime: '17:00',
      documentDate: '2026.04.01',
      documentTime: '17:00',
      interviewDate: '2026.04.02',
      interviewTime: '17:00',
      finalDate: '2026.04.03',
      finalTime: '17:00',
    },
    {
      ordinalNum: '13기',
      publicDate: '2025.01.15',
      publicTime: '10:00',
      deadline: '2025.01.16',
      deadlineTime: '18:00',
      documentDate: '2025.01.17',
      documentTime: '09:00',
      interviewDate: '2025.01.18',
      interviewTime: '14:00',
      finalDate: '2025.01.19',
      finalTime: '15:00',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(-1);
  const [checkedList, setCheckedList] = useState([]);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(-1);
  const [confirmModeIndex, setConfirmModeIndex] = useState(-1);

  const handleAddRow = () => {
    const newRow = {
      ordinalNum: '',
      publicDate: '',
      publicTime: '',
      deadline: '',
      deadlineTime: '',
      documentDate: '',
      documentTime: '',
      interviewDate: '',
      interviewTime: '',
      finalDate: '',
      finalTime: '',
    };
    setNoticeData((prev) => [newRow, ...prev]);
    // 새로 추가된 행을 바로 수정 모드로
    setEditingIndex(0);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index, editData) => {
    // 동일한 지원 일정(모든 필드 값이 동일한 row)이 이미 존재하는지 검사
    const isDuplicate = noticeData.some((row, idx) => {
      if (idx === index) return false;
      return (
        row.ordinalNum === editData.ordinalNum &&
        row.publicDate === editData.publicDate &&
        row.publicTime === editData.publicTime &&
        row.deadline === editData.deadline &&
        row.deadlineTime === editData.deadlineTime &&
        row.documentDate === editData.documentDate &&
        row.documentTime === editData.documentTime &&
        row.interviewDate === editData.interviewDate &&
        row.interviewTime === editData.interviewTime &&
        row.finalDate === editData.finalDate &&
        row.finalTime === editData.finalTime
      );
    });

    if (isDuplicate) {
      showToast('지원 일정이 겹치지 않게 선택해주세요.');
      return;
    }

    setNoticeData((prev) => {
      const newData = [...prev];
      newData[index] = editData;
      return newData;
    });
    setEditingIndex(-1);
    showToast('수정이 완료되었습니다.');
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const handleDelete = (index) => {
    setDeleteTargetIndex(index);
    openModal('해당 공고를 삭제하시겠습니까?', () => {
      if (deleteTargetIndex !== -1) {
        setNoticeData((prev) => prev.filter((_, idx) => idx !== deleteTargetIndex));
        if (editingIndex === deleteTargetIndex) {
          setEditingIndex(-1);
        } else if (editingIndex > deleteTargetIndex) {
          setEditingIndex(editingIndex - 1);
        }
        setDeleteTargetIndex(-1);
      }
      showToast('삭제되었습니다.');
    });
  };

  const handleCheck = () => {
    if (checkedList.length > 0) {
      // 하나라도 체크되어 있다면 -> '선택 취소' 동작 (리스트 비우기)
      setCheckedList([]);
    } else {
      // 아무것도 체크되어 있지 않다면 -> '전체 선택' 동작
      const allIndexes = noticeData.map((_, i) => i);
      setCheckedList(allIndexes);
    }
  };

  const handleDeleteSelected = () => {
    // 선택된 항목들을 역순으로 정렬해서 삭제 (인덱스 변경 방지)
    const sortedIndexes = [...checkedList].sort((a, b) => b - a);
    sortedIndexes.forEach((idx) => {
      if (editingIndex === idx) {
        setEditingIndex(-1);
      } else if (editingIndex > idx) {
        setEditingIndex(editingIndex - 1);
      }
    });
    setNoticeData((prev) => prev.filter((_, idx) => !checkedList.includes(idx)));
    setCheckedList([]);
    showToast('삭제되었습니다.');
  };

  const handleSaveAll = () => {
    // TODO: API 호출로 전체 데이터 저장
  };

  const handleOpenEditModal = (index) => {
    openModal('선택한 공고를 수정하시겠습니까?', () => {
      handleEdit(index);
      // 수정 모드로 전환하면서 바로 수정완료 모드로 설정
      setConfirmModeIndex(index);
    });
  };

  const setConfirmMode = (index, value) => {
    if (value) {
      setConfirmModeIndex(index);
    } else {
      setConfirmModeIndex(-1);
    }
  };

  return children({
    noticeData,
    editingIndex,
    checkedList,
    setCheckedList,
    handleAddRow,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    handleCheck,
    handleDeleteSelected,
    handleSaveAll,
    handleOpenEditModal,
    confirmModeIndex,
    setConfirmMode,
  });
}
