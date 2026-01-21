import useScale from '@/components/main/hooks/useScale';

function CardContent({ description }) {
  const scale = useScale();

  if (!description) {
    return null;
  }

  return (
    <div
      className="bg-transparent"
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
    </div>
  );
}

export default CardContent;
