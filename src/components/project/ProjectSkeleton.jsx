export default function ProjectSkeleton() {
  return (
    <div className="border animate-pulse bg-[#F9F9F9]">
      <div className="h-23 pad:h-46 web:h-55 w-41 pad:w-82 web:w-101 bg-[#B0B0B0]" />

      <div className="flex flex-col p-2 pad:px-5 pad:py-6 web:py-6.5 gap-0.5 pad:gap-2 web:gap-3">
        <div className="flex justify-between items-center">
          <div className="w-10 pad:w-20 web:w-40 h-3 pad:h-4 web:h-5 rounded-2xl bg-[#B0B0B0]" />
          <div className="flex gap-1 pad:gap-3">
            <div className="w-5 pad:w-10 h-3 pad:h-4 rounded-2xl bg-[#B0B0B0]" />
            <div className="w-5 pad:w-10 h-3 pad:h-4 rounded-2xl bg-[#B0B0B0]" />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="w-30 pad:w-70 web:w-90 h-2 pad:h-4 web:h-5 rounded-2xl bg-[#B0B0B0]" />
          <div className="w-15 pad:w-45 h-2 pad:h-4 web:h-5 rounded-2xl bg-[#B0B0B0]" />
        </div>
      </div>
    </div>
  );
}
