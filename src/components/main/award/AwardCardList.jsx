import { Link } from 'react-router-dom';

import useScale from '@/components/main/hooks/useScale';
import { useDragScroll } from '@/hooks/useDragScroll';

import AwardCard from './AwardCard';
import ClickCursor from './ClickCursor';

function AwardCardList({ cards = [] }) {
  const scale = useScale();

  // 드래그 비활성화, 마우스 휠과 커서만 활성화
  const { containerRef, cursorRef } = useDragScroll({
    enableDrag: false, // 드래그 비활성화
    wheelToHorizontal: true, // 마우스 휠 스크롤 활성화
  });

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: `${(16 / 16) * scale}rem`,
        }}
        className="no-scrollbar award-drag-container"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 'max-content',
          }}
        >
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.to || '/project'}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <AwardCard title={card.title} image={card.image} />
            </Link>
          ))}
        </div>
      </div>
      {/* 커서 따라다니는 네모 박스 */}
      <ClickCursor cursorRef={cursorRef} />
    </>
  );
}

export default AwardCardList;
