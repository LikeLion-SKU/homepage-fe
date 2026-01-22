import { useEffect, useRef } from 'react';

import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

function LabelAnimation({ children, direction = 'right', maxOffset = 200, startX = 0 }) {
  const containerRef = useRef(null);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef(1);
  const baseVelocity = 80; // 기본 속도 증가

  // 컴포넌트 마운트 시 baseX를 항상 0으로 리셋
  useEffect(() => {
    baseX.set(0);
  }, [baseX]);

  useAnimationFrame((t, delta) => {
    const scrollSpeed = Math.abs(velocityFactor.get());

    // 스크롤 속도가 거의 0이면 움직이지 않음
    if (scrollSpeed < 0.01) {
      return;
    }

    // 스크롤 방향에 따라 directionFactor 설정
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // direction에 따라 이동 방향 결정
    // 'right': 스크롤 내릴 때 오른쪽(양수), 올릴 때 왼쪽(음수)
    // 'left': 스크롤 내릴 때 왼쪽(음수), 올릴 때 오른쪽(양수)
    let velocityMultiplier = direction === 'right' ? 1 : -1;

    // 스크롤 속도에만 비례하여 움직임 (속도 배율 증가로 더 역동적으로)
    let moveBy =
      directionFactor.current *
      baseVelocity *
      velocityMultiplier *
      (delta / 1000) *
      scrollSpeed *
      0.3;

    // 현재 위치(0)에서 시작, 최대 이동 거리 제한
    const newX = baseX.get() + moveBy;
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, newX));

    baseX.set(clampedX);
  });

  // 정적 오프셋(startX) + 스크롤 반응(baseX)
  const x = useTransform(baseX, (v) => v + startX);

  return (
    <div ref={containerRef}>
      <motion.div
        style={{
          x: x,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default LabelAnimation;
