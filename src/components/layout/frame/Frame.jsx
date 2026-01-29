import { useEffect, useState } from 'react';

function Frame({
  children,
  className = '',
  cornerScale = 1,
  borderWidth = 2,
  letterSpacing = -0.88,
  color = 'black',
  paddingX = null, // 가로 padding 커스텀 (null이면 기본값 사용)
  paddingY = null, // 세로 padding 커스텀 (null이면 기본값 사용)
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
  const pxToRem = (px, useScale = true, useFullScale = false) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    // useFullScale이 true면 0.6 팩터 없이 전체 scale 적용 (콘텐츠와 같은 비율)
    const scaledPx = useScale ? (useFullScale ? px * scale : px * scale * 0.6) : px;
    return scaledPx / rootFontSize;
  };

  // 폰트 크기에 따른 모서리 크기 자율 조정
  const cornerSize = pxToRem(17 * cornerScale);
  const cornerOffset = pxToRem(9 * cornerScale);

  // borderWidth를 rem으로 변환 (전체 scale 적용하여 콘텐츠와 같은 비율로 축소)
  const borderWidthRem = pxToRem(borderWidth, true, true); // 전체 scale 적용하여 반응형으로

  // padding 계산
  const paddingTopBottom = paddingY !== null ? paddingY : pxToRem(12);
  const paddingLeftRight = paddingX !== null ? paddingX : pxToRem(20);

  return (
    <div
      className={`relative inline-block border ${className}`}
      style={{
        padding: `${paddingTopBottom}rem ${paddingLeftRight}rem`,
        borderWidth: `${borderWidthRem}rem`,
        borderColor: color,
        letterSpacing: `${letterSpacing}px`,
      }}
    >
      {/* 모서리 코너 */}
      <div
        className="absolute border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          top: `-${cornerOffset}rem`,
          left: `-${cornerOffset}rem`,
          backgroundColor: color,
          borderColor: color,
        }}
      />
      <div
        className="absolute border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          top: `-${cornerOffset}rem`,
          right: `-${cornerOffset}rem`,
          backgroundColor: color,
          borderColor: color,
        }}
      />
      <div
        className="absolute border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          bottom: `-${cornerOffset}rem`,
          left: `-${cornerOffset}rem`,
          backgroundColor: color,
          borderColor: color,
        }}
      />
      <div
        className="absolute border"
        style={{
          width: `${cornerSize}rem`,
          height: `${cornerSize}rem`,
          bottom: `-${cornerOffset}rem`,
          right: `-${cornerOffset}rem`,
          backgroundColor: color,
          borderColor: color,
        }}
      />
      {children}
    </div>
  );
}

export default Frame;
