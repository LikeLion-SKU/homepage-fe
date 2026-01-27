export default function VerificationButton({
  onClick,
  disabled = false,
  text = '인증번호 전송',
  isActive = false,
  isResend = false,
}) {
  // 재전송 상태일 때 배경색 #CFD6A9
  const bgColor = isResend ? '#CFD6A9' : isActive ? '#00156A' : '#B0B0B0';
  const textColor = isResend ? '#1A1A1A' : isActive ? '#E9E9E9' : '#1A1A1A';
  const borderColor = isResend ? '#1A1A1A' : isActive ? '#00156A' : '#1A1A1A';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-12 sm:h-14 px-2 sm:px-2 py-2.5 sm:py-3 text-sm sm:text-base font-['Pretendard'] font-medium hover:opacity-80 transition-all focus:outline-none whitespace-nowrap w-[120px] sm:w-[160px] min-w-[120px] sm:min-w-[160px] max-w-[120px] sm:max-w-[160px] flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      {text}
    </button>
  );
}
