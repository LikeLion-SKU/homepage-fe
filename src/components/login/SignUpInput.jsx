export default function SignUpInput({
  label,
  value,
  onChange,
  onBlur = undefined,
  type = 'text',
  placeholder = '',
  mb = 'mb-6',
  disabled = false,
  textColor = 'text-black',
  rightButton = null,
  maxWidth = null,
  required = false,
  maxLength = null,
  bgColor = null,
  textAlign = 'left',
}) {
  const bgColorClass = bgColor ? `bg-[${bgColor}]` : disabled ? 'bg-[#F5F5F5]' : 'bg-[#FFFFFF]';
  const textAlignClass =
    textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  const inputClasses = `w-full ${maxWidth || ''} h-14 max-[380px]:h-10 px-4 max-[380px]:px-2.5 py-3 max-[380px]:py-2 ${bgColorClass} border border-[1px] border-[#B0B0B0] ${textColor} text-base max-[380px]:text-xs ${textAlignClass} font-['Pretendard'] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] disabled:cursor-not-allowed`;

  return (
    <div className={`flex flex-col gap-2 ${mb}`}>
      <label className="text-black text-base max-[380px]:text-sm font-medium font-['Pretendard']">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div
          className={`relative ${rightButton ? 'w-full sm:w-auto' : 'w-full'} ${maxWidth || ''}`}
        >
          <input
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            className={inputClasses}
            style={bgColor ? { backgroundColor: bgColor } : {}}
          />
        </div>
        {rightButton && <div className="w-full sm:w-auto">{rightButton}</div>}
      </div>
    </div>
  );
}
