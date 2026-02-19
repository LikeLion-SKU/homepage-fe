import { useEffect, useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

export default function PasswordInput({
  value,
  onChange,
  onBlur = undefined,
  placeholder = '비밀번호를 입력하세요',
  label = '비밀번호',
  hideLabel = false,
  mb = 'mb-4',
  maxWidth = null,
  rightButton = null,
  required = false,
  hideToggle = false,
  disabled = false,
  defaultShowPassword = true,
  isSuccess = false,
}) {
  const [showPassword, setShowPassword] = useState(defaultShowPassword);

  // defaultShowPassword prop이 변경되면 상태 업데이트
  useEffect(() => {
    setShowPassword(defaultShowPassword);
  }, [defaultShowPassword]);

  // value가 비어있을 때는 항상 defaultShowPassword 상태로 리셋
  useEffect(() => {
    if (!value) {
      setShowPassword(defaultShowPassword);
    }
  }, [value, defaultShowPassword]);
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

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
        <label className="text-black text-sm sm:text-base font-medium font-['Pretendard']">
          {label || '비밀번호'}
          {required && <span className="text-[#FF7D56] ml-1">*</span>}
        </label>
      )}
      <div
        className={`flex flex-row items-center ${rightButton ? 'sm:justify-between' : ''} gap-2 sm:gap-4`}
      >
        <div
          className={`relative flex-1 min-w-0 ${rightButton ? 'sm:w-auto' : 'w-full'} ${maxWidthClass}`}
          style={maxWidthStyle}
        >
          <input
            type={hideToggle ? 'text' : showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-3 sm:px-4 max-[480px]:px-2.5 py-2.5 sm:py-3 max-[480px]:py-2 ${disabled ? 'bg-[#F5F5F5]' : 'bg-[#FAFBF8]'} border border-[1px] ${isSuccess ? 'border-[#1A1A1A]' : 'border-[#B0B0B0]'} ${disabled ? 'text-[#D3D3D3]' : 'text-black'} text-sm sm:text-base max-[480px]:text-xs font-['Pretendard'] focus:outline-none focus:border-[#1A1A1A] focus:ring-0 disabled:cursor-not-allowed ${hideToggle ? 'pr-3 sm:pr-4 max-[480px]:pr-2.5' : 'pr-35'}`}
            style={{
              minWidth: 0,
              height: isMobile
                ? 'calc(2.5rem - 0.25rem)' // max-[480px]:h-10에서 4px 빼기
                : isSmallScreen
                  ? 'calc(3rem - 0.25rem)' // h-12에서 4px 빼기
                  : 'calc(3.5rem - 0.25rem)', // sm:h-14에서 4px 빼기
            }}
          />
          {!hideToggle && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-[#B0B0B0] hover:text-black transition-colors focus:outline-none cursor-pointer z-20 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                // 눈 아이콘 (작대기 없음) - 비밀번호 보임
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
              ) : (
                // 눈 아이콘 (작대기 있음) - 비밀번호 숨김
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
              )}
            </button>
          )}
        </div>
        {rightButton && <div className="flex-shrink-0">{rightButton}</div>}
      </div>
    </div>
  );
}
