import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function CardContent({ description }) {
  const scale = useScale();
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 1199px)');

  if (!description) {
    return null;
  }

  // description이 객체인 경우 (paragraph1, paragraph2, paragraph3)
  if (typeof description === 'object' && description !== null) {
    const { paragraph1, paragraph2, paragraph3, gap = '0.5rem', gap2 = '0.25rem' } = description;

    // padding 값 계산
    const pad = isMobile ? 20 : isTablet ? 50 : 24;
    const padX = isMobile ? 20 : isTablet ? 0 : 24;

    return (
      <div
        className={`bg-transparent flex flex-col ${isTablet ? 'justify-start' : 'justify-center'}`}
        style={{
          // 4방향 명시 (shorthand 금지)
          paddingTop: isTablet ? `${(38 / 16) * scale}rem` : `${(pad / 16) * scale}rem`,
          paddingRight: isTablet ? `${(40 / 16) * scale}rem` : `${(padX / 16) * scale}rem`,
          paddingBottom: `${(pad / 16) * scale}rem`,
          paddingLeft: isTablet ? `${(10 / 16) * scale}rem` : `${(padX / 16) * scale}rem`,
          transform: isMobile
            ? `translateY(${(-65 / 16) * scale}rem)`
            : isTablet
              ? `translateX(${(-30 / 16) * scale}rem)`
              : undefined,
          height: isTablet ? '100%' : 'auto',
        }}
      >
        <div
          className={`font-['Pretendard',_-apple-system,_BlinkMacSystemFont,_'system-ui',_sans-serif] font-medium text-[#1a1a1a] leading-[160%] text-left ${isTablet ? 'break-normal' : 'break-words'}`}
          style={{
            fontSize: isMobile
              ? `${(35 / 16) * scale}rem`
              : isTablet
                ? `${(17.5 / 16) * scale}rem`
                : `${(16 / 16) * scale}rem`,
            paddingLeft: isMobile ? `${(30 / 16) * scale}rem` : '0',
            wordBreak: isTablet ? 'normal' : 'break-word',
            overflowWrap: isTablet ? 'normal' : 'break-word',
            width: isTablet ? '100%' : 'auto',
            minWidth: isTablet ? 0 : 'auto',
            overflow: isTablet ? 'visible' : 'auto',
          }}
        >
          {paragraph1 && (
            <p className="m-0" style={{ marginBottom: gap, textIndent: `${(6 / 16) * scale}rem` }}>
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
            <p className="m-0" style={{ marginBottom: gap2, textIndent: `${(6 / 16) * scale}rem` }}>
              {paragraph2.includes('공유하는') && paragraph2.includes('워크숍') ? (
                <>
                  {paragraph2.split('공유하는')[0]}공유하는
                  <br />
                  워크숍{paragraph2.split('워크숍')[1]}
                </>
              ) : (
                paragraph2
              )}
            </p>
          )}
          {paragraph3 && (
            <p className="m-0" style={{ textIndent: `${(6 / 16) * scale}rem` }}>
              {paragraph3}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default CardContent;
