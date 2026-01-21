import blackDotSvg from '@/assets/icons/black-dot.svg';
import useScale from '@/components/main/hooks/useScale';

function ExplainBackground({ children }) {
  const scale = useScale();

  // rem 값 계산 (1440px 기준, scale 적용)
  const widthRem = (1440 / 16) * scale;
  const minHeightRem = (1358 / 16) * scale;
  const paddingRem = (160 / 16) * scale;
  const borderRadiusRem = (42 / 16) * scale;
  const borderWidthRem = (1 / 16) * scale;
  const backgroundWidthRem = (1453 / 16) * scale;
  const containerPaddingRem = (175 / 16) * scale;

  // "IT'S SKU" 텍스트 위치 (임의로 조정 가능)
  const itsSkuTop = (115 / 16) * scale; // 상단에서의 거리 (기본값: 60px)
  const itsSkuLeft = (120 / 16) * scale; // 좌측에서의 거리 (기본값: 80px)
  const itsSkuFontSize = (24 / 16) * scale; // 폰트 크기 (기본값: 24px)

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: '#f9f9f9',
        minHeight: `${minHeightRem}rem`,
        paddingTop: `${paddingRem}rem`,
        paddingBottom: `${paddingRem}rem`,
        borderTopWidth: '0',
        borderBottomWidth: `${borderWidthRem}rem`,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomStyle: 'solid',
        borderTopLeftRadius: `${borderRadiusRem}rem`,
        borderTopRightRadius: `${borderRadiusRem}rem`,
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
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
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          top: `${itsSkuTop}rem`,
          left: `${itsSkuLeft}rem`,
          fontFamily: 'pixel, monospace',
          fontSize: `${itsSkuFontSize}rem`,
          color: '#1C1B1A',
          whiteSpace: 'nowrap',
        }}
      >
        IT'S SKU
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
