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
  return (
    <div
      className={className}
      style={{
        ...style, // flex 비율 받기
        backgroundColor,
        padding: `${(16 / 16) * scale}rem ${(20 / 16) * scale}rem`,
        paddingLeft: `${(45 / 16) * scale}rem`,
        paddingTop: `${(5 / 16) * scale}rem`,
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

      {description && (
        <p
          style={{
            fontSize: `${(16 / 16) * scale}rem`,
            color: descriptionColor,
            lineHeight: 1.6,
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default ModalTextContent;
