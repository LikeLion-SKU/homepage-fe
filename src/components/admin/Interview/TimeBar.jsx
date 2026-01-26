import { useOutletContext } from 'react-router';

//@ts-ignore
import Trash from '@/assets/icons/trashcan_icon.svg?react';

export default function TimeBar() {
  // @ts-ignore
  const { openModal } = useOutletContext();

  return (
    <div className="flex gap-5 items-center">
      <p>오후</p>
      <p>6:00 - 6:30</p>
      <Trash onClick={() => openModal('등록된 일정을 삭제하시겠습니까?', () => {})} />
    </div>
  );
}
