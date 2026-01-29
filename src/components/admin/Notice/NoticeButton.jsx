//@ts-ignore
import Check from '@/assets/icons/checkBox_icon.svg?react';
//@ts-ignore
import Plus from '@/assets/icons/plus_icon.svg?react';

export default function NoticeButton({
  type,
  onClick,
  isChecked = false,
  checkedCount = 0,
  className = '',
  isConfirmMode = false,
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
    let bgColor = 'bg-white';
    if (isConfirmMode) {
      bgColor = 'bg-[#C6E400]';
    } else if (className.includes('bg-[#E7E7E7]')) {
      bgColor = 'bg-[#E7E7E7]';
    }

    // 수정완료 모드일 때는 버튼 너비를 더 넓게
    const buttonWidth = isConfirmMode ? 'w-24' : 'w-15';

    return (
      <button
        onClick={onClick}
        className={`${buttonWidth} h-10 border text-center items-center ${bgColor} text-[1.1rem] font-semibold text-black ${className}`}
      >
        {isConfirmMode ? '수정완료' : '수정'}
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

  return null;
}
