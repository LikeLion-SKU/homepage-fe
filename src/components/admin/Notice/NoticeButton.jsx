//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
//@ts-ignore
import Plus from '@/assets/icons/plus_icon.svg?react';
//@ts-ignore
import Trashcan from '@/assets/icons/trashcan_icon.svg?react';

export default function NoticeButton({
  type,
  onClick,
  isChecked = false,
  checkedCount = 0,
  className = '',
}) {
  // 전체 선택 버튼
  if (type === 'selectAll') {
    return (
      <button
        onClick={onClick}
        className={`w-20 h-10 border text-center items-center bg-white ${className}`}
      >
        {checkedCount > 0 ? '선택취소' : '전체선택'}
      </button>
    );
  }

  // 개별 선택 버튼 (체크박스)
  if (type === 'checkbox') {
    return isChecked ? (
      <Check onClick={onClick} className="w-7 h-7 cursor-pointer" />
    ) : (
      <button onClick={onClick} className="w-7 h-7 border-2 cursor-pointer" />
    );
  }

  // 수정하기 버튼
  if (type === 'edit') {
    const bgColor = className.includes('bg-[#E7E7E7]') ? 'bg-[#E7E7E7]' : 'bg-white';
    return (
      <button
        onClick={onClick}
        className={`w-15 h-10 border text-center items-center ${bgColor} text-[1.1rem] font-semibold text-black ${className}`}
      >
        수정
      </button>
    );
  }

  // 플러스 버튼
  if (type === 'plus') {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center w-12 h-12 bg-white hover:bg-[#F9F9F9] transition-colors ${className}`}
      >
        <Plus className="w-6 h-6" />
      </button>
    );
  }

  // 삭제 버튼 (일괄 삭제)
  if (type === 'delete') {
    return (
      <button
        onClick={onClick}
        className={`w-20 h-10 border text-center items-center bg-white ${className}`}
      >
        삭제{checkedCount > 0 ? `(${checkedCount})` : ''}
      </button>
    );
  }

  // 저장하기 버튼
  if (type === 'save') {
    return (
      <button
        onClick={onClick}
        className={`w-43 h-12 border text-center items-center bg-[#D9D9D9] mx-auto hover:bg-[#CBCBCB] transition-colors ${className}`}
      >
        저장하기
      </button>
    );
  }

  return null;
}
