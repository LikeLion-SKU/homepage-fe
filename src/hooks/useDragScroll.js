import { useEffect, useRef } from 'react';

export function useDragScroll({
  inertia = true,
  inertiaFriction = 0.92, // 0.88~0.95 취향
  dragThreshold = 6,
  wheelToHorizontal = true,
} = {}) {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  // drag state (refs to avoid re-render)
  const stateRef = useRef({
    hovering: false,
    dragging: false,
    pointerId: null,
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastT: 0,
    vx: 0,
    moved: false,
  });

  // cursor raf
  const cursorRafRef = useRef(0);
  const cursorPosRef = useRef({ x: -9999, y: -9999 });

  // inertia raf
  const inertiaRafRef = useRef(0);

  const stopInertia = () => {
    if (inertiaRafRef.current) {
      cancelAnimationFrame(inertiaRafRef.current);
      inertiaRafRef.current = 0;
    }
  };

  const setCursorVisible = (visible) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.opacity = visible ? '1' : '0';
  };

  const setCursorGrabbing = (grabbing) => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.dataset.state = grabbing ? 'down' : 'up';
  };

  // 부드러운 커서 이동을 위한 lerp
  const currentCursorPosRef = useRef({ x: -9999, y: -9999 });
  const targetCursorPosRef = useRef({ x: -9999, y: -9999 });

  const scheduleCursorMove = () => {
    if (cursorRafRef.current) return;

    const animate = () => {
      const cursor = cursorRef.current;
      if (!cursor) {
        cursorRafRef.current = 0;
        return;
      }

      const { x: targetX, y: targetY } = targetCursorPosRef.current;
      let { x: currentX, y: currentY } = currentCursorPosRef.current;

      // 초기 위치 설정
      if (currentX === -9999) {
        currentX = targetX;
        currentY = targetY;
      }

      // Lerp를 사용한 부드러운 이동 (0.08 = 더 부드러운 움직임)
      const lerpFactor = 0.08;
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      // DRAG 박스 중앙에 커서가 오도록 오프셋 계산
      // 실제 박스 크기를 측정하여 정확한 중앙 계산
      const boxRect = cursor.getBoundingClientRect();
      const boxWidth = boxRect.width;
      const boxHeight = boxRect.height;
      const ox = -boxWidth / 2;
      const oy = -boxHeight / 2;

      cursor.style.transform = `translate3d(${currentX + ox}px, ${currentY + oy}px, 0)`;
      currentCursorPosRef.current = { x: currentX, y: currentY };

      // 목표 위치와의 거리가 충분히 가까우면 중단
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0.05) {
        cursorRafRef.current = requestAnimationFrame(animate);
      } else {
        cursorRafRef.current = 0;
        currentCursorPosRef.current = { x: targetX, y: targetY };
        cursor.style.transform = `translate3d(${targetX + ox}px, ${targetY + oy}px, 0)`;
      }
    };

    cursorRafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const el = containerRef.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;

    // 기본: 컨테이너가 grab 커서 (CSS 클래스로 처리)
    el.classList.add('award-drag-container');

    const startInertia = () => {
      const s = stateRef.current;
      if (!el) return;
      if (!inertia) return;

      stopInertia();

      // 부드러운 스크롤을 위한 현재 스크롤 위치 추적
      let currentScroll = el.scrollLeft;
      let targetScroll = el.scrollLeft;

      const tick = () => {
        // vx가 거의 0이면 정지
        if (Math.abs(s.vx) < 0.01) {
          inertiaRafRef.current = 0;
          return;
        }

        // 목표 스크롤 위치 업데이트
        targetScroll -= s.vx * 16; // 16ms 기준 스케일

        // Lerp를 사용한 부드러운 스크롤 이동
        const lerpFactor = 0.2; // 부드러움 정도 (높을수록 더 빠르게 반응)
        currentScroll += (targetScroll - currentScroll) * lerpFactor;

        // 실제 스크롤 적용
        el.scrollLeft = currentScroll;

        // 속도 감소 (더 부드러운 감속)
        s.vx *= inertiaFriction;

        inertiaRafRef.current = requestAnimationFrame(tick);
      };
      inertiaRafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      stateRef.current.hovering = true;
      setCursorVisible(true);
      // 커스텀 커서 숨기기 이벤트 발생
      window.dispatchEvent(new CustomEvent('dragscroll:hover'));
    };

    const onLeave = () => {
      stateRef.current.hovering = false;
      setCursorVisible(false);
      // 커서 숨김 위치로 보내기
      cursorPosRef.current = { x: -9999, y: -9999 };
      targetCursorPosRef.current = { x: -9999, y: -9999 };
      currentCursorPosRef.current = { x: -9999, y: -9999 };
      scheduleCursorMove();
      // 커스텀 커서 보이기 이벤트 발생
      window.dispatchEvent(new CustomEvent('dragscroll:leave'));
    };

    const onPointerMove = (e) => {
      cursorPosRef.current = { x: e.clientX, y: e.clientY };
      targetCursorPosRef.current = { x: e.clientX, y: e.clientY };
      scheduleCursorMove();

      const s = stateRef.current;
      if (!s.dragging) return;

      const now = performance.now();
      const dx = e.clientX - s.startX;

      // 클릭/드래그 구분
      if (!s.moved && Math.abs(dx) > dragThreshold) s.moved = true;

      el.scrollLeft = s.startScrollLeft - dx;

      // 속도 추정(관성)
      const dt = now - (s.lastT || now);
      if (dt > 0) {
        const vx = (e.clientX - s.lastX) / dt; // px/ms
        // px/ms -> 내부 스케일로 사용
        s.vx = vx;
      }
      s.lastX = e.clientX;
      s.lastT = now;
    };

    const onPointerDown = (e) => {
      if (e.button !== 0) return;

      stopInertia();

      const s = stateRef.current;
      s.dragging = true;
      s.pointerId = e.pointerId;
      s.startX = e.clientX;
      s.startScrollLeft = el.scrollLeft;
      s.lastX = e.clientX;
      s.lastT = performance.now();
      s.vx = 0;
      s.moved = false;

      el.classList.add('dragging');
      setCursorGrabbing(true);

      // 포인터 캡처
      el.setPointerCapture(e.pointerId);

      // 커스텀 커서 숨기기 이벤트 발생
      window.dispatchEvent(new CustomEvent('dragscroll:start'));

      // 이미지 ghost-drag, 텍스트 선택 방지
      e.preventDefault();
    };

    const endDrag = () => {
      const s = stateRef.current;
      if (!s.dragging) return;

      s.dragging = false;
      el.style.cursor = 'grab';
      setCursorGrabbing(false);

      try {
        if (s.pointerId != null) el.releasePointerCapture(s.pointerId);
      } catch {
        // Ignore pointer capture errors
      }

      // 커스텀 커서 보이기 이벤트 발생
      window.dispatchEvent(new CustomEvent('dragscroll:end'));

      // 관성 시작: 마지막 vx 방향 그대로
      // scrollLeft는 "startScrollLeft - dx"였으니,
      // vx가 +면 커서가 오른쪽으로 간 것(내용은 왼쪽으로 이동),
      // tick에서 scrollLeft -= vx*16로 방향 맞춤
      startInertia();
    };

    const onPointerUp = endDrag;
    const onPointerCancel = endDrag;

    const onWheel = (e) => {
      if (!wheelToHorizontal) return;
      // 트랙패드/마우스휠 세로 -> 가로 스크롤로 매핑
      // shift 누르면 기본 가로 스크롤 느낌도 유지 가능
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    // 이벤트 등록
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerCancel);

    // wheel은 passive:false 필요
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      stopInertia();
      if (cursorRafRef.current) cancelAnimationFrame(cursorRafRef.current);

      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerCancel);
      el.removeEventListener('wheel', onWheel);
    };
  }, [dragThreshold, inertia, inertiaFriction, wheelToHorizontal]);

  // 드래그 중 "클릭" 방지용: item 링크/버튼 onClick에서 이 함수로 guard
  const shouldBlockClickRef = useRef(false);
  useEffect(() => {
    const id = setInterval(() => {
      const s = stateRef.current;
      shouldBlockClickRef.current = s.dragging || s.moved;
    }, 50);
    return () => clearInterval(id);
  }, []);

  const clickGuard = (e) => {
    if (shouldBlockClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return { containerRef, cursorRef, clickGuard };
}
