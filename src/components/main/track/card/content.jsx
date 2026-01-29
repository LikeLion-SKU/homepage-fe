import useScale from '@/components/main/hooks/useScale';

function CardContent({ description }) {
  const scale = useScale();

  if (!description) {
    return null;
  }

  // description이 객체인 경우 (paragraph1, paragraph2, paragraph3)
  if (typeof description === 'object' && description !== null) {
    const { paragraph1, paragraph2, paragraph3, gap = '0.5rem', gap2 = '0.25rem' } = description;

    return (
      <div
        className="bg-transparent"
        style={{
          padding: `${(24 / 16) * scale}rem`,
        }}
      >
        <div
          className="font-['Pretendard',_-apple-system,_BlinkMacSystemFont,_'system-ui',_sans-serif] text-[#1a1a1a] leading-[160%]"
          style={{
            fontSize: `${(16 / 16) * scale}rem`,
          }}
        >
          {paragraph1 && (
            <p className="m-0" style={{ marginBottom: gap }}>
              {paragraph1}
            </p>
          )}
          {paragraph2 && (
            <p className="m-0" style={{ marginBottom: gap2 }}>
              {paragraph2}
            </p>
          )}
          {paragraph3 && <p className="m-0">{paragraph3}</p>}
        </div>
      </div>
    );
  }
}

export default CardContent;
