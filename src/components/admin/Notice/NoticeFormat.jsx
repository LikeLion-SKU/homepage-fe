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
