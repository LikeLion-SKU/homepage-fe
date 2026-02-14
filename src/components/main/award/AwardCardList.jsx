import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useScale from '@/components/main/hooks/useScale';
import { useDragScroll } from '@/hooks/useDragScroll';
import useMediaQuery from '@/hooks/useMediaQuery';

import AwardCard from './AwardCard';
import ClickCursor from './ClickCursor';

function AwardCardList({ cards = [], observerRef = null, loading = false }) {
  const scale = useScale();
  const navigate = useNavigate();
  const isScrollingRef = useRef(false);
  const isMobile480 = useMediaQuery('(max-width: 480px)');
  const hasInitializedRef = useRef(false);

  // 드래그 비활성화, 마우스 휠과 커서만 활성화
  const { containerRef, cursorRef } = useDragScroll({
    enableDrag: false, // 드래그 비활성화
    wheelToHorizontal: true, // 마우스 휠 스크롤 활성화
  });

  // 초기 스크롤 위치 설정: 세 개의 카드가 동시에 보이도록
  useEffect(() => {
    const container = containerRef.current;
    if (!container || cards.length === 0 || hasInitializedRef.current) return;

    // 카드 하나의 너비와 마진 계산
    const cardWidth = (699 / 16) * scale * (isMobile480 ? 1.6 : 1);
    const cardMargin = (35 / 16) * scale;
    const cardTotalWidth = cardWidth + cardMargin;

    // 세 개의 카드가 보이도록 스크롤 위치 계산
    // 두 번째 카드가 중앙에 오도록: 첫 번째 카드 너비 + 마진 + (뷰포트 너비 / 2) - (카드 너비 / 2)
    const viewportWidth = window.innerWidth;
    const targetScrollLeft = cardTotalWidth + viewportWidth / 4 - cardWidth / 2;

    // 초기 스크롤 위치 설정 (한 번만 실행)
    setTimeout(() => {
      if (container && !hasInitializedRef.current) {
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'auto',
        });
        hasInitializedRef.current = true;
      }
    }, 100);
  }, [containerRef, cards, scale, isMobile480]);

  // 무한 스크롤 구현: 카드 리스트를 복제하여 순환 효과 생성
  useEffect(() => {
    const container = containerRef.current;
    if (!container || cards.length === 0) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const halfWidth = scrollWidth / 2;

      // 오른쪽 끝에 도달하면 (복제된 시작 부분) 부드럽게 원래 위치로 이동
      if (scrollLeft >= halfWidth) {
        isScrollingRef.current = true;
        container.scrollTo({
          left: scrollLeft - halfWidth,
          behavior: 'auto', // 부드러운 전환 없이 즉시 이동
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
      // 왼쪽 끝에 도달하면 (시작 부분) 마지막 위치로 이동
      else if (scrollLeft <= 0) {
        isScrollingRef.current = true;
        container.scrollTo({
          left: scrollLeft + halfWidth,
          behavior: 'auto', // 부드러운 전환 없이 즉시 이동
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, cards]);

  // 카드 리스트를 두 번 복제하여 무한 스크롤 효과 생성
  const duplicatedCards = [...cards, ...cards];

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
          {/* 무한 스크롤 감지 요소 - 오른쪽 끝에 배치 */}
          {observerRef && (
            <div
              ref={observerRef}
              style={{
                minWidth: '100px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading && <div className="text-sm">로딩 중...</div>}
            </div>
          )}
        </div>
      </div>
      {/* 커서 따라다니는 네모 박스 */}
      <ClickCursor cursorRef={cursorRef} />
    </>
  );
}

export default AwardCardList;
