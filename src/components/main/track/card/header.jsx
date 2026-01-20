import rightIcon from '@/assets/icons/right_icon.svg';
import useScale from '@/components/main/hooks/useScale';

import GridPattern from './GridPattern';

function CardHeader({ title }) {
  const scale = useScale();

  return (
    <GridPattern
      className="bg-white flex items-center relative"
      style={{
        padding: `${(20 / 16) * scale}rem ${(24 / 16) * scale}rem`,
        gap: `${(12 / 16) * scale}rem`,
      }}
    >
      <div
        className="bg-[#E0E0E0] flex items-center justify-center flex-shrink-0"
        style={{
          padding: `${(8 / 16) * scale}rem`,
          width: `${(32 / 16) * scale}rem`,
          height: `${(32 / 16) * scale}rem`,
        }}
      >
        <img
          src={rightIcon}
          alt="arrow"
          className="brightness-[0.3] saturate-0"
          style={{
            width: `${(16 / 16) * scale}rem`,
            height: `${(16 / 16) * scale}rem`,
          }}
        />
      </div>
      <span
        className="font-['Pretendard',_-apple-system,_BlinkMacSystemFont,_'system-ui',_sans-serif] font-bold text-[#1a1a1a] uppercase"
        style={{
          fontSize: `${(18 / 16) * scale}rem`,
          letterSpacing: `${(0.5 / 16) * scale}rem`,
        }}
      >
        {title}
      </span>
    </GridPattern>
  );
}

export default CardHeader;
