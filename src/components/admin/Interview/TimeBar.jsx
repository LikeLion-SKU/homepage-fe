import { useOutletContext } from 'react-router';

//@ts-ignore
import Trash from '@/assets/icons/trashcan_icon.svg?react';

export default function TimeBar({ startTime, endTime }) {
  // @ts-ignore
  const { openModal } = useOutletContext();

  return (
    <div className="flex gap-5 items-center">
      <p>
        {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
      </p>
      <Trash
        onClick={() =>
          openModal('등록된 일정을 삭제하시겠습니까?', () => {
            /*실제 삭제 로직*/
          })
        }
      />
    </div>
  );
}
