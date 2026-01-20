import useScale from '@/components/main/hooks/useScale';

function AwardBackground({ children }) {
  const scale = useScale();

  // rem 값 계산 (1440x1024px 기준, scale 적용)
  const widthRem = (1440 / 16) * scale;
  const minHeightRem = (1024 / 16) * scale; // Award 섹션 높이: 1024px
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

export default AwardBackground;
