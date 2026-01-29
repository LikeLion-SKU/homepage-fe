function ModalContentPlaceholder({
  backgroundColor = '#636363',
  height = '400px',
  paddingHorizontal = '30px',
  paddingTop,
  contentImage,
  title,
  scale = 1,
}) {
  return (
    <div
      style={{
        width: '100%',
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop: paddingTop !== undefined ? paddingTop : paddingHorizontal,
        paddingBottom: paddingHorizontal,
      }}
    >
      <div
        style={{
          width: '100%',
          height,
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: `${(10 / 16) * scale}rem`,
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
