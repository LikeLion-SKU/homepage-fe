import { useEffect, useState } from 'react';

import blackDotSvg from '@/assets/icons/black-dot.svg';
import SmallFrameBox from '@/components/layout/frame/Frame';

// 기본 크기 (1440px 기준) - rem 단위로 변환
const BASE_WIDTH_PX = 1440;
const BASE_WIDTH_REM = BASE_WIDTH_PX / 16; // 90rem

function Explain() {
  const [scale, setScale] = useState(1);

  // 화면 크기에 따라 scale 계산 (rem 단위 기준)
  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      // 화면 너비에 맞춰 비율로 조정 (1440px 기준)
      const calculatedScale = windowWidth / (BASE_WIDTH_PX * (rootFontSize / 16));
      setScale(calculatedScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // rem 값 계산 (1440px 기준, scale 적용)
  const widthRem = BASE_WIDTH_REM * scale;
  const minHeightRem = (1358 / 16) * scale;
  const paddingRem = (160 / 16) * scale;
  const borderRadiusRem = (42 / 16) * scale;
  const borderWidthRem = (1 / 16) * scale;
  const backgroundWidthRem = (1453 / 16) * scale;
  const containerPaddingRem = (175 / 16) * scale;

  return (
    <section
      className="relative w-full mx-auto bg-[#d9d9d9] overflow-hidden"
      style={{
        maxWidth: `${widthRem}rem`,
        minHeight: `${minHeightRem}rem`,
        paddingTop: `${paddingRem}rem`,
        paddingBottom: `${paddingRem}rem`,
        borderTopWidth: `${borderWidthRem}rem`,
        borderBottomWidth: `${borderWidthRem}rem`,
        borderTopColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderRadius: `${borderRadiusRem}rem`,
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
        <SmallFrameBox className="mb-12" cornerScale={0.9} borderWidth={2}>
          <div className="flex flex-col items-start justify-center w-full">
            <h2
              className="font-bold text-[#1a1a1a] m-0"
              style={{ fontSize: `${(36 / 16) * scale}rem` }}
            >
              서경대학교 멋쟁이사자처럼
            </h2>
          </div>
        </SmallFrameBox>
      </div>
    </section>
  );
}

export default Explain;
