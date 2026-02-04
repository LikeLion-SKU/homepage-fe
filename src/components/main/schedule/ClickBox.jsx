import clickBoxIcon from '@/assets/icons/main/schedule/click-box.svg';

/**
 * 공통 Click 말풍선 컴포넌트
 * - 기본: 부모가 group일 때, 부모 hover 시 fade-in
 * - 말풍선 자체는 클릭/호버 트리거가 되지 않도록 `pointer-events: none`
 *
 * 사용
 * - Desktop/Pad: scale을 넘기면 scaled 모드(px -> rem*scale)로 동작
 * - Mobile: scale 없이 leftPx/topPx를 넘기면 px 모드로 동작
 */
export default function ClickBox({
  // 공통
  className = '',
  zIndex = 20,

  // (scaled 모드) scale이 있으면 rem 기반으로 계산
  scale = undefined,
  left = '50%', // scaled 모드에서만 사용
  topPx = -120,
  widthPx = 274,
  heightPx = 103,
  offsetXPx = 0,
  offsetYPx = 0,

  // (px 모드) scale이 없으면 px 기반으로 계산
  leftPx = -53,
  top = -65,
  width = 137,
  height = 60,

  // 텍스트 스타일
  paddingYPx = 10,
  paddingXPx = 20,
  textMarginTopPx = -10,
  fontSizePx = 20,
  lineHeightPx = 30,

  // 모바일 기본 텍스트 스타일 (px 모드에서 주로 사용)
  padding = '5px 10px',
  textMarginTop = '-5px',
  fontSize = '10px',
  lineHeight = '15px',
}) {
  const isScaled = typeof scale === 'number';

  const style = isScaled
    ? {
        left: `calc(${left} + ${((offsetXPx / 16) * scale).toFixed(6)}rem)`,
        transform: 'translateX(-50%)',
        top: `calc(${(topPx / 16) * scale}rem + ${((offsetYPx / 16) * scale).toFixed(6)}rem)`,
        width: `${(widthPx / 16) * scale}rem`,
        height: `${(heightPx / 16) * scale}rem`,
        zIndex,
      }
    : {
        left: `${leftPx + offsetXPx}px`,
        top: `${top + offsetYPx}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex,
      };

  const textWrapStyle = isScaled
    ? {
        padding: `${(paddingYPx / 16) * scale}rem ${(paddingXPx / 16) * scale}rem`,
        marginTop: `${(textMarginTopPx / 16) * scale}rem`,
      }
    : {
        padding,
        marginTop: textMarginTop,
      };

  const textStyle = isScaled
    ? {
        fontSize: `${(fontSizePx / 16) * scale}rem`,
        lineHeight: `${(lineHeightPx / 16) * scale}rem`,
        fontFamily: 'Pretendard, sans-serif',
        minHeight: `${(18 / 16) * scale}rem`,
      }
    : {
        fontSize,
        lineHeight,
        fontFamily: 'Pretendard, sans-serif',
        minHeight: '18px',
      };

  return (
    <div
      className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none ${className}`}
      style={style}
    >
      <img
        src={clickBoxIcon}
        alt="click-box"
        className="w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={textWrapStyle}
      >
        <div
          contentEditable
          suppressContentEditableWarning
          className="text-[#00156A] font-bold text-center outline-none cursor-text"
          style={textStyle}
        >
          클릭 해 월별 상세 일정을
          <br />
          확인해보세요!
        </div>
      </div>
    </div>
  );
}
