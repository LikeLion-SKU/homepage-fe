import rightIcon from '@/assets/icons/right_icon.svg';
import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

import GridPattern from './GridPattern';

function CardHeader({ title }) {
  const scale = useScale();
  const isMobile = useMediaQuery('(max-width: 460px)');

  return (
    <GridPattern
      className="bg-[#FAFBF8] flex items-center relative overflow-hidden"
      style={{
        padding: isMobile
          ? `${(35 / 16) * scale}rem ${(28 / 16) * scale}rem`
          : `${(16 / 16) * scale}rem ${(22 / 16) * scale}rem`,
        gap: isMobile ? `${(28 / 16) * scale}rem` : `${(14 / 16) * scale}rem`,
      }}
    >
      <div
        className="bg-[#FFFFFF] absolute"
        style={{
          // 가로 길이를 더 늘려 헤더 안 텍스트 영역을 넉넉하게
          width: `calc(100% - ${isMobile ? (40 / 16) * scale : (32 / 16) * scale}rem)`,
          maxWidth: `${isMobile ? (950 / 16) * scale : (380 / 16) * scale}rem`,
          height: `${isMobile ? (80 / 16) * scale : (40 / 16) * scale}rem`,
          left: `${isMobile ? (70 / 16) * scale : (23 / 16) * scale}rem`,
          top: `${isMobile ? (35 / 16) * scale : (16 / 16) * scale}rem`,
          zIndex: 1,
        }}
      />
      <div
        className="bg-[#c6e400] flex items-center justify-center flex-shrink-0 relative"
        style={{
          padding: `${isMobile ? (10 / 16) * scale : (8 / 16) * scale}rem`,
          width: `${isMobile ? (80 / 16) * scale : (40 / 16) * scale}rem`,
          height: `${isMobile ? (80 / 16) * scale : (40 / 16) * scale}rem`,
          marginLeft: isMobile ? `${(40 / 16) * scale}rem` : '0',
          zIndex: 2,
        }}
      >
        <img
          src={rightIcon}
          alt="arrow"
          className="brightness-[0.3] saturate-0"
          style={{
            width: `${isMobile ? (40 / 16) * scale : (24 / 16) * scale}rem`,
            height: `${isMobile ? (42 / 16) * scale : (18 / 16) * scale}rem`,
          }}
        />
      </div>
      <span
        className="font-['Pretendard',_-apple-system,_BlinkMacSystemFont,_'system-ui',_sans-serif] font-bold text-[var(--color-navy-blue)] uppercase relative"
        style={{
          fontSize: `${isMobile ? (40 / 16) * scale : (18 / 16) * scale}rem`,
          letterSpacing: `${isMobile ? (0.6 / 16) * scale : (0.5 / 16) * scale}rem`,
          zIndex: 2,
        }}
      >
        {title}
      </span>
    </GridPattern>
  );
}

export default CardHeader;
