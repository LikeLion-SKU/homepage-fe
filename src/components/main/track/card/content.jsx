import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function CardContent({ description }) {
  const scale = useScale();
  const isMobile = useMediaQuery('(max-width: 460px)');

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
          padding: isMobile ? `${(20 / 16) * scale}rem` : `${(24 / 16) * scale}rem`,
          transform: isMobile ? `translateY(${(-65 / 16) * scale}rem)` : 'none',
        }}
      >
        <div
          className="font-['Pretendard',_-apple-system,_BlinkMacSystemFont,_'system-ui',_sans-serif] text-[#1a1a1a] leading-[160%] text-left break-words"
          style={{
            fontSize: isMobile ? `${(35 / 16) * scale}rem` : `${(16 / 16) * scale}rem`,
            paddingLeft: isMobile ? `${(30 / 16) * scale}rem` : '0',
          }}
        >
          {paragraph1 && (
            <p className="m-0" style={{ marginBottom: gap }}>
              {isMobile && paragraph1.includes('문제점') ? (
                <>
                  {paragraph1.split('문제점')[0]}
                  <br />
                  문제점{paragraph1.split('문제점')[1]}
                </>
              ) : (
                paragraph1
              )}
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
