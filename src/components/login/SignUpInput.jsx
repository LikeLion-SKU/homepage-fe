export default function SignUpInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  mb = 'mb-6',
  disabled = false,
  textColor = 'text-black',
  rightButton = null,
  maxWidth = null,
  required = false,
  maxLength = null,
}) {
  const inputClasses = `w-full ${maxWidth || ''} h-14 px-4 py-3 bg-[#FFFFFF] border border-[1px] border-[#B0B0B0] ${textColor} text-base text-left font-['Pretendard'] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] disabled:bg-[#F5F5F5] disabled:cursor-not-allowed`;

  return (
    <div className={`flex flex-col gap-2 ${mb}`}>
      <label className="text-black text-base font-medium font-['Pretendard']">
        {label}
        {required && <span className="text-black-500 ml-1">*</span>}
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div
          className={`relative ${rightButton ? 'w-full sm:w-auto' : 'w-full'} ${maxWidth || ''}`}
        >
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            className={inputClasses}
          />
        </div>
        {rightButton && <div className="w-full sm:w-auto">{rightButton}</div>}
      </div>
    </div>
  );
}
