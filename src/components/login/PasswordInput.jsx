import { useState } from 'react';

export default function PasswordInput({
  value,
  onChange,
  placeholder = '비밀번호를 입력하세요',
  label = '비밀번호',
  hideLabel = false,
  mb = 'mb-4',
  maxWidth = null,
  rightButton = null,
  required = false,
  hideToggle = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  // maxWidth가 숫자면 픽셀 값으로 변환, 문자열이면 Tailwind 클래스로 사용, null이면 전체 너비
  const maxWidthClass = maxWidth === null ? '' : typeof maxWidth === 'number' ? '' : maxWidth;
  const maxWidthStyle =
    maxWidth === null ? {} : typeof maxWidth === 'number' ? { maxWidth: `${maxWidth}px` } : {};

  return (
    <div className={`flex flex-col gap-2 ${mb}`}>
      {!hideLabel && (
        <label className="text-black text-base font-medium font-['Pretendard']">
          {label || '비밀번호'}
          {required && <span className="text-black-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={`flex flex-col sm:flex-row items-stretch sm:items-center ${rightButton ? 'sm:justify-between' : ''} gap-3 sm:gap-4`}
      >
        <div
          className={`relative ${rightButton ? 'w-full sm:w-auto' : 'w-full'} ${maxWidthClass}`}
          style={maxWidthStyle}
        >
          <input
            type={hideToggle ? 'text' : showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full h-14 px-4 py-3 bg-[#FFFFFF] border border-[1px] border-[#B0B0B0] text-black text-base font-['Pretendard'] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] ${hideToggle ? 'pr-4' : 'pr-35'}`}
          />
          {!hideToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B0B0] hover:text-black transition-colors focus:outline-none cursor-pointer z-20 w-8 h-8 flex items-center justify-center"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                // 눈에 슬래시 아이콘 (숨기기)
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                // 눈 아이콘 (보기)
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
        </div>
        {rightButton && <div className="w-full sm:w-auto">{rightButton}</div>}
      </div>
    </div>
  );
}
