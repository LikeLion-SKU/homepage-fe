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
        width: `${(480 / 16) * scale}rem`,
        maxWidth: `${(480 / 16) * scale}rem`,
        minWidth: `${(480 / 16) * scale}rem`,
        minHeight: `${(560 / 16) * scale}rem`,
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      {/* 좌측 상단 사각형들 */}
      <div
        className="flex items-center absolute"
        style={{
          gap: 0,
          display: 'inline-flex',
          top: `${(42 / 16) * scale}rem`,
          left: `${(30 / 16) * scale}rem`,
          zIndex: 10,
        }}
      >
        <div
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: titleBarIconBoxColor,
            width: `${(38 / 16) * scale * (titleBarBoxSize || 1)}rem`,
            height: `${(21 / 16) * scale * (titleBarBoxSize || 1)}rem`,
            fontFamily: "'pixel', monospace",
            color: '#F8F8F8',
            fontSize: `${(20 / 16) * scale * (titleBarBoxSize || 1)}rem`,
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: `translateY(-${(10 / 16) * scale * (titleBarBoxSize || 1)}rem)`,
              fontWeight: 'bold',
            }}
          >
            →
          </span>
        </div>
      </div>
      {/* 우측 상단 사각형들 */}
      <div
        className="flex items-center absolute"
        style={{
          gap: 0,
          display: 'inline-flex',
          top: `${(42 / 16) * scale}rem`,
          right: `${(30 / 16) * scale}rem`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: titleBarTitleBoxColor,
            width: `${(38 / 16) * scale * (titleBarBoxSize || 1)}rem`,
            height: `${(21 / 16) * scale * (titleBarBoxSize || 1)}rem`,
          }}
        />
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: titleBarIconBoxColor,
            width: `${(38 / 16) * scale * (titleBarBoxSize || 1)}rem`,
            height: `${(21 / 16) * scale * (titleBarBoxSize || 1)}rem`,
          }}
        />
      </div>
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
              backgroundColor: '#B3B3B3',
              width: `${(22 / 16) * scale}rem`,
              height: `${(100 / 16) * scale}rem`,
              opacity: 0.3,
              marginRight: `${(12 / 16) * scale}rem`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ModalWindow;
