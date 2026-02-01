function ModalContentPlaceholder({
  className = '',
  style = {},
  backgroundColor = '#636363',
  paddingHorizontal = '30px',
  paddingTop,
  paddingBottom,
  contentImage,
  title,
  scale = 1,
  forceFill = false,
}) {
  return (
    <div
      className={className}
      style={{
        ...style,
        width: '100%',
        height: forceFill ? '100%' : 'auto',
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop: paddingTop !== undefined ? paddingTop : paddingHorizontal,
        paddingBottom: paddingBottom !== undefined ? paddingBottom : paddingHorizontal,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          height: forceFill ? '100%' : '100%',
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: `${(10 / 16) * scale}rem`,
          flex: 1,
          minHeight: 0,
        }}
      >
        {contentImage && (
          <img
            src={contentImage}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ModalContentPlaceholder;
