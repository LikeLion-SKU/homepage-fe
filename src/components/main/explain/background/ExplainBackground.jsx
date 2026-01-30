// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import blackDotSvg from '@/assets/icons/black-dot.svg';
import blahLineIcon from '@/assets/icons/main/blah-line.svg';
import useScale from '@/components/main/hooks/useScale';

function ExplainBackground({ children }) {
  const scale = useScale();

  // rem 값 계산 (1440px 기준, scale 적용)
  const widthRem = (1440 / 16) * scale;
  const minHeightRem = (1358 / 16) * scale;
  const paddingRem = (160 / 16) * scale;
  const paddingBottomRem = (70 / 16) * scale; // 하단 패딩 (기본값: 80px, 이전: 160px)
  const backgroundWidthRem = (1453 / 16) * scale;
  const containerPaddingRem = (175 / 16) * scale;

  // "IT'S SKU" 텍스트 위치 (임의로 조정 가능)
  const itsSkuTop = (115 / 16) * scale; // 상단에서의 거리 (기본값: 60px)
  const itsSkuLeft = (120 / 16) * scale; // 좌측에서의 거리 (기본값: 80px)
  const itsSkuFontSize = (24 / 16) * scale; // 폰트 크기 (기본값: 24px)

  // blah-line 위치 및 크기 (임의로 조정 가능)
  const blahLineTop = 38; // 상단에서의 거리 (% 단위, 기본값: 50% = 중앙)
  const blahLineLeft = 0; // 좌측에서의 거리 (% 단위, 기본값: 40% = 왼쪽으로 이동)
  const blahLineWidth = (1450 / 16) * scale; // 너비 (기본값: 2000px)
  const blahLineHeight = 'auto'; // 높이 (auto)

  return (
    <section
      className="relative w-full"
      style={{
        backgroundColor: '#ffffff',
        minHeight: `${minHeightRem}rem`,
        paddingTop: `${paddingRem}rem`,
        paddingBottom: `${paddingBottomRem}rem`,
        borderTopWidth: '0',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        overflow: 'hidden',
      }}
    >
      {/* 배경 - black dot pattern 및 이미지 */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0"
        style={{
          width: `${backgroundWidthRem}rem`,
          backgroundImage: `url(${blackDotSvg})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
          backgroundSize: 'contain',
          opacity: 0.7,
        }}
      >
        <img
          src={blackDotSvg}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0 opacity-[0.15]"
        />
      </div>

      {/* "IT'S SKU" 텍스트 - 좌측 상단 */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{
          top: `${itsSkuTop}rem`,
          left: `${itsSkuLeft}rem`,
          fontFamily: 'pixel, monospace',
          fontSize: `${itsSkuFontSize}rem`,
          color: '#1C1B1A',
          whiteSpace: 'nowrap',
        }}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
      >
        IT'S SKU
      </motion.div>

      {/* blah-line - 중앙 위치 */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: `${blahLineTop}%`,
          left: `${blahLineLeft}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 15,
        }}
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
      >
        <img
          src={blahLineIcon}
          alt="blah-line"
          style={{
            width: `${blahLineWidth}rem`,
            height: blahLineHeight,
            maxWidth: 'none',
            imageRendering: 'crisp-edges',
            transform: 'translateZ(0)',
          }}
        />
      </motion.div>

      {/* 컨테이너 */}
      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: `${widthRem}rem`,
          paddingLeft: `${containerPaddingRem}rem`,
          paddingRight: `${containerPaddingRem}rem`,
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default ExplainBackground;
