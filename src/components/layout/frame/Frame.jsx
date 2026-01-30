import { useEffect, useState } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

function Frame({
  children,
  className = '',
  cornerScale = 1,
  borderWidth = 2,
  letterSpacing = -0.88,
  color = 'black',
  paddingX = null, // 가로 padding 커스텀 (null이면 기본값 사용)
  paddingY = null, // 세로 padding 커스텀 (null이면 기본값 사용)
  disableMobileScale = false, // 모바일 크기 조정 비활성화
}) {
  const [scale, setScale] = useState(1);
  const isMobile = useMediaQuery('(max-width: 460px)');

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
    // 모바일일 때 scale 팩터를 1.7배로 증가시켜 더 크게 보이게 함 (disableMobileScale이 false일 때만)
    const mobileScaleFactor = isMobile && !disableMobileScale ? 1.7 : 1;
    // useFullScale이 true면 0.6 팩터 없이 전체 scale 적용 (콘텐츠와 같은 비율)
    const scaledPx = useScale
      ? useFullScale
        ? px * scale * mobileScaleFactor
        : px * scale * 0.6 * mobileScaleFactor
      : px * mobileScaleFactor;
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
      <div
        style={{
          fontSize: isMobile && !disableMobileScale ? '1.5em' : '1em',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Frame;
