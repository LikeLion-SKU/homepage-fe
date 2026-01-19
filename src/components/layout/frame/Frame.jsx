import { useEffect, useState } from 'react';

function Frame({
  children,
  className = '',
  cornerScale = 1,
  borderWidth = 2,
  letterSpacing = -0.88,
}) {
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

  // px를 rem으로 변환하는 헬퍼 함수
  const pxToRem = (px, useScale = true) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const scaledPx = useScale ? px * scale * 0.6 : px; // 0.6 scale 적용
    return scaledPx / rootFontSize;
  };

  // 폰트 크기에 따른 모서리 크기 자율 조정
  const cornerSize = pxToRem(17 * cornerScale);
  const cornerOffset = pxToRem(9 * cornerScale);

  // borderWidth를 rem으로 변환
  const borderWidthRem = pxToRem(borderWidth, false); // scale 적용 안 함
  const letterSpacingRem = pxToRem(letterSpacing, false); // scale 적용 안 함

  return (
    <div
      className={`relative border-black inline-block ${className}`}
      style={{
        padding: `${pxToRem(12)}rem ${pxToRem(20)}rem`,
        borderWidth: `${borderWidthRem}rem`,
        letterSpacing: `${letterSpacingRem}rem`,
      }}
    >
      {/* 모서리 코너 */}
      <div
        className="absolute bg-black border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          top: `-${cornerOffset}rem`,
          left: `-${cornerOffset}rem`,
        }}
      />
      <div
        className="absolute bg-black border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          top: `-${cornerOffset}rem`,
          right: `-${cornerOffset}rem`,
        }}
      />
      <div
        className="absolute bg-black border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          bottom: `-${cornerOffset}rem`,
          left: `-${cornerOffset}rem`,
        }}
      />
      <div
        className="absolute bg-black border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          bottom: `-${cornerOffset}rem`,
          right: `-${cornerOffset}rem`,
        }}
      />
      {children}
    </div>
  );
}

export default Frame;
