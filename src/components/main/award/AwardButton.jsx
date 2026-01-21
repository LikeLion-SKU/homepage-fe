import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useScale from '@/components/main/hooks/useScale';

function AwardButton() {
  const scale = useScale();
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.style.setProperty('--scale', String(scale));
  }, [scale]);

  return (
    <div ref={rootRef} className="flex justify-center">
      <button
        type="button"
        onClick={() => navigate('/project')}
        className="flex items-stretch p-0 bg-transparent overflow-hidden transition-opacity hover:opacity-80 border border-[#1a1a1a] [border-width:calc(1px*var(--scale,1))]"
        style={{
          borderRadius: 0,
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        }}
      >
        {/* 왼쪽 영역: 배경색만 (작은 박스 테두리 제거) */}
        <div className="flex items-center justify-center shrink-0 bg-button-green w-[calc(50.917px*var(--scale,1))] min-h-[calc(50.917px*var(--scale,1))]">
          <span className="text-[#1a1a1a] leading-none font-normal text-[calc(36px*var(--scale,1))] translate-y-[-5%]">
            →
          </span>
        </div>
        {/* 오른쪽 영역 + 가운데 세로선 */}
        <span className="flex items-center justify-center bg-[#f9f9f9] text-[#1a1a1a] font-semibold leading-none border-l border-[#1a1a1a] [border-left-width:calc(1px*var(--scale,1))] px-[calc(20px*var(--scale,1))] min-h-[calc(50.917px*var(--scale,1))] text-[calc(24px*var(--scale,1))]">
          프로젝트 더 보기
        </span>
      </button>
    </div>
  );
}

export default AwardButton;
