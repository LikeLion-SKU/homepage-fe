export default function StatusMessage({ title, content }) {
  return (
    <div className="flex flex-col items-center gap-16">
      {/* 타이틀과 본문 사이 간격 */}
      <div className="relative inline-block">
        {/* 네 모서리의 검은색 박스 점들 */}
        {/* 좌상단 */}
        <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-zinc-900" />
        {/* 우상단 */}
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-zinc-900" />
        {/* 좌하단 */}
        <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-zinc-900" />
        {/* 우하단 */}
        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-zinc-900" />

        {/* 메인 타이틀 박스 */}
        <div className="px-8 py-3 border border-black bg-white flex justify-center items-center">
          <h1 className="text-center text-4xl font-bold font-['Pretendard'] text-zinc-900 leading-none">
            {title}
          </h1>
        </div>
      </div>
      {/* 본문 내용 */}
      <div className="text-center whitespace-pre-wrap font-medium font-['Pretendard'] text-lg text-stone-600 leading-relaxed">
        {content}
      </div>
    </div>
  );
}
