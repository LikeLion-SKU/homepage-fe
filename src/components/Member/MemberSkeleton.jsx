export default function MemberSkeleton() {
  return (
    <div className="w-38 h-54 pad:w-54 pad:h-80 web:w-59 border animate-pulse bg-white">
      <div className="h-37 pad:h-54 bg-[#B0B0B0]"></div>
      <div className="flex flex-col px-5 py-3 pad:px-6 pad:py-4.5 gap-3 pad:gap-2">
        <div className="w-10 pad:w-15 h-3 pad:h-5 rounded-2xl bg-[#B0B0B0]" />
        <div className="w-15 pad:w-30 h-3 pad:h-5 rounded-2xl bg-[#B0B0B0]" />
      </div>
    </div>
  );
}
