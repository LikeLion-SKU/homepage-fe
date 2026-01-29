import InterviewDataAdd from '@/components/admin/Interview/InterviewDateAdd';
import InterviewDataCheck from '@/components/admin/Interview/InterviewDateCheck';

export default function TrackDateBox({ data, isDataAdd }) {
  return (
    <div className="flex flex-col border w-103 py-7 items-center gap-12">
      <p className="text-[1.6rem] font-semibold">{data.track}</p>
      {isDataAdd ? (
        <InterviewDataAdd dateData={data.date} />
      ) : (
        <InterviewDataCheck dateData={data.date} />
      )}
    </div>
  );
}
