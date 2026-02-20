import { useEffect, useRef } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

function CardSlideAnimation({ containerRef, cards, virtualPosRef, isAutoSettingRef }) {
  // 자동 스크롤 관련 refs
  const isPausedRef = useRef(false);
  const rafRef = useRef(null);

  // 1200px 이상에서만 속도 더 빠르게
  const isLargeScreen = useMediaQuery('(min-width: 1200px)');

  // 카드 리스트 변경 시 virtualPos 동기화
  useEffect(() => {
    const container = containerRef?.current;
    if (!container || !virtualPosRef) return;
    const scrollWidth = container.scrollWidth;
    const halfWidth = scrollWidth ? Math.floor(scrollWidth / 2) : 0;
    if (!halfWidth) return;

    virtualPosRef.current = container.scrollLeft % halfWidth;
  }, [containerRef, cards?.length, virtualPosRef]);

  // 자동 스크롤 애니메이션
  useEffect(() => {
    const container = containerRef?.current;
    if (!container || !cards || cards.length === 0) return;

    // 1200px 이상에서만 속도 더 빠르게
    const scrollSpeed = isLargeScreen ? 2 : 1.1; // px/frame

    // 초기 virtualPos를 현재 scrollLeft로 설정
    if (virtualPosRef && virtualPosRef.current === 0) {
      virtualPosRef.current = container.scrollLeft || 1;
    }

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      if (isPausedRef.current) return;

      const scrollWidth = container.scrollWidth;
      if (!scrollWidth) return;

      const halfWidth = Math.floor(scrollWidth / 2);
      if (!halfWidth) return;

      // 가상 위치 증가 (계속 증가, 원래 위치로 돌아가지 않음)
      if (virtualPosRef) {
        virtualPosRef.current += scrollSpeed;

        // 경계 처리: halfWidth를 넘으면 modulo 연산으로 루프 유지
        const next = virtualPosRef.current % halfWidth;

        // 자동 스크롤로 scrollLeft 설정 (루프 처리는 여기서만)
        if (isAutoSettingRef) {
          isAutoSettingRef.current = true;
        }
        container.scrollLeft = next;
        if (isAutoSettingRef) {
          isAutoSettingRef.current = false;
        }
      }
    };

    // 바로 시작 (초기화 대기 없음)
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, cards, virtualPosRef, isAutoSettingRef, isLargeScreen]);

  // 마우스 호버 시 자동 스크롤 일시 정지
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMouseEnter = () => {
      isPausedRef.current = true;
    };

    const handleMouseLeave = () => {
      isPausedRef.current = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [containerRef]);

  // virtualPosRef와 isAutoSettingRef를 외부에서 사용할 수 있도록 반환
  // 하지만 React에서는 ref를 직접 반환할 수 없으므로,
  // 대신 props로 전달받은 ref 객체에 할당하거나,
  // 별도의 ref 객체를 props로 받아서 사용
  return null;
}

export default CardSlideAnimation;
