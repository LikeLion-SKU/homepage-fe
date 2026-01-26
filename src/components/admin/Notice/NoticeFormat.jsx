// 날짜 포맷팅 함수 (입력 중 자동 포맷팅)
export const formatDateInput = (value) => {
  // 숫자와 점만 허용
  let cleaned = value.replace(/[^0-9.]/g, '');

  // 빈 문자열이면 빈 문자열 반환 (지우기 가능)
  if (cleaned === '') return '';

  // 점 제거하고 숫자만 추출
  const numbersOnly = cleaned.replace(/\./g, '');

  // 숫자가 없으면 빈 문자열 반환
  if (numbersOnly.length === 0) return '';

  // 년도가 4자리 이상이면 포맷팅
  if (numbersOnly.length >= 4) {
    const year = numbersOnly.substring(0, 4);
    const rest = numbersOnly.substring(4);

    if (rest.length === 0) {
      // 년도만 입력된 경우
      return year;
    } else if (rest.length === 1) {
      // 년도 + 월 1자리 (예: 20261 → 2026.1)
      return `${year}.${rest}`;
    } else if (rest.length === 2) {
      // 년도 + 월 2자리 (예: 202610 → 2026.10)
      return `${year}.${rest}`;
    } else if (rest.length === 3) {
      // 년도 + 월 1자리 + 일 2자리 (예: 2026103 → 2026.1.03)
      const month = rest.substring(0, 1);
      const day = rest.substring(1, 3);
      return `${year}.${month}.${day}`;
    } else if (rest.length >= 4) {
      // 년도 + 월 2자리 + 일 2자리 이상 (예: 20261003 → 2026.10.03)
      const month = rest.substring(0, 2);
      const day = rest.substring(2, 4);
      return `${year}.${month}.${day}`;
    }
  }

  // 년도가 4자리 미만이면 숫자만 반환 (점 제거)
  return numbersOnly;
};

// 날짜 저장 시 최종 포맷팅 함수 (YYYY.MM.DD 형식)
export const formatDateForSave = (date) => {
  if (!date) return '';

  // 숫자와 점만 추출
  const numbersOnly = date.replace(/[^0-9]/g, '');

  if (numbersOnly.length < 4) return date; // 년도가 없으면 그대로 반환

  const year = numbersOnly.substring(0, 4);
  const rest = numbersOnly.substring(4);

  if (rest.length === 0) {
    return year;
  } else if (rest.length === 1) {
    // 월 1자리 → 01
    return `${year}.${rest.padStart(2, '0')}`;
  } else if (rest.length === 2) {
    // 월 2자리
    return `${year}.${rest}`;
  } else if (rest.length === 3) {
    // 월 1자리 + 일 2자리 → 01.03
    const month = rest.substring(0, 1).padStart(2, '0');
    const day = rest.substring(1, 3);
    return `${year}.${month}.${day}`;
  } else if (rest.length >= 4) {
    // 월 2자리 + 일 2자리 이상
    const month = rest.substring(0, 2);
    const day = rest.substring(2, 4);
    return `${year}.${month}.${day}`;
  }

  return date;
};

// 날짜 유효성 검사 함수 (YYYY.MM.DD 형식)
export const validateDate = (date) => {
  if (!date || date.trim() === '') return false;

  // YYYY.MM.DD 형식인지 확인
  const datePattern = /^(\d{4})\.(\d{2})\.(\d{2})$/;
  const match = date.match(datePattern);

  if (!match) return false;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  // 월 범위 확인 (1-12)
  if (month < 1 || month > 12) return false;

  // 일 범위 확인 (1-31)
  if (day < 1 || day > 31) return false;

  // 실제 유효한 날짜인지 확인
  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return false;
  }

  return true;
};

// 시간 저장 시 최종 포맷팅 함수 (오전 5:00 형식 보장 - 띄어쓰기 기본값)
export const formatTimeForSave = (time) => {
  if (!time || time.trim() === '') return '';

  // 오전 또는 오후로 시작하는지 확인
  if (time.startsWith('오전') || time.startsWith('오후')) {
    const prefix = time.startsWith('오전') ? '오전' : '오후';
    let rest = time.substring(2);

    // 공백 제거 후 숫자와 콜론만 추출
    rest = rest.replace(/[^0-9:]/g, '');

    // 콜론이 있으면 시간 형식으로 포맷팅
    if (rest.includes(':')) {
      const parts = rest.split(':');
      if (parts.length === 2) {
        const hour = parseInt(parts[0], 10) || 0;
        const minute = parts[1] || '00';
        // 오전/오후 뒤에 공백 추가 (기본값)
        return `${prefix} ${hour}:${minute.padStart(2, '0')}`;
      }
    } else if (rest.length > 0) {
      // 숫자만 있는 경우 시간 형식으로 변환
      const hour = parseInt(rest, 10) || 0;
      // 오전/오후 뒤에 공백 추가 (기본값)
      return `${prefix} ${hour}:00`;
    } else {
      // 오전/오후만 입력된 경우
      return prefix;
    }
  }

  return time;
};

// 시간 유효성 검사 함수 (오전/오후 HH:MM 형식)
export const validateTime = (time) => {
  // 시간이 비어있으면 유효한 것으로 간주 (선택사항)
  if (!time || time.trim() === '') return true;

  // 오전 또는 오후로 시작하는지 확인
  if (!time.startsWith('오전') && !time.startsWith('오후')) return false;

  // 오전/오후 뒤의 부분 추출
  const rest = time.substring(2).trim();

  // HH:MM 형식인지 확인
  const timePattern = /^(\d{1,2}):(\d{2})$/;
  const match = rest.match(timePattern);

  if (!match) return false;

  const hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);

  // 시간 범위 확인 (0-12)
  if (hour < 0 || hour > 12) return false;

  // 분 범위 확인 (0-59)
  if (minute < 0 || minute > 59) return false;

  return true;
};
