import { useRef } from 'react';

/* eslint-disable no-unused-vars */
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * LabelAnimation (progress-based)
 * - 누적(baseX) 방식 제거
 * - target 요소의 스크롤 progress(0~1)를 x로 직접 매핑
 * - 화면 밖/진입 전/진입 후에도 항상 일관되게 동작
 *
 * props
 * - direction: 'right' | 'left'
 * - maxOffset: px 단위 (±maxOffset 범위)
 * - startX: px 단위 정적 오프셋 (왼쪽으로 보내려면 음수)
 * - stiffness/damping: 움직임 부드러움
 */
function LabelAnimation({
  children,
  direction = 'right',
  maxOffset = 200,
  startX = 0,
  stiffness = 120,
  damping = 24,
}) {
  const targetRef = useRef(null);

  // targetRef가 뷰포트에서 지나가는 정도를 0~1로 잡음
  // "start end" = target의 시작이 viewport 끝에 닿을 때 0
  // "end start" = target의 끝이 viewport 시작에 닿을 때 1
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // progress를 스프링 처리해서 부드럽게
  const smooth = useSpring(scrollYProgress, { stiffness, damping });

  // 0~1을 -1~1로 펼쳐서 중앙(0.5)에서 0 되게
  const centered = useTransform(smooth, (v) => (v - 0.5) * 2);

  // 방향 적용
  const dir = direction === 'right' ? 1 : -1;

  // x를 progress 기반으로 "직접" 계산 (누적 없음)
  const x = useTransform(centered, (v) => startX + dir * v * maxOffset);

  return (
    <div ref={targetRef}>
      <motion.div style={{ x }}>{children}</motion.div>
    </div>
  );
}

export default LabelAnimation;
