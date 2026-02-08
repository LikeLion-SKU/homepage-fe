import useMediaQuery from '@/hooks/useMediaQuery';

export default function LoginButton({ onClick, disabled = false, children = '로그인' }) {
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className="w-full max-w-2xl bg-[var(--color-button-green)] disabled:bg-[#E9E9E9] flex justify-center items-center text-black disabled:text-[#B0B0B0] text-lg max-[480px]:text-sm font-semibold font-['Pretendard'] relative z-[1] transition-all duration-200 hover:drop-shadow-[3px_4px_0px_rgba(212,212,212,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] disabled:cursor-not-allowed disabled:hover:drop-shadow-none"
      style={{
        border: '1px solid #1a1a1a',
        height: isMobile ? 'calc(2.5rem - 0.25rem)' : 'calc(3.75rem - 0.25rem)', // h-15에서 4px 빼기
      }}
    >
      {children}
    </button>
  );
}
