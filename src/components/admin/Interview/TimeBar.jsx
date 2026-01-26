//@ts-ignore
import Trash from '@/assets/icons/trashcan_icon.svg?react';

export default function TimeBar() {
  return (
    <div className="flex gap-5 items-center">
      <p>오후</p>
      <p>6:00 - 6:30</p>
      <Trash />
    </div>
  );
}
