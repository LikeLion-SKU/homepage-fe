export default function EmailInput({
  value,
  onChange,
  placeholder = '이메일을 입력하세요',
  mb = 'mb-6',
  rightButton = null,
}) {
  return (
    <div className={`flex flex-col gap-2 ${mb}`}>
      <label className="text-black text-base font-medium font-['Pretendard']">이메일</label>
      <div className="flex items-center gap-4">
        <input
          type="email"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full max-w-[280px] h-14 px-4 py-3 bg-[#FFFFFF] border border-[1px] border-[#B0B0B0] text-black text-base font-['Pretendard'] focus:outline-none focus:ring-2]"
        />
        <span className="text-[#B0B0B0] text-lg font-['Pretendard']">@skuniv.ac.kr</span>
        {rightButton}
      </div>
    </div>
  );
}
