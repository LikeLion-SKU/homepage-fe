import { useEffect, useState } from 'react';

function TrackBackground({ children }) {
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

  // rem 값 계산 (1440x1024px 기준, scale 적용)
  const widthRem = (1440 / 16) * scale;
  const minHeightRem = (1024 / 16) * scale; // Track 섹션 높이: 1024px
  const paddingRem = (160 / 16) * scale;
  const containerPaddingRem = (175 / 16) * scale;

  return (
    <section
      className="relative w-full bg-white overflow-hidden"
      style={{
        minHeight: `${minHeightRem}rem`,
        paddingTop: `${paddingRem}rem`,
        paddingBottom: `${paddingRem}rem`,
      }}
    >
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

export default TrackBackground;
