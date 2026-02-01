import { useEffect, useRef } from 'react';

export function useDragScroll({
  inertia = true,
  inertiaFriction = 0.92, // 0.88~0.95 취향
  dragThreshold = 6,
  wheelToHorizontal = true,
  enableDrag = true, // 드래그 활성화 여부
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
    isLinkElement: false, // Link 요소인지 여부
    clickStartTime: 0, // 클릭 시작 시간 (모션 지속 시간 계산용)
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

  // 드래그 중 클릭 방지용: item 링크/버튼 onClick에서 이 함수로 guard (원샷 방식)
  const blockNextClickRef = useRef(false);

  // 클릭 모션 최소 지속 시간을 위한 타이머
  const clickAnimationTimerRef = useRef(null);

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

      // 드래그가 비활성화된 경우 커서만 업데이트
      if (!enableDrag) return;

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

      // 이전 클릭 모션 타이머가 있으면 취소
      if (clickAnimationTimerRef.current) {
        clearTimeout(clickAnimationTimerRef.current);
        clickAnimationTimerRef.current = null;
      }

      const s = stateRef.current;

      // 클릭 시작 시간 기록
      s.clickStartTime = performance.now();

      // 클릭 모션을 위한 커서 상태 변경 (드래그 활성화 여부와 무관)
      setCursorGrabbing(true);
      el.classList.add('dragging');

      // 드래그가 비활성화된 경우 커서 상태만 변경하고 종료
      if (!enableDrag) {
        return;
      }

      s.dragging = true;
      s.pointerId = e.pointerId;
      s.startX = e.clientX;
      s.startScrollLeft = el.scrollLeft;
      s.lastX = e.clientX;
      s.lastT = performance.now();
      s.vx = 0;
      s.moved = false;

      // 다운할 때는 클릭 막지 않음
      blockNextClickRef.current = false;

      // Link 요소가 아닌 경우에만 포인터 캡처 (Link 클릭 허용)
      if (!s.isLinkElement) {
        el.setPointerCapture(e.pointerId);
      }

      // 커스텀 커서 숨기기 이벤트 발생
      window.dispatchEvent(new CustomEvent('dragscroll:start'));
    };

    const endDrag = () => {
      const s = stateRef.current;

      // 클릭 모션 최소 지속 시간 보장 (빠른 클릭에서도 모션이 보이도록)
      const minClickDuration = 150; // 150ms
      const elapsed = performance.now() - (s.clickStartTime || performance.now());

      const restoreCursorState = () => {
        el.classList.remove('dragging');
        setCursorGrabbing(false);
      };

      // 최소 지속 시간이 지나면 상태 복원
      if (elapsed < minClickDuration) {
        clickAnimationTimerRef.current = setTimeout(() => {
          restoreCursorState();
          clickAnimationTimerRef.current = null;
        }, minClickDuration - elapsed);
      } else {
        restoreCursorState();
      }

      // 드래그가 비활성화된 경우 커서 상태만 복원하고 종료
      if (!enableDrag) {
        return;
      }

      if (!s.dragging) return;

      s.dragging = false;

      // 드래그였다면 다음 클릭 1번만 막기
      // Link 요소이고 드래그가 아닌 경우는 클릭 허용
      if (s.isLinkElement && !s.moved) {
        blockNextClickRef.current = false; // Link 클릭 허용
      } else {
        blockNextClickRef.current = s.moved; // 드래그였으면 클릭 막기
      }

      try {
        if (s.pointerId != null) el.releasePointerCapture(s.pointerId);
      } catch {
        // Ignore pointer capture errors
      }

      // 커스텀 커서 보이기 이벤트 발생
      window.dispatchEvent(new CustomEvent('dragscroll:end'));

      // 관성 시작: 마지막 vx 방향 그대로
      // scrollLeft는 startScrollLeft - dx였으니,
      // vx가 +면 커서가 오른쪽으로 간 것(내용은 왼쪽으로 이동),
      // tick에서 scrollLeft -= vx*16로 방향 맞춤
      startInertia();

      // 상태 초기화
      s.isLinkElement = false;
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

    // 클릭 모션을 위해 pointerdown/up은 항상 등록 (드래그 활성화 여부와 무관)
    // 캡처 단계에서 처리하여 자식 요소(Link 등)의 이벤트도 감지
    el.addEventListener('pointerdown', onPointerDown, true);
    el.addEventListener('pointerup', onPointerUp, true);
    el.addEventListener('pointercancel', onPointerCancel, true);

    // wheel은 passive:false 필요
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      stopInertia();
      if (cursorRafRef.current) cancelAnimationFrame(cursorRafRef.current);

      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointermove', onPointerMove);

      // 클릭 모션을 위해 pointerdown/up은 항상 제거 (캡처 단계)
      el.removeEventListener('pointerdown', onPointerDown, true);
      el.removeEventListener('pointerup', onPointerUp, true);
      el.removeEventListener('pointercancel', onPointerCancel, true);

      el.removeEventListener('wheel', onWheel);
    };
  }, [dragThreshold, inertia, inertiaFriction, wheelToHorizontal, enableDrag]);

  const clickGuard = (e) => {
    const shouldBlock = blockNextClickRef.current;
    if (shouldBlock) {
      blockNextClickRef.current = false; // 딱 한 번만 막고 풀기
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return { containerRef, cursorRef, clickGuard };
}
