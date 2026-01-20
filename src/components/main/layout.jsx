import Frame from '@/components/layout/frame/Frame';

import useScale from './hooks/useScale';

function MainSectionLayout({
  title,
  children = null,
  showTopBorder = true,
  maxWidthScale = 1,
  minHeightScale = 1,
  paddingScale = 1,
  paddingBottomScale = 1,
  paddingBottomOffsetRem = 0,
}) {
  const scale = useScale();

  // rem 값 계산 (1440x1024px 기준, scale 적용)
  const widthRem = (1440 / 16) * scale * maxWidthScale;
  const minHeightRem = (960 / 16) * scale * minHeightScale;
  const paddingRem = (160 / 16) * scale * paddingScale;
  const paddingBottomRem = Math.max(
    0,
    (160 / 16) * scale * paddingScale * paddingBottomScale - paddingBottomOffsetRem * scale
  );
  const containerPaddingRem = (175 / 16) * scale;
  const borderWidthRem = (1 / 16) * scale;

  return (
    <section
      className="relative w-full bg-white overflow-hidden"
      style={{
        minHeight: `${minHeightRem}rem`,
        paddingTop: `${paddingRem}rem`,
        paddingBottom: `${paddingBottomRem}rem`,
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
        {/* 프레임만 absolute로 배치하여 위로 이동 */}
        <div
          style={{
            position: 'absolute',
            left: `${(120 / 16) * scale}rem`,
            top: `${(-60 / 16) * scale}rem`,
          }}
        >
          <Frame className="" cornerScale={0.9} borderWidth={2} letterSpacing={-0.88}>
            <div className="flex flex-col items-start justify-center w-full">
              <h2
                className="font-bold text-[#1a1a1a] m-0"
                style={{
                  fontSize: `${(36 / 16) * scale}rem`,
                  fontFamily:
                    'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontWeight: '700',
                }}
              >
                {title}
              </h2>
            </div>
          </Frame>
        </div>
        {/* children은 원래 위치 유지 */}
        <div style={{ paddingTop: `${(60 / 16) * scale}rem` }}>{children}</div>
      </div>
    </section>
  );
}

export default MainSectionLayout;
