import { useEffect, useState } from 'react';

import Frame from '@/components/layout/frame/Frame';

function MainSectionLayout({ title, children = null, showTopBorder = true }) {
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
  const minHeightRem = (1024 / 16) * scale;
  const paddingRem = (160 / 16) * scale;
  const containerPaddingRem = (175 / 16) * scale;
  const borderWidthRem = (1 / 16) * scale;

  return (
    <section
      className="relative w-full bg-white overflow-hidden"
      style={{
        minHeight: `${minHeightRem}rem`,
        paddingTop: `${paddingRem}rem`,
        paddingBottom: `${paddingRem}rem`,
        borderTopWidth: showTopBorder ? `${borderWidthRem}rem` : '0',
        borderTopColor: showTopBorder ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        borderTopStyle: showTopBorder ? 'solid' : 'none',
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
        <Frame className="mb-12" cornerScale={0.9} borderWidth={2} letterSpacing={-0.88}>
          <div className="flex flex-col items-start justify-center w-full">
            <h2
              className="font-bold text-[#1a1a1a] m-0"
              style={{
                fontSize: `${(36 / 16) * scale}rem`,
                fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: '700',
              }}
            >
              {title}
            </h2>
          </div>
        </Frame>
        {children}
      </div>
    </section>
  );
}

export default MainSectionLayout;
