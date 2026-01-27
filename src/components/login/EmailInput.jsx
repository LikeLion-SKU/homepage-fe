export default function EmailInput({
  value,
  onChange,
  placeholder = 'abc1234',
  mb = 'mb-6',
  rightButton = null,
  disabled = false,
  textColor = 'text-black',
}) {
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
            className={`w-full sm:max-w-[280px] h-12 sm:h-14 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#FFFFFF] border border-[1px] border-[#B0B0B0] ${textColor} text-sm sm:text-base text-left font-['Pretendard'] focus:outline-none focus:ring-2]`}
            style={{ minWidth: 0 }}
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
