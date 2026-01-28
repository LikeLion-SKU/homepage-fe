// 마감일 지났는지 여부 반환하는 함수
export const checkExpired = (deadlineString) => {
  const now = new Date();
  const deadline = new Date(deadlineString);
  return now > deadline; // 마감시간 지났으면 false
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
    hour12: true,
  });
  return formatted
    .replace(/\. /g, '.')
    .replace(/\./g, '. ')
    .replace(/\. (?=(오전|오후))/g, ' ');
};
