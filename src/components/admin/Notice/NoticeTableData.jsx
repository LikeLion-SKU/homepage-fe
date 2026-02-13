import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import {
  deleteAdminForm,
  getAdminForm,
  getAllAdminForms,
  putAdminForm,
} from '@/api/applicationForm';

import { convertToISOString, parseISODateTime } from './NoticeTime';

// 프론트엔드 rowData를 서버 요청 형식으로 변환
const convertRowDataToServerFormat = (rowData) => {
  // ordinalNum에서 숫자만 추출 (예: "14기" -> 14)
  const semester = rowData.ordinalNum
    ? parseInt(rowData.ordinalNum.replace(/[^0-9]/g, ''), 10)
    : null;

  return {
    semester: semester || undefined,
    openAt: convertToISOString(rowData.publicDate, rowData.publicTime),
    closeAt: convertToISOString(rowData.deadline, rowData.deadlineTime),
    applicationResultAt: convertToISOString(rowData.documentDate, rowData.documentTime),
    interviewScheduleConfirmedAt: convertToISOString(rowData.interviewDate, rowData.interviewTime),
    finalResultAt: convertToISOString(rowData.finalDate, rowData.finalTime),
  };
};

// 서버 응답을 프론트엔드 rowData 형식으로 변환
const convertServerResponseToRowData = (serverData) => {
  if (!serverData) {
    return {
      id: null,
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
  }

  const openAt = parseISODateTime(serverData.openAt);
  const closeAt = parseISODateTime(serverData.closeAt);
  const applicationResultAt = parseISODateTime(serverData.applicationResultAt);
  const interviewScheduleConfirmedAt = parseISODateTime(serverData.interviewScheduleConfirmedAt);
  const finalResultAt = parseISODateTime(serverData.finalResultAt);

  return {
    id: serverData.id || serverData.applicationFormId || null,
    ordinalNum: serverData.semester ? `${serverData.semester}기` : '',
    publicDate: openAt.date,
    publicTime: openAt.time,
    deadline: closeAt.date,
    deadlineTime: closeAt.time,
    documentDate: applicationResultAt.date,
    documentTime: applicationResultAt.time,
    interviewDate: interviewScheduleConfirmedAt.date,
    interviewTime: interviewScheduleConfirmedAt.time,
    finalDate: finalResultAt.date,
    finalTime: finalResultAt.time,
  };
};

export default function NoticeTableData({ children }) {
  // RootLayout의 모달/토스트 기능 사용
  const context = useOutletContext();
  // @ts-ignore
  const openModal = context?.openModal || (() => {});
  // @ts-ignore
  const showToast = context?.showToast || (() => {});
  const [noticeData, setNoticeData] = useState([]);

  const [editingIndex, setEditingIndex] = useState(-1);
  const [checkedList, setCheckedList] = useState([]);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(-1);
  const [confirmModeIndex, setConfirmModeIndex] = useState(-1);

  // 페이지 로드 시 서버에서 기존 공고 목록 가져오기
  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const existingForms = await getAllAdminForms();

        if (existingForms && existingForms.length > 0) {
          // 서버 응답을 프론트엔드 형식으로 변환
          const convertedData = existingForms.map((form) => convertServerResponseToRowData(form));

          setNoticeData(convertedData);
        }
      } catch (err) {
        console.error('지원 일정 목록 조회 실패:', err);
      }
    };

    fetchNoticeData();
  }, []);

  const handleAddRow = () => {
    // 빈 행 추가 (모든 값이 비어있음)
    const emptyRow = {
      id: null,
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

    setNoticeData((prev) => [emptyRow, ...prev]);
    // 새 행을 수정 모드로 설정하고 생성 완료 모드로 설정
    setEditingIndex(0);
    setConfirmModeIndex(0);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = async (index, editData) => {
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

    // 현재 행의 ID 확인 (서버에 저장된 공고인지 확인)
    const currentRow = noticeData[index];
    const applicationFormId = currentRow?.id;

    if (!applicationFormId) {
      // ID가 없으면 새로 생성할 공고이므로 생성 API 호출
      const serverFormData = convertRowDataToServerFormat(editData);

      try {
        // POST API 호출로 새 지원 일정 폼 생성
        const serverData = await getAdminForm(serverFormData);

        if (!serverData) {
          showToast('지원 일정 생성에 실패했습니다.');
          return;
        }

        // 입력한 값을 그대로 사용 (백엔드 응답의 시간 변환 없이)
        // 백엔드 응답에서 ID만 가져와서 입력한 값과 병합
        const newRow = {
          ...editData,
          id: serverData.id || serverData.applicationFormId || null,
        };

        setNoticeData((prev) => {
          const newData = [...prev];
          newData[index] = newRow;
          return newData;
        });
        setEditingIndex(-1);
        setConfirmModeIndex(-1);
        showToast('새 지원 일정이 생성되었습니다.');
      } catch (err) {
        console.error('지원 일정 생성 실패:', err);
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          '지원 일정 생성에 실패했습니다.';

        showToast(errorMessage);
        // 에러 발생 시 생성 완료 버튼 유지 (setConfirmModeIndex 호출하지 않음)
        // 에러를 throw하여 NoticeTableRow에서 감지할 수 있도록 함
        throw err;
      }
      return;
    }

    // 서버 요청 형식으로 변환
    const serverFormData = convertRowDataToServerFormat(editData);

    try {
      // PUT API 호출
      const serverData = await putAdminForm(applicationFormId, serverFormData);

      if (!serverData) {
        showToast('지원 일정 수정에 실패했습니다.');
        return;
      }

      // 입력한 값을 그대로 사용 (백엔드 응답의 시간 변환 없이)
      // 백엔드 응답에서 ID만 가져와서 입력한 값과 병합
      const updatedRow = {
        ...editData,
        id: serverData.id || serverData.applicationFormId || applicationFormId,
      };

      setNoticeData((prev) => {
        const newData = [...prev];
        newData[index] = updatedRow;
        return newData;
      });
      setEditingIndex(-1);
      setConfirmModeIndex(-1);
      showToast('수정이 완료되었습니다.');
    } catch (err) {
      console.error('지원 일정 수정 실패:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        '지원 일정 수정에 실패했습니다.';

      showToast(errorMessage);
      // 에러 발생 시 수정 완료 버튼 유지 (setConfirmModeIndex 호출하지 않음)
      // 에러를 throw하여 NoticeTableRow에서 감지할 수 있도록 함
      throw err;
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  // 삭제 API 호출 공통 함수
  const deleteItems = async (applicationFormIds) => {
    if (applicationFormIds.length === 0) return true;

    try {
      await Promise.all(applicationFormIds.map((id) => deleteAdminForm(id)));
      return true;
    } catch (error) {
      console.error('지원 일정 삭제 실패:', error);
      const errorStatus = error?.response?.status;
      if (errorStatus === 409) {
        showToast('등록된 지원서 질문이 있는 모집 공고는 삭제할 수 없습니다.');
      } else {
        showToast('삭제에 실패했습니다.');
      }
      return false;
    }
  };

  const handleDelete = async (index) => {
    setDeleteTargetIndex(index);
    openModal('해당 공고를 삭제하시겠습니까?', async () => {
      if (deleteTargetIndex !== -1) {
        const targetRow = noticeData[deleteTargetIndex];
        const applicationFormId = targetRow?.id;

        // 서버에 저장된 공고인 경우에만 API 호출
        if (applicationFormId) {
          const success = await deleteItems([applicationFormId]);
          if (!success) {
            setDeleteTargetIndex(-1);
            return;
          }
        }

        // 로컬 상태 업데이트
        setNoticeData((prev) => prev.filter((_, idx) => idx !== deleteTargetIndex));
        if (editingIndex === deleteTargetIndex) {
          setEditingIndex(-1);
        } else if (editingIndex > deleteTargetIndex) {
          setEditingIndex(editingIndex - 1);
        }
        setDeleteTargetIndex(-1);
        showToast('삭제되었습니다.');
      }
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

  const handleDeleteSelected = async () => {
    const applicationFormIds = checkedList
      .map((idx) => noticeData[idx]?.id)
      .filter((id) => id != null);

    // 삭제 API 호출
    const success = await deleteItems(applicationFormIds);
    if (!success) return;

    // 로컬 상태 업데이트
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
