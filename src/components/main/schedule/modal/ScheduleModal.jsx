import ReactDOM from 'react-dom';

import useScale from '@/components/main/hooks/useScale';

import ModalOverlay from './ModalOverlay';
import ModalWindow from './ModalWindow';

function ScheduleModal({
  isOpen,
  onClose,
  title = '3월',
  contentImage,
  contentTitle,
  contentDescription,
  // Overlay props
  overlayBgColor,
  overlayOpacity,
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
  // Indicators props
  // Window props
  windowBgColor,
  windowBorderColor,
  windowBorderWidth,
  scale: customScale,
}) {
  const scale = useScale();
  const finalScale = customScale !== undefined ? customScale : scale;
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <ModalOverlay onClick={onClose} backgroundColor={overlayBgColor} opacity={overlayOpacity} />
      {/* 모달 창 크기만큼의 배경 사각형 (오른쪽 5px, 아래 5px 오프셋) */}
      <div className="relative">
        <div
          style={{
            position: 'absolute',
            top: `${(6 / 16) * finalScale}rem`,
            left: `${(18 / 16) * finalScale}rem`,
            backgroundColor: '#00156A',
            maxWidth: `${(480 / 16) * finalScale}rem`,
            width: '97%',
            minWidth: '280px',
            minHeight: `${(560 / 16) * finalScale}rem`,
            maxHeight: '90vh',
            zIndex: 0,
          }}
        />
        <ModalWindow
          title={title}
          contentImage={contentImage}
          contentTitle={contentTitle}
          contentDescription={contentDescription}
          titleBarBgColor={titleBarBgColor}
          titleBarIconBoxColor={titleBarIconBoxColor}
          titleBarTitleBoxColor={titleBarTitleBoxColor}
          titleBarBoxSize={titleBarBoxSize}
          placeholderBgColor={placeholderBgColor}
          placeholderHeight={placeholderHeight}
          placeholderPaddingHorizontal={placeholderPaddingHorizontal}
          placeholderPaddingTop={placeholderPaddingTop}
          textTitleColor={textTitleColor}
          textDescriptionColor={textDescriptionColor}
          textBgColor={textBgColor}
          windowBgColor={windowBgColor}
          windowBorderColor={windowBorderColor}
          windowBorderWidth={windowBorderWidth}
          scale={finalScale}
          onClose={onClose}
        />
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}

export default ScheduleModal;
