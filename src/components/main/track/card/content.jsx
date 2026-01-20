import useScale from '@/components/main/hooks/useScale';

import GridPattern from './GridPattern';

function CardContent({ description }) {
  const scale = useScale();

  if (!description) {
    return null;
  }

  return (
    <GridPattern
      className="bg-white"
      style={{
        padding: `${(24 / 16) * scale}rem`,
      }}
    >
      <p
        className="font-['Pretendard',_-apple-system,_BlinkMacSystemFont,_'system-ui',_sans-serif] text-[#1a1a1a] m-0 leading-[160%]"
        style={{
          fontSize: `${(16 / 16) * scale}rem`,
        }}
      >
        {description}
      </p>
    </GridPattern>
  );
}

export default CardContent;
