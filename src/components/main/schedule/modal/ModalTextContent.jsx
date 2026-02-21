import { memo } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

function ModalTextContent({
  className = '',
  style = {},
  title,
  description,
  titleColor = '#1a1a1a',
  descriptionColor = '#1a1a1a',
  backgroundColor = '#E8E8E8',
  scale = 1,
}) {
  const isMobile480 = useMediaQuery('(max-width: 480px)');

  // 모바일일 때 <br/> 태그를 공백으로 치환
  const processedDescription =
    isMobile480 && description ? description.replace(/<br\s*\/?>/gi, ' ') : description;

  return (
    <div
      className={className}
      style={{
        ...style, // flex 비율 받기
        backgroundColor,
        padding: `${(10 / 16) * scale}rem ${(20 / 16) * scale}rem`,
        paddingLeft: `${(25 / 16) * scale}rem`,
        paddingTop: `${(3 / 16) * scale}rem`,
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      {title && (
        <h3
          className="font-bold"
          style={{
            fontSize: `${(20 / 16) * scale}rem`,
            color: titleColor,
            marginBottom: `${(8 / 16) * scale}rem`,
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          }}
        >
          {title}
        </h3>
      )}

      {processedDescription && (
        <p
          style={{
            fontSize: `${(16 / 16) * scale}rem`,
            color: descriptionColor,
            lineHeight: 1.6,
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            margin: 0,
            width: isMobile480 ? '100%' : 'auto',
            maxWidth: isMobile480 ? '100%' : 'none',
            whiteSpace: 'normal',
            wordBreak: isMobile480 ? 'break-word' : 'normal',
            overflowWrap: isMobile480 ? 'break-word' : 'normal',
          }}
          dangerouslySetInnerHTML={{ __html: processedDescription }}
        />
      )}
    </div>
  );
}

export default memo(ModalTextContent);
