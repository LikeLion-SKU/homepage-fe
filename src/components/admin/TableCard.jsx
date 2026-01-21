import { useEffect, useState } from 'react';

//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';

export default function TableCard({ data, width, isChecked }) {
  const [isCheck, setIsCheck] = useState(isChecked);
  useEffect(() => {
    setIsCheck(isChecked);
  }, [isChecked]);
  return (
    <div style={{ width: width }} className="h-21 flex items-center justify-between pl-11 pr-10">
      {isCheck ? (
        <Check onClick={() => setIsCheck(false)} />
      ) : (
        <button onClick={() => setIsCheck(true)} className="w-7 h-7 border-2" />
      )}
      {data.map((contents) => (
        <p className="text-[1.1rem] font-semibold">{contents}</p>
      ))}
    </div>
  );
}
