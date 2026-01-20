function ModalContentPlaceholder({
  backgroundColor = '#636363',
  height = '400px',
  paddingHorizontal = '30px',
  paddingTop,
  contentImage,
  title,
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
        }}
      >
        {contentImage && (
          <img
            src={contentImage}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ModalContentPlaceholder;
