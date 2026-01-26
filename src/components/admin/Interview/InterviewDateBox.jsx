import { useOutletContext } from 'react-router';

export default function InterviewDateBox() {
  // @ts-ignore
  const { openModal, showToast } = useOutletContext();
  return (
    <div className="flex flex-col w-65 h-49 border justify-center px-5 gap-5">
      <p className="">오후 6:00 - 6:30</p>
      <div className="flex gap-4">
        <p className="font-bold">정영진</p>
        <p className="text-[0.9rem]">글로벌비즈니스어학부</p>
      </div>
      <div className="flex gap-10">
        <div>
          <p>2020417025</p>
          <p>01096981186</p>
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
