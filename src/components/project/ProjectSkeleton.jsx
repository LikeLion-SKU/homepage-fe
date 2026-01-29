export default function ProjectSkeleton() {
  return (
    <div className="w-101 h-86 border animate-pulse bg-[#F9F9F9]">
      <div className="h-54 bg-[#B0B0B0]" />
      <div className="flex flex-col w-101 h-29 px-5 py-7 gap-3">
        <div className="flex justify-between items-center">
          <div className="w-40 h-5 rounded-2xl bg-[#B0B0B0]" />
          <div className="flex gap-3">
            <div className="w-10 h-5 rounded-2xl bg-[#B0B0B0]" />
            <div className="w-10 h-5 rounded-2xl bg-[#B0B0B0]" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-90 h-5 rounded-2xl bg-[#B0B0B0]" />
          <div className="w-45 h-5 rounded-2xl bg-[#B0B0B0]" />
        </div>
      </div>
    </div>
  );
}
