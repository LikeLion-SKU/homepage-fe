import { memo, useLayoutEffect, useRef, useState } from 'react';

import rightIcon from '@/assets/icons/main/schedule/modal-arrow.svg';
import useMediaQuery from '@/hooks/useMediaQuery';

function useIOS() {
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent;
    return (
      /iPhone|iPad|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  });

  return isIOS;
}

function ModalTitleBar({
  title = '3월',
  backgroundColor = '#E8E8E8',
  // eslint-disable-next-line no-unused-vars
  iconBoxColor, // 받지만 사용하지 않음 (호환성을 위해 유지)
  // eslint-disable-next-line no-unused-vars
  titleBoxColor, // 받지만 사용하지 않음 (호환성을 위해 유지)
  boxSize = 1,
  onClose,
  scale = 1,
  isTrackModal = false,
  variantCount = 1,
  isOpen = true,
}) {
  const isMobile480 = useMediaQuery('(max-width: 480px)');
  const isIOS = useIOS();
  const isSafari =
    typeof window !== 'undefined' &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
    navigator.vendor.includes('Apple');

  // iOS 모바일 모달 1개일 때만 ready gate 적용
  const shouldUseReadyGate = isMobile480 && isIOS && variantCount === 1 && !isTrackModal;
  const [ready, setReady] = useState(!shouldUseReadyGate);
  const raf1 = useRef(null);
  const raf2 = useRef(null);

  useLayoutEffect(() => {
    if (!shouldUseReadyGate) return;

    if (!isOpen) {
      raf1.current = requestAnimationFrame(() => {
        setReady(false);
      });
      return () => {
        if (raf1.current) cancelAnimationFrame(raf1.current);
      };
    }

    raf1.current = requestAnimationFrame(() => {
      setReady(false);
      raf2.current = requestAnimationFrame(() => {
        setReady(true);
      });
    });

    return () => {
      if (raf1.current) cancelAnimationFrame(raf1.current);
      if (raf2.current) cancelAnimationFrame(raf2.current);
    };
  }, [isOpen, shouldUseReadyGate]);

  if (shouldUseReadyGate && !ready) {
    return (
      <div
        style={{
          backgroundColor,
          paddingTop: `${(16 / 16) * scale}rem`,
          paddingBottom: `${(8 / 16) * scale}rem`,
          minHeight: `${(48 / 16) * scale}rem`,
          visibility: 'hidden',
        }}
      />
    );
  }

  return (
    <>
      {/* 좌측 상단 화살표 아이콘 */}
      <div
        className="flex items-center absolute"
        style={{
          gap: 0,
          display: 'inline-flex',
          top: `${(26 / 16) * scale}rem`,
          left: isMobile480
            ? isTrackModal
              ? `${(23 / 16) * scale}rem`
              : isIOS && variantCount === 1
                ? `${(12 / 16) * scale}rem`
                : isSafari && variantCount === 2
                  ? `${(20 / 16) * scale}rem`
                  : isSafari
                    ? `${(6 / 16) * scale}rem`
                    : `${(15 / 16) * scale}rem`
            : !isTrackModal && (variantCount === 1 || variantCount === 2)
              ? `${(10 / 16) * scale}rem`
              : `${(20 / 16) * scale}rem`,
          zIndex: 100,
          pointerEvents: 'auto',
        }}
      >
        <div
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            pointerEvents: 'auto',
            padding:
              isMobile480 && isTrackModal
                ? `${(8 / 16) * scale * boxSize}rem`
                : `${(12 / 16) * scale * boxSize}rem`,
            minWidth:
              isMobile480 && isTrackModal
                ? `${(30 / 16) * scale * boxSize}rem`
                : `${(56 / 16) * scale * boxSize}rem`,
            minHeight:
              isMobile480 && isTrackModal
                ? `${(30 / 16) * scale * boxSize}rem`
                : `${(40 / 16) * scale * boxSize}rem`,
          }}
        >
          <img
            src={rightIcon}
            alt="arrow"
            style={{
              width:
                isMobile480 && isTrackModal
                  ? `${(24 / 16) * scale * boxSize}rem`
                  : `${(32 / 16) * scale * boxSize}rem`,
              height:
                isMobile480 && isTrackModal
                  ? `${(14 / 16) * scale * boxSize}rem`
                  : `${(16 / 16) * scale * boxSize}rem`,
            }}
          />
        </div>
      </div>
      {/* 우측 상단 사각형들 */}
      <div
        className="flex items-center absolute"
        style={{
          gap: 0,
          display: 'inline-flex',
          top: `${(38 / 16) * scale}rem`,
          right: `${(35 / 16) * scale}rem`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#C6E400',
            width: isTrackModal
              ? isMobile480
                ? `${(30 / 16) * scale * boxSize}rem`
                : `${(76 / 16) * scale * boxSize}rem`
              : `${(48 / 16) * scale * boxSize}rem`,
            height:
              isMobile480 && isTrackModal
                ? `${(15 / 16) * scale * boxSize}rem`
                : `${(21 / 16) * scale * boxSize}rem`,
            borderRadius: `${(32 / 16) * scale * boxSize}rem 0 0 ${(32 / 16) * scale * boxSize}rem`,
          }}
        />
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1928B0',
            width: isTrackModal
              ? isMobile480
                ? `${(30 / 16) * scale * boxSize}rem`
                : `${(76 / 16) * scale * boxSize}rem`
              : `${(48 / 16) * scale * boxSize}rem`,
            height:
              isMobile480 && isTrackModal
                ? `${(15 / 16) * scale * boxSize}rem`
                : `${(21 / 16) * scale * boxSize}rem`,
            borderRadius: `0 ${(32 / 16) * scale * boxSize}rem ${(32 / 16) * scale * boxSize}rem 0`,
          }}
        />
      </div>
      <div
        className="flex items-center w-full relative"
        style={{
          backgroundColor,
          paddingTop: `${(16 / 16) * scale}rem`,
          paddingBottom: `${(8 / 16) * scale}rem`,
          paddingLeft:
            !isTrackModal && (variantCount === 1 || variantCount === 2)
              ? `${(8 / 16) * scale}rem`
              : `${(16 / 16) * scale}rem`,
          paddingRight: `${(16 / 16) * scale}rem`,
          gap: `${(12 / 16) * scale}rem`,
          minHeight: `${(48 / 16) * scale}rem`,
        }}
      >
        <div
          className="flex items-center"
          style={{
            gap: 0,
            display: 'inline-flex',
            marginTop: `${(10 / 16) * scale}rem`,
            marginLeft: `${(14 / 16) * scale}rem`,
          }}
        >
          <div
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            <img
              src={rightIcon}
              alt="arrow"
              style={{
                width:
                  isMobile480 && isTrackModal
                    ? `${(24 / 16) * scale * boxSize}rem`
                    : `${(32 / 16) * scale * boxSize}rem`,
                height:
                  isMobile480 && isTrackModal
                    ? `${(12 / 16) * scale * boxSize}rem`
                    : `${(16 / 16) * scale * boxSize}rem`,
              }}
            />
          </div>
          <span
            className="font-bold uppercase relative"
            style={{
              fontSize:
                isMobile480 && isTrackModal
                  ? `${(13 / 16) * scale * boxSize}rem`
                  : `${(18 / 16) * scale * boxSize}rem`,
              color: '#080808',
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width:
                isMobile480 && isTrackModal
                  ? `${(60 / 16) * scale * boxSize}rem`
                  : `${(80 / 16) * scale * boxSize}rem`,
              height:
                isMobile480 && isTrackModal
                  ? `${(28 / 16) * scale * boxSize}rem`
                  : `${(38 / 16) * scale * boxSize}rem`,
              paddingLeft:
                isMobile480 && isTrackModal
                  ? `${(12 / 16) * scale * boxSize}rem`
                  : `${(12 / 16) * scale * boxSize}rem`,
              paddingRight:
                isMobile480 && isTrackModal
                  ? `${(8 / 16) * scale * boxSize}rem`
                  : `${(12 / 16) * scale * boxSize}rem`,
              overflow: 'visible',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left:
                  isMobile480 && isTrackModal
                    ? `${(-25 / 16) * scale * boxSize}rem`
                    : `${(-33 / 16) * scale * boxSize}rem`,
                top: 0,
                width:
                  isMobile480 && isTrackModal
                    ? isTrackModal
                      ? `${(120 / 16) * scale * boxSize}rem`
                      : `${(70 / 16) * scale * boxSize}rem`
                    : isTrackModal
                      ? `${(160 / 16) * scale * boxSize}rem`
                      : `${(95 / 16) * scale * boxSize}rem`,
                height:
                  isMobile480 && isTrackModal
                    ? `${(32 / 16) * scale * boxSize}rem`
                    : `${(42 / 16) * scale * boxSize}rem`,
                backgroundColor: '#E9E9E9',
                borderRadius:
                  isMobile480 && isTrackModal
                    ? `${(8 / 16) * scale * boxSize}rem`
                    : `${(10 / 16) * scale * boxSize}rem`,
                zIndex: 0,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left:
                  isMobile480 && isTrackModal
                    ? `${(-25 / 16) * scale * boxSize}rem`
                    : `${(-33 / 16) * scale * boxSize}rem`,
                top: 0,
                width:
                  isMobile480 && isTrackModal
                    ? `${(28 / 16) * scale * boxSize}rem`
                    : `${(38 / 16) * scale * boxSize}rem`,
                height:
                  isMobile480 && isTrackModal
                    ? `${(32 / 16) * scale * boxSize}rem`
                    : `${(42 / 16) * scale * boxSize}rem`,
                backgroundColor: '#00156A',
                borderRadius:
                  isMobile480 && isTrackModal
                    ? `${(8 / 16) * scale * boxSize}rem`
                    : `${(10 / 16) * scale * boxSize}rem`,
                zIndex: 0,
              }}
            />
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                transform:
                  isMobile480 && isTrackModal
                    ? isTrackModal
                      ? `translate(${(15 / 16) * scale * boxSize}rem, ${(2 / 16) * scale * boxSize}rem)`
                      : `translate(${(-5 / 16) * scale * boxSize}rem, ${(2 / 16) * scale * boxSize}rem)`
                    : isTrackModal
                      ? `translate(${(25 / 16) * scale * boxSize}rem, ${(2 / 16) * scale * boxSize}rem)`
                      : `translate(${(-8 / 16) * scale * boxSize}rem, ${(2 / 16) * scale * boxSize}rem)`,
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default memo(ModalTitleBar);
