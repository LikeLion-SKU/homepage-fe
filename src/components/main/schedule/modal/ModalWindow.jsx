import ModalContentPlaceholder from './ModalContentPlaceholder';
import ModalTextContent from './ModalTextContent';
import ModalTitleBar from './ModalTitleBar';

function ModalWindow({
  title,
  contentImage,
  contentTitle,
  contentDescription,
  // TitleBar props
  titleBarBgColor,
  titleBarIconBoxColor,
  titleBarTitleBoxColor,
  titleBarBoxSize,
  // ContentPlaceholder props
  placeholderBgColor,
  placeholderHeight,
  placeholderPaddingHorizontal,
  placeholderPaddingTop,
  // TextContent props
  textTitleColor,
  textDescriptionColor,
  textBgColor,
  // Window props
  windowBgColor = '#FFFFFF',
  windowBorderColor = '#1a1a1a',
  windowBorderWidth = 1,
  scale = 1,
  onClose,
}) {
  return (
    <div
      className="relative z-[1001]"
      style={{
        backgroundColor: windowBgColor,
        border: `${windowBorderWidth}px solid ${windowBorderColor}`,
        borderRadius: `${(32 / 16) * scale}rem`,
        width: `${(468 / 16) * scale}rem`,
        maxWidth: `${(468 / 16) * scale}rem`,
        minWidth: `${(468 / 16) * scale}rem`,
        height: `${(552 / 16) * scale}rem`,
        minHeight: `${(552 / 16) * scale}rem`,
        maxHeight: `${(552 / 16) * scale}rem`,
        overflow: 'auto',
        flexShrink: 0,
      }}
    >
      <ModalTitleBar
        title={title}
        backgroundColor={titleBarBgColor}
        iconBoxColor={titleBarIconBoxColor}
        titleBoxColor={titleBarTitleBoxColor}
        boxSize={titleBarBoxSize}
        onClose={onClose}
        scale={scale}
      />
      <ModalContentPlaceholder
        backgroundColor={placeholderBgColor}
        height={placeholderHeight}
        paddingHorizontal={placeholderPaddingHorizontal}
        paddingTop={placeholderPaddingTop}
        contentImage={contentImage}
        title={title}
        scale={scale}
      />
      <ModalTextContent
        title={contentTitle}
        description={contentDescription}
        titleColor={textTitleColor}
        descriptionColor={textDescriptionColor}
        backgroundColor={textBgColor}
        scale={scale}
      />
      {/* 우측 하단 사각형들 */}
      <div
        className="flex items-center absolute"
        style={{
          gap: `${(1 / 16) * scale}rem`,
          display: 'inline-flex',
          bottom: `${(16 / 16) * scale}rem`,
          right: `${(36 / 16) * scale}rem`,
          top: `${(420 / 16) * scale}rem`,
          zIndex: 2,
        }}
      >
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              backgroundColor: '#1928B0',
              width: `${(22 / 16) * scale}rem`,
              height: `${(100 / 16) * scale}rem`,
              opacity: 0.1,
              marginRight: `${(12 / 16) * scale}rem`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ModalWindow;
