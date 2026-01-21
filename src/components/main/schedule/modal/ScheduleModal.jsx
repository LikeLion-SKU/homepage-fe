import ReactDOM from 'react-dom';

import useScale from '@/components/main/hooks/useScale';

import ModalOverlay from './ModalOverlay';
import ModalWindow from './ModalWindow';

function ScheduleModal({
  isOpen,
  onClose,
  modalData = [], // 배열 형태로 받음: [{ title, contentImage, contentTitle, contentDescription }, ...]
  modalGap = 32, // 두 모달 사이 gap (px)
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
  if (!isOpen || !modalData || modalData.length === 0) return null;

  // 최대 2개까지만 표시
  const modalsToShow = modalData.slice(0, 2);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <ModalOverlay onClick={onClose} backgroundColor={overlayBgColor} opacity={overlayOpacity} />
      <div
        className="flex items-center"
        style={{
          gap: `${(modalGap / 16) * finalScale}rem`,
          flexWrap: 'nowrap',
        }}
      >
        {modalsToShow.map((data, index) => (
          <ModalWindow
            key={index}
            title={data.title}
            contentImage={data.contentImage}
            contentTitle={data.contentTitle}
            contentDescription={data.contentDescription}
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
        ))}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}

export default ScheduleModal;
