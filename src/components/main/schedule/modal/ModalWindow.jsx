import useMediaQuery from '@/hooks/useMediaQuery';

import ModalContentPlaceholder from './ModalContentPlaceholder';
import ModalTextContent from './ModalTextContent';
import ModalTitleBar from './ModalTitleBar';

function ModalWindow({
  title,
  contentImage,
  contentTitle,
  contentDescription,

  titleBarBgColor,
  titleBarIconBoxColor,
  titleBarTitleBoxColor,
  titleBarBoxSize,

  placeholderBgColor,
  placeholderPaddingHorizontal,
  placeholderPaddingTop,

  textTitleColor,
  textDescriptionColor,
  textBgColor,

  windowBgColor = '#FFFFFF',
  windowBorderColor = '#1a1a1a',
  windowBorderWidth = 1,

  scale = 1,
  variantCount = 1,
  onClose,
}) {
  const isMobile760 = useMediaQuery('(max-width: 760px)');

  // 텍스트 영역 비율 기반 높이 (scale에 따라 비례적으로 커지도록)
  // 원본 기준: 170px / 552px ≈ 0.308 (약 30.8%)
  // 760px 이하 + 2개일 때는 약간 더 크게 (140px 기준)
  const TEXT_RATIO = isMobile760 && variantCount === 2 ? 0.254 : 0.308; // 140/552 ≈ 0.254, 170/552 ≈ 0.308

  // 이미지 영역 최소 높이 보장 (작은 화면에서도 보이도록)
  const MIN_IMAGE_HEIGHT = isMobile760 && variantCount === 2 ? '140px' : '180px';

  // 760px 이하 2개일 때만 모달 높이를 늘려서 텍스트가 다 보이게
  const heightMultiplier = isMobile760 && variantCount === 2 ? 1.1 : 1;

  // 텍스트 영역 높이 계산 (모달 전체 높이의 비율로)
  const modalHeight = (552 / 16) * scale * heightMultiplier;
  const textHeight = modalHeight * TEXT_RATIO;

  // 760px 이하 2개일 때만 이미지 영역 가로 늘리기 (패딩 줄이기)
  const effectivePaddingHorizontal =
    isMobile760 && variantCount === 2 ? '12px' : placeholderPaddingHorizontal;

  // 760px 이하 2개일 때만 이미지 영역 하단 패딩 줄여서 텍스트 위로 올리기
  const effectivePaddingBottom =
    isMobile760 && variantCount === 2 ? '8px' : placeholderPaddingHorizontal;

  return (
    <div
      className="relative z-[1001] flex flex-col"
      style={{
        backgroundColor: windowBgColor,
        border: `${windowBorderWidth}px solid ${windowBorderColor}`,
        borderRadius: `${(32 / 16) * scale}rem`,
        width: `${(468 / 16) * scale}rem`,
        height: `${(552 / 16) * scale * heightMultiplier}rem`,
        maxWidth: 'calc(100vw - 65px)',
        maxHeight: 'calc(100vh - 80px)',
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
      />

      {/* 본문 */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* 이미지: 남은 공간 전부, 최소 높이 보장 */}
        <div className="flex-1 min-h-0" style={{ minHeight: MIN_IMAGE_HEIGHT }}>
          <ModalContentPlaceholder
            forceFill
            backgroundColor={placeholderBgColor}
            paddingHorizontal={effectivePaddingHorizontal}
            paddingTop={placeholderPaddingTop}
            paddingBottom={effectivePaddingBottom}
            contentImage={contentImage}
            title={title}
            scale={scale}
          />
        </div>

        {/* 텍스트 비율 기반 높이 (scale에 따라 비례적으로 커짐) */}
        <div style={{ height: `${textHeight}rem`, flexShrink: 0 }} className="overflow-auto">
          <ModalTextContent
            title={contentTitle}
            description={contentDescription}
            titleColor={textTitleColor}
            descriptionColor={textDescriptionColor}
            backgroundColor={textBgColor}
            scale={scale}
          />
        </div>
      </div>

      <div
        className="flex items-center absolute pointer-events-none"
        style={{
          gap: `${(1 / 16) * scale}rem`,
          bottom: `${(35 / 16) * scale}rem`,
          right: `${(23 / 16) * scale}rem`,
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
