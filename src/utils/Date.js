// 마감일 지났는지 여부 반환하는 함수
export const checkExpired = (deadlineString) => {
  const now = new Date();
  const deadline = new Date(deadlineString);
  return now > deadline;
};

// openAt ~ closeAt 기간 안에 있는지 확인 (기간 내면 true)
export const isWithinPeriod = (openAt, closeAt) => {
  const now = new Date();
  const open = new Date(openAt);
  const close = new Date(closeAt);
  return now >= open && now <= close;
};

// 백엔드에서 보내주는 시간 -> 일반적인 방식으로 포멧팅
export const formatDeadline = (deadlineString) => {
  const date = new Date(deadlineString);

  const formatted = date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formatted
    .replace(/\.\s*/g, '.')
    .replace(/\.(\d{2}:)/, ' $1')
    .trim();
};
