import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import useCountNum from '@/components/main/hooks/useCountNum';
import useScale from '@/components/main/hooks/useScale';

/**
 * 숫자 + 플러스 컴포넌트 (카운팅 애니메이션)
 * @param {Object} props
 * @param {number} props.value - 표시할 숫자 값
 * @param {number} props.initialX - 초기 X 위치 (기본값: 200, 오른쪽으로 이동)
 * @param {number} props.initialY - 초기 Y 위치 (기본값: 100, 아래로 이동)
 */
export default function Number({ value = 50, initialX = 200, initialY = 100 }) {
  const scale = useScale();
  const [shouldStart, setShouldStart] = useState(false);
  const count = useCountNum(shouldStart ? value : 0, 0, 4000);

  // 숫자를 문자열로 변환 (2자리로 패딩)
  const numberString = String(count).padStart(2, '0');

  return (
    <motion.div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        x: `calc(-50% + ${initialX}px)`,
        y: `calc(-50% + ${initialY}px)`,
        zIndex: 100,
      }}
      initial={{
        y: `calc(-50% + ${initialY + 20}px)`,
        opacity: 0,
      }}
      whileInView={{
        y: `calc(-50% + ${initialY}px)`,
        opacity: 1,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
      onViewportEnter={() => {
        setShouldStart(true);
      }}
    >
      <div
        className="inline-flex items-end gap-2"
        style={{
          fontFamily: 'pixel, monospace',
          fontSize: `${(72 / 16) * scale}rem`,
          fontWeight: 'bold',
          lineHeight: 1,
          color: '#00156A',
        }}
      >
        {/* 숫자 표시 */}
        <div className="flex items-end">
          {numberString.split('').map((digit, index) => (
            <span
              key={index}
              style={{
                fontFamily: 'pixel, monospace',
                fontSize: `${(72 / 16) * scale}rem`,
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                color: '#00156A',
              }}
            >
              {digit}
            </span>
          ))}
        </div>
        {/* 플러스 기호 */}
        <span
          style={{
            fontFamily: 'pixel, monospace',
            fontSize: `${(56 / 16) * scale}rem`,
            fontWeight: 'bold',
            lineHeight: 1,
            color: '#00156A',
            alignSelf: 'flex-start',
            transform: 'translateY(-0.01em)',
          }}
        >
          +
        </span>
      </div>
    </motion.div>
  );
}
