import { useState } from 'react';

import TypingAnimation from '@/components/animation/TypingAnimation';
import BigFrameBox from '@/components/layout/frame/Frame';
import Square from '@/components/main/intro/square/Square';

// Grid configuration: 24 columns x 19 rows(피그마 디자인)
const columns = 24;
const rows = 18;

function Intro() {
  const [scale, setScale] = useState(1);
  const [squareSizeRem, setSquareSizeRem] = useState(0);
  const [shouldStartSecondTyping, setShouldStartSecondTyping] = useState(false);
  const [shouldStartImaginationTyping, setShouldStartImaginationTyping] = useState(false);

  // squareSize를 rem으로 변환하는 헬퍼 함수
  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };

  const baseSquareSize = 60;
  const gridHeightRem = squareSizeRem > 0 ? squareSizeRem * rows : pxToRem(rows * baseSquareSize);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        cursor: 'none',
        height: squareSizeRem > 0 ? `${squareSizeRem * rows}rem` : 'auto',
        minHeight: `${gridHeightRem}rem`,
        marginBottom: 0,
        paddingBottom: 0,
      }}
    >
      <Square onScaleChange={setScale} onSquareSizeRemChange={setSquareSizeRem} />
      {/* Intro 내용 - 4.5-3 위치에 배치 */}
      {squareSizeRem > 0 && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `calc(50% - ${(squareSizeRem * columns) / 2}rem + ${3 * squareSizeRem}rem)`,
            top: `${4.5 * squareSizeRem}rem`,
          }}
        >
          <h1
            className="text-[#1a1a1a] m-0 whitespace-nowrap inline-flex items-center"
            style={{
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '800',
            }}
          >
            {/* "당신의" 텍스트 - 프레임 없음 */}
            <TypingAnimation
              text="당신의 "
              speed={150}
              fontSize={`${(120 / 16) * scale}rem`}
              onComplete={() => setShouldStartImaginationTyping(true)}
              showCursor={false}
            />
            {/* "상상" 텍스트 - 프레임 있음 */}
            <BigFrameBox cornerScale={1.4} borderWidth={3} className="inline-block">
              <TypingAnimation
                text="상상,"
                speed={150}
                fontSize={`${(120 / 16) * scale}rem`}
                shouldStart={shouldStartImaginationTyping}
                onComplete={() => setShouldStartSecondTyping(true)}
                showCursor={false}
              />
            </BigFrameBox>
          </h1>
        </div>
      )}
      {/* 세상 밖으로 텍스트 - 8-10.3 위치에 배치 */}
      {squareSizeRem > 0 && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `calc(50% - ${(squareSizeRem * columns) / 2}rem + ${10.3 * squareSizeRem}rem)`,
            top: `${8 * squareSizeRem}rem`,
          }}
        >
          <h2
            className="text-[#1a1a1a] m-0 whitespace-nowrap"
            style={{
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '800',
            }}
          >
            <TypingAnimation
              text="세상 밖으로!"
              speed={150}
              fontSize={`${(120 / 16) * scale}rem`}
              shouldStart={shouldStartSecondTyping}
              showCursor={true}
            />
          </h2>
        </div>
      )}
      {/* SCROLL 텍스트와 화살표 */}
      {squareSizeRem > 0 && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: '50%',
            top: `${15.2 * squareSizeRem}rem`,
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="hero-scroll"
            style={{
              marginBottom: `${(20 / 16) * scale}rem`,
              fontSize: `${(16 / 16) * scale}rem`,
              lineHeight: `${(24 / 16) * scale}rem`,
            }}
          >
            SCROLL
          </div>
          <div
            className="hero-scroll"
            style={{
              fontSize: `${(16 / 16) * scale}rem`,
              lineHeight: `${(24 / 16) * scale}rem`,
              textAlign: 'center',
              marginTop: 0,
            }}
          >
            v
          </div>
          <div
            className="hero-scroll"
            style={{
              fontSize: `${(16 / 16) * scale}rem`,
              lineHeight: `${(24 / 16) * scale}rem`,
              textAlign: 'center',
              marginTop: 0,
            }}
          >
            v
          </div>
          <div
            className="hero-scroll"
            style={{
              fontSize: `${(16 / 16) * scale}rem`,
              lineHeight: `${(24 / 16) * scale}rem`,
              textAlign: 'center',
              marginTop: 0,
            }}
          >
            v
          </div>
        </div>
      )}
    </section>
  );
}

export default Intro;
