// 아이콘 import
import blueDownarrowIcon from '@/assets/icons/main/intro/blue-downarrow.svg';
import brainIcon from '@/assets/icons/main/intro/brain.svg';
import bulbIcon from '@/assets/icons/main/intro/bulb.svg';
import codeIcon from '@/assets/icons/main/intro/code.svg';
import computerIcon from '@/assets/icons/main/intro/computer.svg';
import makeIcon from '@/assets/icons/main/intro/make.svg';
import moonIcon from '@/assets/icons/main/intro/moon.svg';
import rocketIcon from '@/assets/icons/main/intro/rocket.svg';

const columns = 24;
const rows = 18;

// 아이콘 위치 정의
// 격자 좌표 방식: { row, col, icon, size, alt, offsetX?, offsetY? }
// 직접 좌표 방식: { left, top, icon, size, alt } (row/col 대신 사용 가능)
// offsetX, offsetY: 격자 셀 중심에서의 픽셀 오프셋 (rem 단위로 변환됨)
const iconPositions = [
  { row: 11.2, col: 3.8, icon: brainIcon, size: 500, alt: 'brain', offsetX: 0, offsetY: 0 },
  { row: 12.5, col: 15.6, icon: bulbIcon, size: 270, alt: 'bulb', offsetX: 0, offsetY: 0 },
  { row: 15.3, col: 2.1, icon: codeIcon, size: 285, alt: 'code', offsetX: 0, offsetY: 0 },
  { row: 14.2, col: 19.8, icon: computerIcon, size: 460, alt: 'computer', offsetX: 0, offsetY: 0 },
  { row: 0.8, col: 4.3, icon: makeIcon, size: 460, alt: 'make', offsetX: 0, offsetY: 0 },
  { row: 0.6, col: 11.2, icon: moonIcon, size: 80, alt: 'moon', offsetX: 0, offsetY: 0 },
  { row: 3.2, col: 19, icon: rocketIcon, size: 570, alt: 'rocket', offsetX: 0, offsetY: 0 },
];

function IntroIcons({ squareSizeRem, scale }) {
  if (!squareSizeRem || squareSizeRem === 0) return null;

  // SCROLL 텍스트 위치 계산 (Intro.jsx와 동일)
  const scrollTop = 15.2 * squareSizeRem;
  const scrollMarginBottom = (20 / 16) * scale;
  const scrollFontSize = (16 / 16) * scale;
  const scrollLineHeight = (24 / 16) * scale;
  const scrollTextHeight = scrollFontSize * 1.5; // 대략적인 텍스트 높이
  const arrowSpacing = scrollLineHeight;

  // 첫 번째 화살표 위치: SCROLL 텍스트 바로 아래 (위로 올림)
  const firstArrowTop = scrollTop + scrollTextHeight + scrollMarginBottom;

  return (
    <>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: `${squareSizeRem * columns}rem`,
          height: `${squareSizeRem * rows}rem`,
          zIndex: 11, // 격자 오버레이(z-10) 위에 배치하여 보이도록
        }}
      >
        {iconPositions.map((iconData, index) => {
          const { icon, size, alt, offsetX = 0, offsetY = 0 } = iconData;

          // 격자 좌표 방식 또는 직접 좌표 방식 지원
          let left, top;
          if ('left' in iconData && 'top' in iconData) {
            // 직접 좌표 방식
            left = `${iconData.left}rem`;
            top = `${iconData.top}rem`;
          } else if ('row' in iconData && 'col' in iconData) {
            // 격자 좌표 방식 (기본)
            const { row, col } = iconData;
            const baseLeft = col * squareSizeRem + squareSizeRem / 2;
            const baseTop = row * squareSizeRem + squareSizeRem / 2;
            left = `${baseLeft + (offsetX / 16) * scale}rem`;
            top = `${baseTop + (offsetY / 16) * scale}rem`;
          } else {
            return null;
          }

          return (
            <img
              key={index}
              src={icon}
              alt={alt}
              className="absolute pointer-events-none"
              style={{
                left,
                top,
                width: `${(size / 16) * scale}rem`,
                height: 'auto',
                transform: 'translate(-50%, -50%)',
                zIndex: 11,
              }}
            />
          );
        })}
      </div>
      {/* SCROLL 텍스트 아래 세 개의 화살표 - SCROLL 텍스트와 동기화 */}
      {[0, 1, 2].map((index) => (
        <img
          key={`scroll-arrow-${index}`}
          src={blueDownarrowIcon}
          alt="scroll arrow"
          className="absolute left-1/2 pointer-events-none"
          style={{
            top: `${firstArrowTop + index * arrowSpacing}rem`,
            width: `${(20 / 16) * scale}rem`,
            height: 'auto',
            zIndex: 21, // SCROLL 텍스트(z-20) 위에 배치
            left: '50%',
            animation: 'scrollBounce 2.3s ease-in-out infinite', // SCROLL 텍스트와 동일한 애니메이션
            animationDelay: '0s', // SCROLL 텍스트와 동일한 타이밍
          }}
        />
      ))}
    </>
  );
}

export default IntroIcons;
