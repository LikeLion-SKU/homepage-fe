export default function VerificationButton({
  onClick,
  disabled = false,
  text = '인증번호 전송',
  isActive = false,
}) {
  const bgColor = isActive ? '#00156A' : '#B0B0B0';
  const textColor = isActive ? '#E9E9E9' : '#1A1A1A';
  const borderColor = isActive ? '#00156A' : '#1A1A1A';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-14 px-4 py-3 text-base font-['Pretendard'] font-medium hover:opacity-80 transition-all focus:outline-none whitespace-nowrap"
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
