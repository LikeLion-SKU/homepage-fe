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
      <label className="text-black text-base font-medium font-['Pretendard']">이메일</label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <input
            type="email"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full sm:max-w-[280px] h-14 px-4 py-3 bg-[#FFFFFF] border border-[1px] border-[#B0B0B0] ${textColor} text-base text-left font-['Pretendard'] focus:outline-none focus:ring-2]`}
          />
          <span className="text-[#B0B0B0] text-base sm:text-lg font-['Pretendard'] whitespace-nowrap">
            @skuniv.ac.kr
          </span>
        </div>
        {rightButton && <div className="w-full sm:w-auto">{rightButton}</div>}
      </div>
    </div>
  );
}
