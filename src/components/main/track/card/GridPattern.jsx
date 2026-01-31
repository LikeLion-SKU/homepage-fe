import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function GridPattern({ className = '', style = {}, children = null }) {
  const scale = useScale();
  const isMobile = useMediaQuery('(max-width: 480px)');

  // 모바일에서는 scale을 적용하지 않고 고정값 사용 (웹과 동일한 격자 크기)
  const gridSize = isMobile ? `${20 / 16}rem` : `${(20 / 16) * scale}rem`;
  const bgPositionX = isMobile ? `${-3 / 16}rem` : `${(-3 / 16) * scale}rem`;
  const bgPositionY = isMobile ? `${1 / 16}rem` : `${(1 / 16) * scale}rem`;

  return (
    <div
      className={className}
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 23%, rgba(230, 230, 230, 1) 24%, rgba(230, 230, 230, 1) 26%, transparent 27%),
          linear-gradient(90deg, transparent 23%, rgba(230, 230, 230, 1) 24%, rgba(230, 230, 230, 1) 26%, transparent 27%)
        `,
        backgroundSize: `${gridSize} ${gridSize}`,
        backgroundPosition: `${bgPositionX} ${bgPositionY}`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'local',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default GridPattern;
