import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { getAdminForm, getAllAdminForms, putAdminForm } from '@/api/applicationForm';

import { convertToISOString, parseISODateTime } from './NoticeTime';

// 날짜 문자열(YYYY.MM.DD)과 시간 문자열(HH:MM)을 Date 객체로 변환
const parseDateTimeToDate = (dateStr, timeStr) => {
  if (!dateStr) return null;

  try {
    const [year, month, day] = dateStr.split('.').map((v) => parseInt(v, 10));
    let hour = 9;
    let minute = 0;

    if (timeStr) {
      const [h, m] = timeStr.split(':').map((v) => parseInt(v, 10));
      if (!Number.isNaN(h)) hour = h;
      if (!Number.isNaN(m)) minute = m;
    }

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      return null;
    }

    return new Date(year, month - 1, day, hour, minute);
  } catch {
    return null;
  }
};

// 기간 겹침 검증 함수
// 두 기간이 겹치는지 확인: (시작일1 ~ 최종발표일1)과 (시작일2 ~ 최종발표일2)
const isOverlapping = (start1, end1, start2, end2) => {
  // 기간이 겹치지 않으려면: end1 < start2 또는 end2 < start1
  // 겹치려면: !(end1 < start2 || end2 < start1) = end1 >= start2 && end2 >= start1
  return end1 >= start2 && end2 >= start1;
};

// 기본값 생성 함수 (기수 14기 고정, 현재 시간부터 +1일씩 순차)
// 날짜 순서 제약: openAt < closeAt ≤ applicationResultAt ≤ interviewScheduleConfirmedAt ≤ finalResultAt
// 기존 공고의 기간과 겹치지 않도록 새 공고 시작
const generateDefaultFormData = (existingData) => {
  // 기존 데이터에서 가장 늦은 최종 발표일과 시작일 찾기
  let latestFinalDate = null;
  let latestStartDate = null;

  existingData.forEach((row) => {
    if (row.finalDate) {
      const finalDate = parseDateTimeToDate(row.finalDate, row.finalTime);
      if (finalDate && (!latestFinalDate || finalDate > latestFinalDate)) {
        latestFinalDate = finalDate;
      }
    }
    if (row.publicDate) {
      const startDate = parseDateTimeToDate(row.publicDate, row.publicTime);
      if (startDate && (!latestStartDate || startDate > latestStartDate)) {
        latestStartDate = startDate;
      }
    }
  });

  // 기존 공고의 최종 발표일 이후로 새 공고 시작 (최소 1일 후)
  let startDate;
  if (latestFinalDate) {
    startDate = new Date(latestFinalDate);
    startDate.setDate(startDate.getDate() + 1); // 최종 발표일 다음날
    startDate.setHours(9, 0, 0, 0); // 09:00으로 설정
  } else {
    // 기존 공고가 없으면 현재 시간부터 시작
    startDate = new Date();
    startDate.setHours(9, 0, 0, 0);
  }

  // openAt: 시작 날짜 (모집 시작 일시)
  const openAt = new Date(startDate);

  // closeAt: openAt + 1일 (openAt < closeAt 보장)
  const closeAt = new Date(openAt);
  closeAt.setDate(closeAt.getDate() + 1);

  // applicationResultAt: closeAt + 1일 (closeAt ≤ applicationResultAt 보장)
  const applicationResultAt = new Date(closeAt);
  applicationResultAt.setDate(applicationResultAt.getDate() + 1);

  // interviewScheduleConfirmedAt: applicationResultAt + 1일 (applicationResultAt ≤ interviewScheduleConfirmedAt 보장)
  const interviewScheduleConfirmedAt = new Date(applicationResultAt);
  interviewScheduleConfirmedAt.setDate(interviewScheduleConfirmedAt.getDate() + 1);

  // finalResultAt: interviewScheduleConfirmedAt + 1일 (interviewScheduleConfirmedAt ≤ finalResultAt 보장)
  const finalResultAt = new Date(interviewScheduleConfirmedAt);
  finalResultAt.setDate(finalResultAt.getDate() + 1);

  // 기존 공고와의 기간 겹침 검증
  if (existingData.length > 0) {
    for (const row of existingData) {
      if (row.publicDate && row.finalDate) {
        const existingStart = parseDateTimeToDate(row.publicDate, row.publicTime);
        const existingEnd = parseDateTimeToDate(row.finalDate, row.finalTime);

        if (existingStart && existingEnd) {
          if (isOverlapping(openAt, finalResultAt, existingStart, existingEnd)) {
            // 겹치는 경우, 기존 공고의 최종 발표일 이후로 새 공고 시작일 조정
            const adjustedStart = new Date(existingEnd);
            adjustedStart.setDate(adjustedStart.getDate() + 1);
            adjustedStart.setHours(9, 0, 0, 0);

            // 조정된 시작일로 다시 계산
            const newOpenAt = new Date(adjustedStart);
            const newCloseAt = new Date(newOpenAt);
            newCloseAt.setDate(newCloseAt.getDate() + 1);
            const newApplicationResultAt = new Date(newCloseAt);
            newApplicationResultAt.setDate(newApplicationResultAt.getDate() + 1);
            const newInterviewScheduleConfirmedAt = new Date(newApplicationResultAt);
            newInterviewScheduleConfirmedAt.setDate(newInterviewScheduleConfirmedAt.getDate() + 1);
            const newFinalResultAt = new Date(newInterviewScheduleConfirmedAt);
            newFinalResultAt.setDate(newFinalResultAt.getDate() + 1);

            return {
              semester: 14,
              openAt: newOpenAt.toISOString(),
              closeAt: newCloseAt.toISOString(),
              applicationResultAt: newApplicationResultAt.toISOString(),
              interviewScheduleConfirmedAt: newInterviewScheduleConfirmedAt.toISOString(),
              finalResultAt: newFinalResultAt.toISOString(),
            };
          }
        }
      }
    }
  }

  // 날짜 순서 검증
  if (
    openAt >= closeAt ||
    closeAt > applicationResultAt ||
    applicationResultAt > interviewScheduleConfirmedAt ||
    interviewScheduleConfirmedAt > finalResultAt
  ) {
    console.error('날짜 순서 제약 조건 위반');
  }

  return {
    semester: 14, // 기수 14기로 고정
    openAt: openAt.toISOString(),
    closeAt: closeAt.toISOString(),
    applicationResultAt: applicationResultAt.toISOString(),
    interviewScheduleConfirmedAt: interviewScheduleConfirmedAt.toISOString(),
    finalResultAt: finalResultAt.toISOString(),
  };
};

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

  const handleAddRow = async () => {
    try {
      // 서버에서 기존 공고 목록 가져오기
      const existingForms = await getAllAdminForms();

      // 서버 응답을 프론트엔드 형식으로 변환
      const existingDataForComparison = existingForms.map((form) =>
        convertServerResponseToRowData(form)
      );

      // 기본값 생성 (기수 14기 고정, 기존 공고의 최종 발표일 이후로 시작)
      const defaultFormData = generateDefaultFormData(existingDataForComparison);

      // API 호출로 새 지원 일정 폼 생성
      const serverData = await getAdminForm(defaultFormData);

      if (!serverData) {
        showToast('지원 일정 생성에 실패했습니다.');
        return;
      }

      // 서버 응답을 프론트엔드 형식으로 변환
      const newRow = convertServerResponseToRowData(serverData);

      setNoticeData((prev) => [newRow, ...prev]);
      // 생성 후에는 읽기 전용 상태로 유지 (수정 버튼을 눌러야 수정 가능)
      setEditingIndex(-1);
      showToast('새 지원 일정이 생성되었습니다.');
    } catch (err) {
      console.error('지원 일정 생성 실패:', err);
      showToast('지원 일정 생성에 실패했습니다.');
    }
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
      // ID가 없으면 새로 생성된 공고이므로 수정 API 호출 불필요
      setNoticeData((prev) => {
        const newData = [...prev];
        newData[index] = editData;
        return newData;
      });
      setEditingIndex(-1);
      showToast('수정이 완료되었습니다.');
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

      // 서버 응답을 프론트엔드 형식으로 변환
      const updatedRow = convertServerResponseToRowData(serverData);

      setNoticeData((prev) => {
        const newData = [...prev];
        newData[index] = updatedRow;
        return newData;
      });
      setEditingIndex(-1);
      showToast('수정이 완료되었습니다.');
    } catch (err) {
      console.error('지원 일정 수정 실패:', err);
      showToast('지원 일정 수정에 실패했습니다.');
    }
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
