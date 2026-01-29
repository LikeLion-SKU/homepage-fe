export default function LoginButton({ onClick, disabled = false, children = '로그인' }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className="w-full max-w-2xl h-15 max-[380px]:h-10 bg-[var(--color-button-green)] flex justify-center items-center text-black text-lg max-[380px]:text-sm font-semibold font-['Pretendard'] relative z-[1] transition-all duration-200 hover:drop-shadow-[3px_4px_0px_rgba(212,212,212,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] disabled:cursor-not-allowed"
      style={{ border: '1px solid #1a1a1a' }}
    >
      {children}
    </button>
  );
}
