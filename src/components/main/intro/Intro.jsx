import { useState } from 'react';

import TypingAnimation from '@/components/animation/TypingAnimation';
import BigFrameBox from '@/components/layout/frame/Frame';
import IntroIcons from '@/components/main/intro/IntroIcons';
import Square from '@/components/main/intro/square/Square';

// Grid configuration: 24 columns x 19 rows(피그마 디자인)
const columns = 24;
const rows = 18;

function Intro() {
  const [scale, setScale] = useState(1);
  const [squareSizeRem, setSquareSizeRem] = useState(0);
  const [shouldStartSecondTyping, setShouldStartSecondTyping] = useState(false);
  const [shouldStartImaginationTyping, setShouldStartImaginationTyping] = useState(false);
  const [showExclamation, setShowExclamation] = useState(false);

  // "!" 위치 미세조정(오른쪽/아래) - 값만 바꾸면 됨
  const exclamationOffsetX = (8 / 16) * scale; // 오른쪽으로 이동 (px)
  const exclamationOffsetY = (6 / 16) * scale; // 아래로 이동 (px)
  const exclamationCaretOffsetX = (20 / 16) * scale; // 느낌표 뒤 커서(작대기) 추가로 오른쪽 이동 (px)

  // squareSize를 rem으로 변환하는 헬퍼 함수
  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };

  const baseSquareSize = 60;
  const gridHeightRem = squareSizeRem > 0 ? squareSizeRem * rows : pxToRem(rows * baseSquareSize);

  return (
    <section
      className="relative w-full"
      style={{
        cursor: 'none',
        height: squareSizeRem > 0 ? `${squareSizeRem * rows}rem` : 'auto',
        minHeight: `${gridHeightRem}rem`,
        marginBottom: 0,
        paddingBottom: 0,
        overflow: 'visible',
      }}
    >
      <Square onScaleChange={setScale} onSquareSizeRemChange={setSquareSizeRem} />
      {/* 아이콘 배치 - 격자 배경 아래 */}
      {squareSizeRem > 0 && <IntroIcons squareSizeRem={squareSizeRem} scale={scale} />}
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
              fontFamily:
                'HOTSPOT, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '800',
            }}
          >
            {/* "당신의" 텍스트 - 프레임 없음 */}
            <TypingAnimation
              text="당신의 "
              speed={150}
              fontSize={`${(120 / 16) * scale}rem`}
              fontFamily="HOTSPOT, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
              onComplete={() => setShouldStartImaginationTyping(true)}
              showCursor={false}
            />
            {/* "상상" 텍스트 - 프레임 있음 */}
            <span
              className="text-[#1928B0] inline-block"
              style={{
                // 프레임(박스) 자체도 오른쪽으로 이동
                marginLeft: `${(20 / 16) * scale}rem`,
              }}
            >
              <BigFrameBox
                cornerScale={1.4}
                borderWidth={1.5}
                className="inline-block"
                color="#1928B0"
                paddingX={(40 / 16) * scale} // 가로 padding 증가 (기본 20px -> 40px)
              >
                <div
                  style={{
                    // 프레임 내부에서 텍스트만 오른쪽으로 이동
                    paddingLeft: `${(16 / 16) * scale}rem`,
                  }}
                >
                  <TypingAnimation
                    text="상상,"
                    speed={150}
                    fontSize={`${(120 / 16) * scale}rem`}
                    fontFamily="HOTSPOT, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
                    shouldStart={shouldStartImaginationTyping}
                    onComplete={() => setShouldStartSecondTyping(true)}
                    showCursor={false}
                  />
                </div>
              </BigFrameBox>
            </span>
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
            overflow: 'visible',
            width: 'max-content',
            minWidth: 'max-content',
            right: 'auto',
          }}
        >
          <h2
            className="text-[#1a1a1a] m-0 inline-flex items-center"
            style={{
              fontFamily:
                'HOTSPOT, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              fontWeight: '800',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              width: 'max-content',
              minWidth: 'max-content',
            }}
          >
            <TypingAnimation
              text="세상 밖으로"
              speed={150}
              fontSize={`${(120 / 16) * scale}rem`}
              fontFamily="HOTSPOT, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
              shouldStart={shouldStartSecondTyping}
              showCursor={false}
              onComplete={() => {
                setTimeout(() => setShowExclamation(true), 150);
              }}
            />
            {showExclamation && (
              <span
                style={{
                  fontSize: `${(130 / 16) * scale}rem`,
                  fontFamily: 'Aclonica, sans-serif',
                  display: 'inline-block',
                  lineHeight: '1',
                  transform: `translate(${exclamationOffsetX}rem, ${exclamationOffsetY}rem)`,
                }}
              >
                !
              </span>
            )}
            {showExclamation && (
              <span
                className="inline-block w-0.5 bg-[#1a1a1a] ml-0.5 animate-blink"
                style={{
                  height: `${(120 / 16) * scale * 1.2}rem`,
                  verticalAlign: 'middle',
                  transform: `translateX(${exclamationCaretOffsetX}rem)`,
                }}
              />
            )}
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
        </div>
      )}
    </section>
  );
}

export default Intro;
