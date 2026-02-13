// 모든 시간을 KST로 처리 (시간대 변환 없이 입력한 시간 그대로)
// ISO 문자열에서 직접 숫자를 추출하여 시간대 변환 방지
export const parseISODateTime = (isoString) => {
  if (!isoString) return { date: '', time: '' };

  try {
    // ISO 문자열 형식: YYYY-MM-DDTHH:mm:ss.sssZ 또는 YYYY-MM-DDTHH:mm:ssZ
    // 문자열에서 직접 숫자를 추출하여 시간대 변환 없이 처리
    const match = isoString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
    if (!match) {
      // 매칭 실패 시 빈 값 반환
      return { date: '', time: '' };
    }

    // ISO 문자열에서 직접 추출 (시간대 변환 없이)
    const year = match[1];
    const month = match[2];
    const day = match[3];
    const hour = match[4];
    const minute = match[5];

    return {
      date: `${year}.${month}.${day}`,
      time: `${hour}:${minute}`,
    };
  } catch {
    return { date: '', time: '' };
  }
};

// 프론트엔드 날짜/시간 형식을 ISO 형식으로 변환
// 모든 시간을 KST로 처리 (UTC 변환 없이 입력한 시간 그대로 저장)
export const convertToISOString = (dateStr, timeStr) => {
  if (!dateStr) return null;

  try {
    const [year, month, day] = dateStr.split('.').map((v) => parseInt(v, 10));
    let hour = 0;
    let minute = 0;

    if (timeStr) {
      const [h, m] = timeStr.split(':').map((v) => parseInt(v, 10));
      if (!Number.isNaN(h)) hour = h;
      if (!Number.isNaN(m)) minute = m;
    }

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      return null;
    }

    // 입력한 시간을 그대로 ISO 문자열로 변환 (UTC 변환 없이)
    // 예: 18:00 입력 → 2025-01-01T18:00:00.000Z 형식으로 저장 (시간대 정보 없이)
    const isoString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`;
    return isoString;
  } catch {
    return null;
  }
};
