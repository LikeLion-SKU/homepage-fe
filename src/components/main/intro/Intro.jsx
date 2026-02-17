import { startTransition, useEffect, useRef, useState } from 'react';

import exclamationSvg from '@/assets/icons/main/intro/!.svg';
import TypingAnimation from '@/components/animation/TypingAnimation';
import BigFrameBox from '@/components/layout/frame/Frame';
import IntroIcons from '@/components/main/intro/IntroIcons';
import Square from '@/components/main/intro/square/Square';
import useMediaQuery from '@/hooks/useMediaQuery';

// Grid configuration: 24 columns x 19 rows(피그마 디자인)
const columns = 24;
const rows = 18;

function Intro() {
  const [scale, setScale] = useState(1);
  const [squareSizeRem, setSquareSizeRem] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [shouldStartSecondTyping, setShouldStartSecondTyping] = useState(false);
  const [shouldStartImaginationTyping, setShouldStartImaginationTyping] = useState(false);
  const [showExclamation, setShowExclamation] = useState(false);
  const [isAclonicaReady, setIsAclonicaReady] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const isMac =
    typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isMobile760 = useMediaQuery('(max-width: 760px)');
  const isMobile480 = useMediaQuery('(max-width: 480px)');
  const isMobile440 = useMediaQuery('(max-width: 440px)');

  // 윈도우 크기 추적
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stableLayoutRef = useRef({ squareSizeRem: null, scale: null });
  const stableTimeoutRef = useRef(null);

  // 값이 80ms 동안 유지되면 표시 (타이머와 동기화)
  useEffect(() => {
    if (!squareSizeRem || squareSizeRem === 0 || !scale) {
      startTransition(() => {
        setIsReady(false);
      });
      if (stableTimeoutRef.current) {
        clearTimeout(stableTimeoutRef.current);
        stableTimeoutRef.current = null;
      }
      return;
    }

    // 값이 바뀌었으면 타이머 리셋
    if (
      stableLayoutRef.current.squareSizeRem !== squareSizeRem ||
      stableLayoutRef.current.scale !== scale
    ) {
      stableLayoutRef.current = { squareSizeRem, scale };
      startTransition(() => {
        setIsReady(false);
      });

      if (stableTimeoutRef.current) {
        clearTimeout(stableTimeoutRef.current);
      }

      // 80ms 후에 표시
      stableTimeoutRef.current = setTimeout(() => {
        startTransition(() => {
          setIsReady(true);
        });
      }, 80);
    }

    return () => {
      if (stableTimeoutRef.current) {
        clearTimeout(stableTimeoutRef.current);
      }
    };
  }, [squareSizeRem, scale]);

  // Aclonica 폰트 로드 확인
  useEffect(() => {
    if (!document?.fonts) return;
    document.fonts.load('16px Aclonica').then(() => setIsAclonicaReady(true));
  }, []);

  // squareSize를 rem으로 변환하는 헬퍼 함수
  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };

  const baseSquareSize = 60;
  const gridHeightRem = squareSizeRem > 0 ? squareSizeRem * rows : pxToRem(rows * baseSquareSize);

  // 440px 이하에서만 격자 셀 크기 비율을 기준으로 모든 요소 스케일링 (격자 제외)
  let effectiveScale = scale;
  let textScale = scale;

  if (isMobile440) {
    // 데스크톱: 1440px / 24 = 60px per cell
    // 모바일: windowWidth / 15 = 실제 셀 크기
    // 비율: (windowWidth / 15) / 60 = windowWidth / 900
    const baseDesktopWidth = 1440;
    const desktopColumns = 24;
    const mobileColumns = 15;
    const desktopCellSize = baseDesktopWidth / desktopColumns; // 60px
    const mobileCellSize = windowWidth / mobileColumns;
    const cellSizeRatio = mobileCellSize / desktopCellSize;

    // 440px 이하에서만: 격자 셀 크기 비율을 기준으로 모든 요소 스케일링 (격자 제외)
    // 텍스트 스케일 (440px 이하에서만)
    effectiveScale = scale * cellSizeRatio;
    textScale = effectiveScale * 0.8; // 텍스트를 더 크게
  }

  // "!" X 이동만 정수화해서 사용 (텍스트 scale 적용)
  const exclamationOffsetX = Math.round(-110 * textScale);
  const exclamationCaretOffsetX = Math.round(-100 * textScale); // 막대기 왼쪽으로 이동

  // Y 미세조정: 여기만 건드리면 됨 (1~3 권장)
  const exclamationYOffset = Math.round(2 * textScale);
  const exclamationOnlyDownPx = Math.round(-8 * textScale); // 느낌표만 추가로 아래로 이동 (px)
  // Mac일 때만 추가로 내림
  const finalExclamationDown = isMac
    ? exclamationOnlyDownPx + Math.round(12 * textScale)
    : exclamationOnlyDownPx;

  // 440px 이하에서만: (1) 텍스트+SCROLL+화살표를 같이 내리는 기본 오프셋 (이전 동작 유지)
  const mobileDownShiftRem = (190 / 16) * (isMobile440 ? effectiveScale : 0);
  // 440px 이하에서만: "당신의 상상" 텍스트만 추가로 아래로 이동
  const imaginationExtraDownShiftRem = (35 / 16) * (isMobile440 ? effectiveScale : 0);
  // 440px 이하에서만: "당신의 상상" / "세상 밖으로!" 텍스트를 동시에 왼쪽으로 이동
  const textLeftShiftRem = (70 / 16) * (isMobile440 ? textScale : 0);
  // 440px 이하에서만: (2) SCROLL+화살표만 추가로 더 내리는 오프셋
  const scrollExtraDownShiftRem = (200 / 16) * (isMobile440 ? effectiveScale : 0);
  const scrollDownShiftRem = mobileDownShiftRem + scrollExtraDownShiftRem;

  return (
    <section
      className="relative w-full"
      style={{
        cursor: 'none',
        height: isMobile440
          ? '100vh'
          : squareSizeRem > 0
            ? `${squareSizeRem * rows}rem`
            : `${pxToRem(rows * baseSquareSize)}rem`,
        minHeight: isMobile440 ? '100vh' : `${gridHeightRem}rem`,
        marginBottom: 0,
        paddingBottom: 0,
        overflow: 'visible',
      }}
    >
      <Square
        onScaleChange={setScale}
        onSquareSizeRemChange={setSquareSizeRem}
        isMobile={isMobile440}
      />

      {/* 아이콘 배치 - 격자 배경 아래 */}
      <div
        style={{
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.1s ease-in',
        }}
      >
        <IntroIcons
          squareSizeRem={squareSizeRem || 0}
          scale={effectiveScale}
          isMobile={isMobile440}
          scrollOffsetRem={scrollDownShiftRem}
        />
      </div>

      {/* Intro 내용 - 4.5-3 위치에 배치 */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left: isMobile440
            ? `calc(50% - ${((squareSizeRem || 0) * columns) / 2}rem + ${2.5 * (squareSizeRem || 0)}rem + ${(300 / 16) * textScale}rem - ${textLeftShiftRem}rem)`
            : `calc(50% - ${((squareSizeRem || 0) * columns) / 2}rem + ${2.5 * (squareSizeRem || 0)}rem)`,
          top: `calc(${4.5 * (squareSizeRem || 0)}rem + ${mobileDownShiftRem}rem + ${imaginationExtraDownShiftRem}rem)`,
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.1s ease-in',
        }}
      >
        <h1
          className="text-[#3C3C3C] m-0 whitespace-nowrap inline-flex items-center"
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
            fontSize={`${(120 / 16) * textScale}rem`}
            fontFamily="HOTSPOT, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
            onComplete={() => setShouldStartImaginationTyping(true)}
            showCursor={false}
          />

          {/* "상상" 텍스트 - 프레임 있음 */}
          <span
            className="text-[#1928B0] inline-block"
            style={{
              // 프레임(박스) 자체도 오른쪽으로 이동
              marginLeft: `${(20 / 16) * textScale}rem`,
            }}
          >
            <BigFrameBox
              cornerScale={isMobile480 ? 1.2 : isMobile760 ? 1.4 : 1.6}
              borderWidth={isMobile480 ? 3 : isMobile760 ? 3.5 : 2.5}
              className="inline-block"
              color="#1928B0"
              paddingX={(40 / 16) * textScale} // 가로 padding 증가 (기본 20px -> 40px)
              disableMobileScale={false} // 인트로 섹션은 모바일 크기 조정 비활성화
            >
              <div
                style={{
                  // 프레임 내부에서 텍스트만 오른쪽으로 이동
                  paddingLeft: `${(16 / 16) * textScale}rem`,
                }}
              >
                <TypingAnimation
                  text="상상,"
                  speed={150}
                  fontSize={`${(120 / 16) * textScale}rem`}
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

      {/* 세상 밖으로 텍스트 - 8-10.3 위치에 배치 */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left: isMobile440
            ? `calc(50% - ${((squareSizeRem || 0) * columns) / 2}rem + ${9.6 * (squareSizeRem || 0)}rem - ${textLeftShiftRem}rem)`
            : `calc(50% - ${((squareSizeRem || 0) * columns) / 2}rem + ${9.6 * (squareSizeRem || 0)}rem)`,
          top: `calc(${8 * (squareSizeRem || 0)}rem + ${mobileDownShiftRem}rem)`,
          overflow: 'visible',
          width: 'max-content',
          minWidth: 'max-content',
          right: 'auto',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.1s ease-in',
        }}
      >
        <h2
          className="text-[#3C3C3C] m-0 inline-flex items-center"
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
          {/* inline 흐름으로 자연스럽게 붙이기 */}
          <TypingAnimation
            text="세상 밖으로"
            speed={150}
            fontSize={`${(120 / 16) * textScale}rem`}
            fontFamily="HOTSPOT, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
            shouldStart={shouldStartSecondTyping}
            showCursor={false}
            onComplete={() => {
              setTimeout(() => setShowExclamation(true), 150);
            }}
          />

          {showExclamation && isAclonicaReady && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                marginLeft: `${exclamationOffsetX}px`,
                transform: `translateY(${exclamationYOffset}px)`,
              }}
            >
              {/* 느낌표는 자연 흐름 */}
              <img
                src={exclamationSvg}
                alt="!"
                style={{
                  width: `${Math.round(280 * textScale)}px`,
                  height: `${Math.round(108 * textScale)}px`,
                  display: 'inline-block',
                  position: 'relative',
                  top: `${finalExclamationDown}px`, // Mac 여부에 따라 다른 값 적용
                  imageRendering: 'crisp-edges',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  flexShrink: 0,
                }}
              />

              {/* 막대기도 자연 흐름 + 기존처럼 추가 X만 */}
              <span
                className="inline-block w-0.5 bg-[#1a1a1a] ml-0.5 animate-blink"
                style={{
                  height: `${(120 / 16) * textScale * 1.2}rem`,
                  transform: `translateX(${exclamationCaretOffsetX}px)`,
                }}
              />
            </span>
          )}
        </h2>
      </div>

      {/*  SCROLL 블록: 네 원본 그대로 */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left: '50%',
          top: `calc(${15.2 * (squareSizeRem || 0)}rem + ${scrollDownShiftRem}rem)`,
          transform: `translateX(calc(-50% - ${(50 / 16) * effectiveScale}rem))`,
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.1s ease-in',
        }}
      >
        <div
          className="hero-scroll"
          style={{
            marginBottom: `${20 / 16}rem`,
            fontSize: `${(24 / 16) * effectiveScale}rem`,
            lineHeight: `${24 / 16}rem`,
          }}
        >
          SCROLL
        </div>
      </div>
    </section>
  );
}

export default Intro;
