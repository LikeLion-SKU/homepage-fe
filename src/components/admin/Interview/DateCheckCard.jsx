import InterviewDateBox from '@/components/admin/Interview/InterviewDateBox';

export default function DateCheckCard() {
  return (
    <div className="flex justify-between px-5 gap-5">
      <p className="text-[1.1rem] font-bold">26.03.08</p>
      <div className="flex flex-col gap-4">
        <InterviewDateBox />
        <InterviewDateBox />
        <InterviewDateBox />
      </div>
    </div>
  );
}
