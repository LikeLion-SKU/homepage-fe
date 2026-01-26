import { useState } from 'react';

export default function NoticeTableData({ children }) {
  const [noticeData, setNoticeData] = useState([
    {
      ordinalNum: '14기',
      publicDate: '2026.03.30',
      publicTime: '오후 5:00',
      deadline: '2026.03.30',
      deadlineTime: '오후 5:00',
      documentDate: '2026.03.30',
      documentTime: '오후 5:00',
      finalDate: '2026.03.30',
      finalTime: '오후 5:00',
    },
    {
      ordinalNum: '13기',
      publicDate: '2025.01.15',
      publicTime: '오전 10:00',
      deadline: '2025.02.20',
      deadlineTime: '오후 6:00',
      documentDate: '2025.02.25',
      documentTime: '오전 9:00',
      finalDate: '2025.03.01',
      finalTime: '오후 3:00',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(-1);
  const [checkedList, setCheckedList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // 수정 완료 모달은 제거하고, 수정 완료 시 토스트만 띄웁니다.
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(-1);
  const [editTargetIndex, setEditTargetIndex] = useState(-1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [confirmModeIndex, setConfirmModeIndex] = useState(-1);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleAddRow = () => {
    const newRow = {
      ordinalNum: '',
      publicDate: '',
      publicTime: '',
      deadline: '',
      deadlineTime: '',
      documentDate: '',
      documentTime: '',
      finalDate: '',
      finalTime: '',
    };
    setNoticeData((prev) => [newRow, ...prev]);
    // 새로 추가된 행을 바로 수정 모드로
    setEditingIndex(0);
  };

  const handleEdit = (index) => {
    if (editingIndex !== -1 && editingIndex !== index) {
      setWarningMessage('한 번에 한 개의 행만 수정할 수 있습니다. 수정 완료를 눌러주세요.');
      setIsWarningModalOpen(true);
      return;
    }
    setEditingIndex(index);
  };

  const handleSave = (index, editData) => {
    setNoticeData((prev) => {
      const newData = [...prev];
      newData[index] = editData;
      return newData;
    });
    setEditingIndex(-1);
    showToastMessage('수정이 완료되었습니다.');
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const handleDelete = (index) => {
    setDeleteTargetIndex(index);
    setIsDeleteModalOpen(true);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetIndex !== -1) {
      setNoticeData((prev) => prev.filter((_, idx) => idx !== deleteTargetIndex));
      if (editingIndex === deleteTargetIndex) {
        setEditingIndex(-1);
      } else if (editingIndex > deleteTargetIndex) {
        setEditingIndex(editingIndex - 1);
      }
      setDeleteTargetIndex(-1);
    }
    setIsDeleteModalOpen(false);
    showToastMessage('삭제되었습니다.');
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
    setIsDeleteSelectedModalOpen(false);
    showToastMessage('삭제되었습니다.');
  };

  const handleSaveAll = () => {
    // TODO: API 호출로 전체 데이터 저장
    setIsSaveModalOpen(true);
  };

  const handleOpenEditModal = (index) => {
    setEditTargetIndex(index);
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = () => {
    if (editTargetIndex !== -1) {
      handleEdit(editTargetIndex);
      // 수정 모드로 전환하면서 바로 수정완료 모드로 설정
      setConfirmModeIndex(editTargetIndex);
      setEditTargetIndex(-1);
    }
    setIsEditModalOpen(false);
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
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isDeleteSelectedModalOpen,
    setIsDeleteSelectedModalOpen,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isEditModalOpen,
    setIsEditModalOpen: handleOpenEditModal,
    isWarningModalOpen,
    setIsWarningModalOpen,
    warningMessage,
    deleteTargetIndex,
    toastMessage,
    showToast,
    handleAddRow,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    showToastMessage,
    handleConfirmDelete,
    handleCheck,
    handleDeleteSelected,
    handleSaveAll,
    handleConfirmEdit,
    confirmModeIndex,
    setConfirmMode,
  });
}
