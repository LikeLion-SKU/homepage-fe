import { useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import useCountNum from '@/components/main/hooks/useCountNum';
import useScale from '@/components/main/hooks/useScale';

/**
 * 숫자 + 플러스 컴포넌트 (카운팅 애니메이션)
 * @param {Object} props
 * @param {number} props.value - 표시할 숫자 값
 * @param {number|string} props.initialX - 초기 X 위치 (기본값: 200, 오른쪽으로 이동) - 숫자(px) 또는 string(vw/vh 등)
 * @param {number|string} props.initialY - 초기 Y 위치 (기본값: 100, 아래로 이동) - 숫자(px) 또는 string(vw/vh 등)
 */
export default function Number({ value = 50, initialX = 200, initialY = 100 }) {
  const scale = useScale();
  const [shouldStart, setShouldStart] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const count = useCountNum(shouldStart ? value : 0, 0, 4000);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // initialX와 initialY가 string인지 확인 (vw, vh 등)
  const isXString = typeof initialX === 'string';
  const isYString = typeof initialY === 'string';

  // 화면 크기에 따라 위치 조정
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isWide = windowWidth > 1440;

  // 반응형 위치 계산
  // string인 경우 그대로 사용, 숫자인 경우 기존 로직 적용
  const mobileRightPadding = Math.min(100, windowWidth * 0.1); // 375px면 37.5
  const maxXMobile = windowWidth / 2 - mobileRightPadding;
  const maxXWide = 720; // 대충 안전상한 (원하면 조절)

  const responsiveX = isXString
    ? initialX
    : (() => {
        const base = initialX * (windowWidth / 1440); // ✅ 1440 기준으로 계속 스케일링
        if (isMobile) {
          return Math.max(-windowWidth / 2 + 20, Math.min(maxXMobile, base));
        }
        if (isWide) {
          return Math.min(maxXWide, base);
        }
        return base; //  640~1440까지도 base 사용
      })();

  const responsiveY = isYString
    ? initialY
    : isMobile
      ? initialY * 0.5
      : isTablet
        ? initialY * 0.8
        : initialY;

  // 숫자를 문자열로 변환 (2자리로 패딩)
  const numberString = String(count).padStart(2, '0');

  // x, y 값을 계산 (string인 경우와 숫자인 경우 처리)
  const xValue = isXString ? responsiveX : `${responsiveX}px`;
  const yValue = isYString ? responsiveY : `${responsiveY}px`;
  const initialYValue = isYString
    ? responsiveY
    : typeof responsiveY === 'number'
      ? `${responsiveY + 20}px`
      : responsiveY;

  // 모든 화면 크기에서 left: 50% 기준 유지
  const style = {
    left: '46%',
    top: '52%',
    x: `calc(-30% + ${xValue})`,
    y: `calc(-50% + ${yValue})`,
  };

  const initialStyle = isMobile
    ? { y: `calc(-50% + ${initialYValue})`, opacity: 0 }
    : { y: `calc(-50% + ${initialYValue})`, opacity: 0 };

  const whileInViewStyle = isMobile
    ? { y: `calc(-50% + ${yValue})`, opacity: 1 }
    : { y: `calc(-50% + ${yValue})`, opacity: 1 };

  return (
    <motion.div
      className="absolute"
      style={{
        ...style,
        zIndex: 100,
        maxWidth: '90vw',
      }}
      initial={initialStyle}
      whileInView={whileInViewStyle}
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
          fontSize: isMobile
            ? `${(48 / 16) * scale}rem`
            : isTablet
              ? `${(60 / 16) * scale}rem`
              : `${(72 / 16) * scale}rem`,
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
                fontSize: isMobile
                  ? `${(48 / 16) * scale}rem`
                  : isTablet
                    ? `${(60 / 16) * scale}rem`
                    : `${(72 / 16) * scale}rem`,
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
            fontSize: isMobile
              ? `${(36 / 16) * scale}rem`
              : isTablet
                ? `${(44 / 16) * scale}rem`
                : `${(56 / 16) * scale}rem`,
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
