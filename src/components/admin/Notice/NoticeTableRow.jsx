import { useState } from 'react';

import NoticeButton from '@/components/admin/Notice/NoticeButton';
import {
  formatDateForSave,
  formatDateInput,
  formatTimeForSave,
  validateDate,
  validateTime,
} from '@/components/admin/Notice/NoticeFormat';
import CheckModal from '@/components/common/Modal/CheckModal';

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
  // ordinalNum에서 "기" 제거하고 숫자만 저장
  const getOrdinalNumOnly = (value) => {
    if (!value) return '';
    // "14기" -> "14", "14" -> "14"
    return value.replace(/[^0-9]/g, '');
  };

  const [editData, setEditData] = useState({
    ordinalNum: getOrdinalNumOnly(rowData.ordinalNum),
    publicDate: rowData.publicDate,
    publicTime: rowData.publicTime || '',
    deadline: rowData.deadline,
    deadlineTime: rowData.deadlineTime || '',
    documentDate: rowData.documentDate,
    documentTime: rowData.documentTime || '',
    finalDate: rowData.finalDate,
    finalTime: rowData.finalTime || '',
    interviewDate: rowData.interviewDate || '',
    interviewTime: rowData.interviewTime || '',
  });

  // 각 일정 입력칸의 raw 문자열 상태 (포맷팅 전에 사용자가 입력한 그대로)
  const [publicInput, setPublicInput] = useState(
    `${rowData.publicDate || ''}${rowData.publicTime ? ` ${rowData.publicTime}` : ''}`
  );
  const [deadlineInput, setDeadlineInput] = useState(
    `${rowData.deadline || ''}${rowData.deadlineTime ? ` ${rowData.deadlineTime}` : ''}`
  );
  const [documentInput, setDocumentInput] = useState(
    `${rowData.documentDate || ''}${rowData.documentTime ? ` ${rowData.documentTime}` : ''}`
  );
  const [finalInput, setFinalInput] = useState(
    `${rowData.finalDate || ''}${rowData.finalTime ? ` ${rowData.finalTime}` : ''}`
  );
  const [interviewInput, setInterviewInput] = useState(
    `${rowData.interviewDate || ''}${rowData.interviewTime ? ` ${rowData.interviewTime}` : ''}`
  );

  // 유효성 검사 모달 상태
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [isTimeOrderError, setIsTimeOrderError] = useState(false);
  const [isEmptyFieldError, setIsEmptyFieldError] = useState(false);

  const handleEdit = () => {
    if (isEditing && isConfirmMode) {
      // 수정완료 버튼 클릭 - 유효성 검사 후 저장
      // 공란 체크 - 모든 필수 필드가 채워져 있는지 확인
      const requiredFields = [
        { value: editData.ordinalNum, name: '모집 기수' },
        { value: editData.publicDate, name: '공개일' },
        { value: editData.publicTime, name: '공개일 시간' },
        { value: editData.deadline, name: '마감일' },
        { value: editData.deadlineTime, name: '마감일 시간' },
        { value: editData.documentDate, name: '서류 발표일' },
        { value: editData.documentTime, name: '서류 발표일 시간' },
        { value: editData.interviewDate, name: '면접 일정 확정일' },
        { value: editData.interviewTime, name: '면접 일정 확정일 시간' },
        { value: editData.finalDate, name: '최종 발표일' },
        { value: editData.finalTime, name: '최종 발표일 시간' },
      ];

      const hasEmptyField = requiredFields.some(
        (field) => !field.value || field.value.trim() === ''
      );

      if (hasEmptyField) {
        setIsTimeOrderError(false);
        setIsEmptyFieldError(true);
        setIsValidationModalOpen(true);
        return;
      }

      // 날짜 유효성 검사 (날짜가 입력되어 있으면 유효한 형식이어야 함)
      const dates = [
        { value: editData.publicDate, name: '공개일' },
        { value: editData.deadline, name: '마감일' },
        { value: editData.documentDate, name: '서류 발표일' },
        { value: editData.finalDate, name: '최종 발표일' },
        { value: editData.interviewDate, name: '면접 일정 확정일' },
      ];

      for (const date of dates) {
        // 날짜가 입력되어 있으면 유효성 검사
        if (date.value && date.value.trim() !== '') {
          const formattedDate = formatDateForSave(date.value);
          if (!validateDate(formattedDate)) {
            setIsTimeOrderError(false);
            setIsEmptyFieldError(false);
            setIsValidationModalOpen(true);
            return;
          }
        }
      }

      // 시간 유효성 검사
      const times = [
        { value: editData.publicTime, name: '공개일 시간' },
        { value: editData.deadlineTime, name: '마감일 시간' },
        { value: editData.documentTime, name: '서류 발표일 시간' },
        { value: editData.finalTime, name: '최종 발표일 시간' },
        { value: editData.interviewTime, name: '면접 일정 확정일 시간' },
      ];

      for (const time of times) {
        if (time.value && !validateTime(time.value)) {
          setIsTimeOrderError(false);
          setIsEmptyFieldError(false);
          setIsValidationModalOpen(true);
          return;
        }
      }

      // 시간 순서 유효성 검사
      const toTimestamp = (date, time) => {
        const d = formatDateForSave(date);
        const t = formatTimeForSave(time);
        if (!d || !t) return null;
        const [year, month, day] = d.split('.').map((v) => parseInt(v, 10));
        const [hour, minute] = t.split(':').map((v) => parseInt(v, 10));
        if (
          Number.isNaN(year) ||
          Number.isNaN(month) ||
          Number.isNaN(day) ||
          Number.isNaN(hour) ||
          Number.isNaN(minute)
        ) {
          return null;
        }
        return new Date(year, month - 1, day, hour, minute).getTime();
      };

      const publicTs = toTimestamp(editData.publicDate, editData.publicTime);
      const deadlineTs = toTimestamp(editData.deadline, editData.deadlineTime);
      const documentTs = toTimestamp(editData.documentDate, editData.documentTime);
      const interviewTs = toTimestamp(editData.interviewDate, editData.interviewTime);
      const finalTs = toTimestamp(editData.finalDate, editData.finalTime);

      const ordered = [publicTs, deadlineTs, documentTs, interviewTs, finalTs];

      for (let i = 1; i < ordered.length; i += 1) {
        const prev = ordered[i - 1];
        const curr = ordered[i];
        if (prev !== null && curr !== null && curr < prev) {
          setIsTimeOrderError(true);
          setIsEmptyFieldError(false);
          setIsValidationModalOpen(true);
          return;
        }
      }

      // 모든 유효성 검사 통과 - 저장 (날짜/시간 포맷팅 적용, 기수에 "기" 추가)
      const formattedData = {
        ...editData,
        ordinalNum: editData.ordinalNum ? `${editData.ordinalNum}기` : '',
        publicDate: formatDateForSave(editData.publicDate),
        publicTime: formatTimeForSave(editData.publicTime),
        deadline: formatDateForSave(editData.deadline),
        deadlineTime: formatTimeForSave(editData.deadlineTime),
        documentDate: formatDateForSave(editData.documentDate),
        documentTime: formatTimeForSave(editData.documentTime),
        finalDate: formatDateForSave(editData.finalDate),
        finalTime: formatTimeForSave(editData.finalTime),
        interviewDate: formatDateForSave(editData.interviewDate),
        interviewTime: formatTimeForSave(editData.interviewTime),
      };
      onSave(index, formattedData);
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

  // 단일 입력값을 날짜/시간으로 분리하는 헬퍼 (raw 문자열 기준)
  const parseDateTimeInput = (value) => {
    if (value == null) {
      return { date: '', time: '' };
    }

    // 숫자만 연달아 입력한 패턴 처리 (예: 202504031800 → 2025.04.03 18:00)
    const digitsOnly = value.replace(/\D/g, '');
    // YYYYMMDDHH 또는 YYYYMMDDHHMM 형태일 때만 자동 분리
    if (digitsOnly.length >= 10) {
      const rawDateDigits = digitsOnly.slice(0, 8); // YYYYMMDD
      const rawTimeDigits = digitsOnly.slice(8); // HH 또는 HHMM

      const date = formatDateInput(rawDateDigits);
      const time = rawTimeDigits ? formatTimeForSave(rawTimeDigits) : '';

      return { date, time };
    }

    // 공백 존재 여부로 date/time 분리 시점만 판단
    const hasSpace = /\s/.test(value);
    if (!hasSpace) {
      // 공백이 없으면 전부 날짜로 간주하고 자동 포맷팅
      return { date: formatDateInput(value), time: '' };
    }

    const firstSpaceIndex = value.search(/\s/);
    const rawDate = value.slice(0, firstSpaceIndex);
    const rawTime = value.slice(firstSpaceIndex + 1);

    return {
      date: formatDateInput(rawDate),
      time: rawTime,
    };
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
              onChange={(e) => {
                // 숫자만 입력 가능
                const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                setEditData({ ...editData, ordinalNum: numbersOnly });
              }}
              className="w-24 h-10 border text-center focus:outline-none"
              placeholder="모집 기수"
            />
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={publicInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setPublicInput(v);
                  const { date, time } = parseDateTimeInput(v);
                  setEditData({ ...editData, publicDate: date, publicTime: time });
                }}
                className="w-40 h-10 border text-center focus:outline-none"
                placeholder="공개일 YYYY.MM.DD HH:MM"
              />
            </div>
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={deadlineInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setDeadlineInput(v);
                  const { date, time } = parseDateTimeInput(v);
                  setEditData({ ...editData, deadline: date, deadlineTime: time });
                }}
                className="w-40 h-10 border text-center focus:outline-none"
                placeholder="마감일 YYYY.MM.DD HH:MM"
              />
            </div>
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={documentInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setDocumentInput(v);
                  const { date, time } = parseDateTimeInput(v);
                  setEditData({ ...editData, documentDate: date, documentTime: time });
                }}
                className="w-40 h-10 border text-center focus:outline-none"
                placeholder="서류 발표일 YYYY.MM.DD HH:MM"
              />
            </div>
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={interviewInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setInterviewInput(v);
                  const { date, time } = parseDateTimeInput(v);
                  setEditData({ ...editData, interviewDate: date, interviewTime: time });
                }}
                className="w-40 h-10 border text-center focus:outline-none"
                placeholder="면접 일정 확정일 YYYY.MM.DD HH:MM"
              />
            </div>
            <div className="flex gap-2 items-center w-40">
              <input
                type="text"
                value={finalInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setFinalInput(v);
                  const { date, time } = parseDateTimeInput(v);
                  setEditData({ ...editData, finalDate: date, finalTime: time });
                }}
                className="w-40 h-10 border text-center focus:outline-none"
                placeholder="최종 발표일 YYYY.MM.DD HH:MM"
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
              {formatDateTime(rowData.interviewDate, rowData.interviewTime)}
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
      {/* 유효성 검사 모달 */}
      <CheckModal
        isOpen={isValidationModalOpen}
        cancel={() => {
          setIsValidationModalOpen(false);
          setIsTimeOrderError(false);
          setIsEmptyFieldError(false);
        }}
      >
        {isEmptyFieldError
          ? '일정을 모두 채워주세요.'
          : isTimeOrderError
            ? '올바른 날짜와 시간대로 수정해주세요.'
            : '수정이 완료되지 않았습니다.'}
      </CheckModal>
    </div>
  );
}
