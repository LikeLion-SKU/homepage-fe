import { useOutletContext } from 'react-router';

export default function InterviewDateBox({ startTime, endTime, personalData }) {
  // @ts-ignore
  const { openModal, showToast } = useOutletContext();
  return (
    <div className="flex flex-col w-65 h-49 border justify-center px-5 gap-5">
      <p className="">
        오후 {startTime} - {endTime}
      </p>
      <div className="flex gap-4">
        <p className="font-bold">{personalData.name}</p>
        <p className="text-[0.9rem]">{personalData.major}</p>
      </div>
      <div className="flex gap-10">
        <div>
          <p>{personalData.stdNum}</p>
          <p>{personalData.phoneNum}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-20 h-7.25 text-center items-center bg-[#D8D8D8] border text-[0.9rem]">
            지원서
          </button>
          <button
            onClick={() =>
              openModal('면접 일정을 삭제하시겠습니까?', () => showToast('삭제되었습니다!'))
            }
            className="w-20 h-7.25 text-center items-center bg-[#D8D8D8] border text-[0.9rem]"
          >
            일정 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
