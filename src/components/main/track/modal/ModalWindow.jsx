import ModalTitleBar from '@/components/main/schedule/modal/ModalTitleBar';

import ModalContent from './ModalContent';

function ModalWindow({
  title,
  trackType,

  titleBarBgColor,
  titleBarIconBoxColor,
  titleBarTitleBoxColor,
  titleBarBoxSize,

  windowBgColor = '#F9F9F9',
  windowBorderColor = '#1a1a1a',
  windowBorderWidth = 1,

  scale = 1,
  onClose,
}) {
  return (
    <div
      className="relative z-[1001] flex flex-col"
      style={{
        backgroundColor: windowBgColor,
        border: `${windowBorderWidth}px solid ${windowBorderColor}`,
        borderRadius: `${(32 / 16) * scale}rem`,
        width: `${(1012 / 16) * scale}rem`,
        height: `${(716 / 16) * scale}rem`,
        maxWidth: 'calc(100vw - 48px)',
        maxHeight: 'calc(100vh - 48px)',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: 'inset 0px 0px 8.3px 0px rgba(0, 0, 0, 0.47)',
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
        isTrackModal={true}
      />

      <ModalContent trackType={trackType} scale={scale} />

      {/* 하단 세 개의 파란색 사각형 */}
      <div
        className="flex items-center absolute pointer-events-none"
        style={{
          gap: `${(15 / 16) * scale}rem`,
          bottom: `${(35 / 16) * scale}rem`,
          right: `${(50 / 16) * scale}rem`,
          zIndex: 2,
        }}
      >
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              backgroundColor: '#1928B0',
              width: `${(24 / 16) * scale}rem`,
              height: `${(105 / 16) * scale}rem`,
              opacity: 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ModalWindow;
