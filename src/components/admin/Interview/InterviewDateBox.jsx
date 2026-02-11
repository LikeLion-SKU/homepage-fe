import { useNavigate, useOutletContext } from 'react-router';

import { deleteBookingInterview, getInterviewBookingAdmin } from '@/api/interviewBooking';
import useAdminBookingStore from '@/store/useAdminBookingStore';

export default function InterviewDateBox({ track, date, startTime, endTime, personalData }) {
  // @ts-ignore
  const { openModal, showToast } = useOutletContext();
  const { bookingInterviews, setTrackBookingSchedule } = useAdminBookingStore();
  const navigate = useNavigate();
  const deleteInterview = async () => {
    try {
      await deleteBookingInterview(personalData.bookingId);
    } catch (error) {
      console.log('면접 일정 삭제 실패:', error);
    } finally {
      const parameter = {
        semester: parseInt(bookingInterviews.semester),
        date: date,
        track: track,
      };
      const data = await getInterviewBookingAdmin(parameter);
      setTrackBookingSchedule(data.tracks[0].track, data.tracks[0].dates);
      showToast('삭제되었습니다!');
    }
  };
  return (
    <div className="flex flex-col w-65 h-49 border justify-center px-5 gap-5">
      <p>
        {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
      </p>
      <div className="flex gap-4">
        <p className="font-bold">{personalData.name}</p>
        <p className="text-[0.9rem]">{personalData.department}</p>
      </div>
      <div className="flex gap-10">
        <div>
          <p>{personalData.studentNumber}</p>
          <p>{personalData.phone.replaceAll('-', '')}</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() =>
              navigate('/application', {
                state: { applicationRecordId: personalData.applicationRecordId },
              })
            } //추후 경로 확정시 변경 필요
            className="w-20 h-7.25 text-center items-center bg-[#D8D8D8] border text-[0.9rem]"
          >
            지원서
          </button>
          <button
            onClick={() => openModal('면접 일정을 삭제하시겠습니까?', () => deleteInterview())}
            className="w-20 h-7.25 text-center items-center bg-[#D8D8D8] border text-[0.9rem]"
          >
            일정 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
