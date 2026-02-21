import useMediaQuery from '@/hooks/useMediaQuery';

export default function EmailInput({
  value,
  onChange,
  placeholder = 'abc1234',
  mb = 'mb-6',
  rightButton = null,
  disabled = false,
  textColor = 'text-black',
}) {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
  const borderColor = disabled
    ? 'border-[#B0B0B0]'
    : value && value.trim()
      ? 'border-[#1A1A1A]'
      : 'border-[#B0B0B0]';
  return (
    <div className={`flex flex-col gap-2 ${mb}`}>
      <label className="text-black text-sm sm:text-base font-medium font-['Pretendard']">
        이메일
      </label>
      <div className="flex flex-row items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5 sm:gap-4 flex-1 min-w-0">
          <input
            type="email"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full max-w-[280px] px-3 sm:px-4 max-[480px]:px-2.5 py-2.5 sm:py-3 max-[480px]:py-2 bg-[#FAFBF8] border border-[1px] ${borderColor} ${textColor} text-sm sm:text-base max-[480px]:text-xs text-left font-['Pretendard'] focus:outline-none focus:border-[#1A1A1A] focus:ring-0`}
            style={{
              minWidth: 0,
              height: isMobile
                ? 'calc(2.5rem - 0.25rem)' // max-[480px]:h-10에서 4px 빼기
                : isSmallScreen
                  ? 'calc(3rem - 0.25rem)' // h-12에서 4px 빼기
                  : 'calc(3.5rem - 0.25rem)', // sm:h-14에서 4px 빼기
            }}
          />
          <span className="text-[#B0B0B0] text-sm sm:text-base font-['Pretendard'] whitespace-nowrap">
            @skuniv.ac.kr
          </span>
        </div>
        {rightButton && <div className="flex-shrink-0">{rightButton}</div>}
      </div>
    </div>
  );
}
