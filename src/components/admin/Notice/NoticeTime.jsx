// ISO 날짜 문자열을 프론트엔드 형식으로 변환
export const parseISODateTime = (isoString) => {
  if (!isoString) return { date: '', time: '' };

  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return { date: '', time: '' };

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return {
      date: `${year}.${month}.${day}`,
      time: `${hour}:${minute}`,
    };
  } catch {
    return { date: '', time: '' };
  }
};

// 프론트엔드 날짜/시간 형식을 ISO 형식으로 변환
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

    const date = new Date(year, month - 1, day, hour, minute);
    return date.toISOString();
  } catch {
    return null;
  }
};
