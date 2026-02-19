import ModalTitleBar from '@/components/main/schedule/modal/ModalTitleBar';
import useMediaQuery from '@/hooks/useMediaQuery';

import ModalContent from './ModalContent';

function ModalWindow({
  title,
  trackType,

  titleBarBgColor,
  titleBarIconBoxColor,
  titleBarTitleBoxColor,
  titleBarBoxSize,

  windowBgColor = '#F9F9F9',
  // eslint-disable-next-line no-unused-vars
  windowBorderColor = '#1a1a1a',
  // eslint-disable-next-line no-unused-vars
  windowBorderWidth = 1,

  scale = 1,
  onClose,
}) {
  const isMobile760 = useMediaQuery('(max-width: 760px)');
  const isMobile480 = useMediaQuery('(max-width: 480px)');

  // 화면 크기에 따라 다른 기준 크기 사용
  // 480px 이하: 480px 기준, 375x525
  // 481px~760px: 760px 기준, 592x663
  // 760px 이상: 1440px 기준, 1012x716
  const BASE_W = isMobile480 ? 375 : isMobile760 ? 592 : 1012;
  const BASE_H = isMobile480 ? 525 : isMobile760 ? 663 : 716;

  return (
    <div
      className="relative flex flex-col"
      style={{
        backgroundColor: windowBgColor,
        border: 'none',
        borderRadius: `${(32 / 16) * scale}rem`,
        width: `${(BASE_W / 16) * scale}rem`,
        height: `${(BASE_H / 16) * scale}rem`,
        maxWidth: 'calc(100vw - 48px)',
        maxHeight: 'calc(100vh - 48px)',
        overflow: 'hidden',
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
        isTrackModal={true}
      />

      <div className="flex flex-col flex-1 min-h-0" style={{ overflow: 'hidden' }}>
        <ModalContent trackType={trackType} scale={scale} />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: `${(32 / 16) * scale}rem`,
          boxShadow: 'inset 0px 0px 8.3px 0px rgba(0, 0, 0, 0.47)',
          zIndex: 15,
        }}
      />

      {/* 하단 세 개의 파란색 사각형 */}
      <div
        className="flex items-center absolute pointer-events-none"
        style={{
          gap: `${(15 / 16) * scale}rem`,
          bottom: `${(35 / 16) * scale}rem`,
          right: `${(50 / 16) * scale}rem`,
          zIndex: 1,
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
