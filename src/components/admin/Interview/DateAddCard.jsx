import TimeBar from '@/components/admin/Interview/TimeBar';

export default function DateAddCard() {
  return (
    <div className="flex justify-between px-5">
      <p className="text-[1.1rem] font-bold">26.03.08</p>
      <div className="flex flex-col gap-4">
        <TimeBar />
        <TimeBar />
        <TimeBar />
      </div>
    </div>
  );
}
