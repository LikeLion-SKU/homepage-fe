import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CardSlideAnimation from '@/components/animation/CardSlideAnimation';
import useScale from '@/components/main/hooks/useScale';
import { useDragScroll } from '@/hooks/useDragScroll';

import AwardCard from './AwardCard';
import ClickCursor from './ClickCursor';

function AwardCardList({ cards = [], observerRef = null, loading = false }) {
  const scale = useScale();
  const navigate = useNavigate();

  // 자동 스크롤 관련 refs (사용자 스크롤 처리에서 사용)
  const virtualPosRef = useRef(0);
  const isAutoSettingRef = useRef(false);

  // 드래그 비활성화, 마우스 휠과 커서만 활성화
  const { containerRef, cursorRef } = useDragScroll({
    enableDrag: false, // 드래그 비활성화
    wheelToHorizontal: true, // 마우스 휠 스크롤 활성화
  });

  // 사용자 스크롤 시 virtualPos 동기화 및 무한 루프 처리
  useEffect(() => {
    const container = containerRef.current;
    if (!container || cards.length === 0) return;

    const handleScroll = () => {
      // 자동 스크롤로 발생한 scroll 이벤트는 무시
      if (isAutoSettingRef.current) return;

      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      if (!scrollWidth) return;
      const halfWidth = Math.floor(scrollWidth / 2);
      if (!halfWidth) return;

      // 사용자 입력일 때만 virtualPos 동기화
      virtualPosRef.current = scrollLeft % halfWidth;

      // 사용자 스크롤 시 경계 처리 (왼쪽/오른쪽 모두)
      // 오른쪽 끝에 도달하면 (복제된 시작 부분) 부드럽게 원래 위치로 이동
      if (scrollLeft >= halfWidth) {
        isAutoSettingRef.current = true;
        container.scrollTo({
          left: scrollLeft - halfWidth,
          behavior: 'auto',
        });
        requestAnimationFrame(() => {
          isAutoSettingRef.current = false;
        });
      }
      // 왼쪽 끝에 도달하면 (시작 부분) 마지막 위치로 이동
      else if (scrollLeft <= 0) {
        isAutoSettingRef.current = true;
        container.scrollTo({
          left: scrollLeft + halfWidth,
          behavior: 'auto',
        });
        requestAnimationFrame(() => {
          isAutoSettingRef.current = false;
        });
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, cards]);

  // 카드 리스트를 두 번 복제하여 무한 스크롤 효과 생성
  const duplicatedCards = [...cards, ...cards];

  return (
    <>
      {/* 자동 스크롤 애니메이션 적용 */}
      {cards.length > 0 && (
        <CardSlideAnimation
          containerRef={containerRef}
          cards={cards}
          virtualPosRef={virtualPosRef}
          isAutoSettingRef={isAutoSettingRef}
        />
      )}
      <div
        ref={containerRef}
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          overflowX: 'auto',
          overflowY: 'visible',
          paddingTop: `${(20 / 16) * scale}rem`,
          paddingBottom: `${(16 / 16) * scale}rem`,
          position: 'relative',
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
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.projectId || index}-${Math.floor(index / cards.length)}`}
              onClick={() => {
                if (card.projectId) {
                  // 해당 projectId로 viewDetail 페이지로 이동
                  navigate('/project/viewDetail', {
                    state: { projectId: card.projectId },
                  });
                } else {
                  console.error('projectId가 없습니다:', card);
                }
              }}
              style={{ display: 'block', cursor: 'pointer' }}
            >
              <AwardCard title={card.title} image={card.image} />
            </div>
          ))}
        </div>
        {/* 무한 스크롤 감지 요소 - absolute로 배치하여 scrollWidth에 영향 없게 */}
        {observerRef && (
          <div
            ref={observerRef}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '1px',
              height: '1px',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {loading && (
              <div
                style={{
                  position: 'absolute',
                  right: '50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                className="text-sm"
              >
                로딩 중...
              </div>
            )}
          </div>
        )}
      </div>
      {/* 커서 따라다니는 네모 박스 */}
      <ClickCursor cursorRef={cursorRef} />
    </>
  );
}

export default AwardCardList;
