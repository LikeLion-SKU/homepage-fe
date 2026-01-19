import { useEffect, useState } from 'react';

import blackDotSvg from '@/assets/icons/black-dot.svg';

function ExplainBackground({ children }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth;
      const baseWidth = 1440;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const calculatedScale = windowWidth / (baseWidth * (rootFontSize / 16));
      setScale(calculatedScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // rem 값 계산 (1440px 기준, scale 적용)
  const widthRem = (1440 / 16) * scale;
  const minHeightRem = (1358 / 16) * scale;
  const paddingRem = (160 / 16) * scale;
  const borderRadiusRem = (42 / 16) * scale;
  const borderWidthRem = (1 / 16) * scale;
  const backgroundWidthRem = (1453 / 16) * scale;
  const containerPaddingRem = (175 / 16) * scale;

  return (
    <section
      className="relative w-full bg-[#d9d9d9] overflow-hidden"
      style={{
        minHeight: `${minHeightRem}rem`,
        paddingTop: `${paddingRem}rem`,
        paddingBottom: `${paddingRem}rem`,
        borderTopWidth: '0',
        borderBottomWidth: `${borderWidthRem}rem`,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomStyle: 'solid',
        borderTopLeftRadius: `${borderRadiusRem}rem`,
        borderTopRightRadius: `${borderRadiusRem}rem`,
        borderBottomLeftRadius: `${borderRadiusRem}rem`,
        borderBottomRightRadius: `${borderRadiusRem}rem`,
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
        }}
      >
        <img
          src={blackDotSvg}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0 opacity-[0.02]"
        />
      </div>

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
