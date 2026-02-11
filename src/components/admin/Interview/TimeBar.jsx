import { useOutletContext } from 'react-router';

import { deleteInterviewSchedule, getInterviewScheduleAdmin } from '@/api/interviewSchedule';
//@ts-ignore
import Trash from '@/assets/icons/trashcan_icon.svg?react';
import useAdminInterviewStore from '@/store/useAdminInterviewStore';

export default function TimeBar({ data, track }) {
  // @ts-ignore
  const { openModal, showToast } = useOutletContext();
  const { interviews, setTrackInterviewSchedule } = useAdminInterviewStore();

  const deleteSchedule = async () => {
    if (!data.booked) {
      await deleteInterviewSchedule(data.scheduleId);
      showToast('삭제되었습니다.');
      const parameter = { semester: interviews.semester, track: track };
      const newSchedule = await getInterviewScheduleAdmin(parameter);
      setTrackInterviewSchedule(newSchedule.tracks[0].track, newSchedule.tracks[0].dates);
    } else {
      showToast('해당 일정에 예약된 면접자가 있습니다.');
    }
  };

  return (
    <div className="flex gap-5 items-center">
      <p>
        {data.startTime.slice(0, 5)} - {data.endTime.slice(0, 5)}
      </p>
      <Trash onClick={() => openModal('등록된 일정을 삭제하시겠습니까?', () => deleteSchedule())} />
    </div>
  );
}
