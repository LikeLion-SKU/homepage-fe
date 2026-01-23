export default function TimeBar() {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[1.25rem] ">3월 10일 [월요일]</p>
      <div className="flex gap-4">
        <button
          className={`flex w-41 h-13 text-center justify-center items-center border bg-[#F9F9F9] text-[1.1rem]`}
        >
          18:00 <span className="inline-block h-px w-5 bg-black mx-1"></span> 18:30
        </button>
        <button
          className={`flex w-41 h-13 text-center justify-center items-center border bg-[#F9F9F9] text-[1.1rem]`}
        >
          18:00 <span className="inline-block h-px w-5 bg-black mx-1"></span> 18:30
        </button>
        <button
          className={`flex w-41 h-13 text-center justify-center items-center border bg-[#F9F9F9] text-[1.1rem]`}
        >
          18:00 <span className="inline-block h-px w-5 bg-black mx-1"></span> 18:30
        </button>
        <button
          className={`flex w-41 h-13 text-center justify-center items-center border bg-[#F9F9F9] text-[1.1rem]`}
        >
          18:00 <span className="inline-block h-px w-5 bg-black mx-1"></span> 18:30
        </button>
      </div>
    </div>
  );
}
