import rightIcon from '@/assets/icons/right_icon.svg';
import useScale from '@/components/main/hooks/useScale';

import GridPattern from './GridPattern';

function CardHeader({ title }) {
  const scale = useScale();

  return (
    <GridPattern
      className="bg-white flex items-center relative"
      style={{
        padding: `${(16 / 16) * scale}rem ${(22 / 16) * scale}rem`,
        gap: `${(14 / 16) * scale}rem`,
      }}
    >
      <div
        className="bg-[#FFFFFF] absolute"
        style={{
          width: `${(380 / 16) * scale}rem`,
          height: `${(40 / 16) * scale}rem`,
          left: `${(22 / 16) * scale}rem`,
          top: `${(16 / 16) * scale}rem`,
          zIndex: 1,
        }}
      />
      <div
        className="bg-[#c6e400] flex items-center justify-center flex-shrink-0 relative"
        style={{
          padding: `${(8 / 16) * scale}rem`,
          width: `${(40 / 16) * scale}rem`,
          height: `${(40 / 16) * scale}rem`,
          zIndex: 2,
        }}
      >
        <img
          src={rightIcon}
          alt="arrow"
          className="brightness-[0.3] saturate-0"
          style={{
            width: `${(24 / 16) * scale}rem`,
            height: `${(18 / 16) * scale}rem`,
          }}
        />
      </div>
      <span
        className="font-['Pretendard',_-apple-system,_BlinkMacSystemFont,_'system-ui',_sans-serif] font-bold text-[var(--color-navy-blue)] uppercase relative"
        style={{
          fontSize: `${(18 / 16) * scale}rem`,
          letterSpacing: `${(0.5 / 16) * scale}rem`,
          zIndex: 2,
        }}
      >
        {title}
      </span>
    </GridPattern>
  );
}

export default CardHeader;
