import useMediaQuery from '@/hooks/useMediaQuery';

export default function VerificationButton({
  onClick,
  disabled = false,
  text = '인증번호 전송',
  isActive = false,
  isResend = false,
}) {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  // 재전송 상태일 때 배경색 #CFD6A9
  const bgColor = isResend ? '#CFD6A9' : isActive ? '#00156A' : '#B0B0B0';
  const textColor = isResend ? '#1A1A1A' : isActive ? '#E9E9E9' : '#1A1A1A';
  const borderColor = isResend ? '#1A1A1A' : isActive ? '#00156A' : '#1A1A1A';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-2 sm:px-2 max-[480px]:px-1.5 py-2.5 sm:py-3 max-[480px]:py-2 text-sm sm:text-base max-[480px]:text-xs font-['Pretendard'] font-medium hover:opacity-80 transition-all focus:outline-none whitespace-nowrap w-[120px] sm:w-[160px] max-[480px]:w-[96px] min-w-[120px] sm:min-w-[160px] max-[480px]:min-w-[96px] max-w-[120px] sm:max-w-[160px] max-[480px]:max-w-[96px] flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        height: isMobile
          ? 'calc(2.5rem - 0.25rem)' // max-[480px]:h-10에서 4px 빼기
          : isSmallScreen
            ? 'calc(3rem - 0.25rem)' // h-12에서 4px 빼기
            : 'calc(3.5rem - 0.25rem)', // sm:h-14에서 4px 빼기
      }}
    >
      {text}
    </button>
  );
}
