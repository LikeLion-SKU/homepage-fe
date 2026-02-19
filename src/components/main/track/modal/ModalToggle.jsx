import { useEffect, useState } from 'react';

import Toggle from '@/assets/icons/under_toggle.svg';
import useMediaQuery from '@/hooks/useMediaQuery';

function ModalToggle({ items = [], scale = 1 }) {
  const isMobile760 = useMediaQuery('(max-width: 760px)');
  const isTab1199 = useMediaQuery('(min-width: 761px) and (max-width: 1199px)');
  const isDesktop1440 = useMediaQuery('(min-width: 1440px)');
  const [openToggle, setOpenToggle] = useState([]);
  const [badgeFontSize, setBadgeFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 760) return 14;
      if (width >= 761 && width <= 1199) return 13;
      return 12;
    }
    return 12;
  });
  const [titleFontSize, setTitleFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 760) return 14;
      if (width >= 761 && width <= 1199) return 13;
      return 14;
    }
    return 14;
  });
  const [explainFontSize, setExplainFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 760) return 14;
      if (width >= 761 && width <= 1199) return 11;
      return 14;
    }
    return 14;
  });

  useEffect(() => {
    const calculateFontSizes = () => {
      const width = window.innerWidth;
      if (width <= 760) {
        setBadgeFontSize(14);
        setTitleFontSize(14);
        setExplainFontSize(14);
      } else if (width >= 761 && width <= 1199) {
        // 761px에서 뱃지/타이틀 13px, 하단 텍스트 11px, 1199px에서 모두 16px로 선형 보간
        // scale을 고려하여 실제 화면에 보이는 크기가 13px, 11px이 되도록 계산
        const minWidth = 761;
        const maxWidth = 1199;

        // 현재 width의 scale 계산 (BASE_SCREEN = 1440, BASE_W = 1012)
        const BASE_SCREEN = 1440;
        const BASE_W = 1012;
        const currentScaleRatio = width / BASE_SCREEN;
        const currentW = BASE_W * currentScaleRatio;
        const currentScale = currentW / BASE_W;

        // 실제 화면에 보이는 크기 (px)를 원하는 값으로 설정
        const minBadgeTitlePx = 13;
        const minExplainPx = 11;
        const maxFontPx = 16;

        // scale을 고려한 fontSize 값 계산
        // 실제 크기 = (badgeFontSize / 16) * scale * 16px = badgeFontSize * scale
        // 원하는 크기 = targetPx
        // badgeFontSize * scale = targetPx
        // badgeFontSize = targetPx / scale
        const ratio = (width - minWidth) / (maxWidth - minWidth);
        const targetBadgeTitlePx = minBadgeTitlePx + (maxFontPx - minBadgeTitlePx) * ratio;
        const targetExplainPx = minExplainPx + (maxFontPx - minExplainPx) * ratio;

        const badgeTitleFontSize = targetBadgeTitlePx / currentScale;
        const explainFontSize = targetExplainPx / currentScale;

        setBadgeFontSize(badgeTitleFontSize);
        setTitleFontSize(badgeTitleFontSize);
        setExplainFontSize(explainFontSize);
      } else {
        setBadgeFontSize(16);
        setTitleFontSize(16);
        setExplainFontSize(14);
      }
    };

    // 즉시 실행하여 초기값 설정
    calculateFontSizes();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', calculateFontSizes);

    return () => {
      window.removeEventListener('resize', calculateFontSizes);
    };
  }, []);

  const handleToggle = (index) => {
    if (openToggle.includes(index)) {
      setOpenToggle(openToggle.filter((i) => i !== index));
    } else {
      setOpenToggle([...openToggle, index]);
    }
  };

  return (
    <div
      className="flex flex-col relative"
      style={{
        gap: `${(12 / 16) * scale}rem`,
        zIndex: 10,
      }}
    >
      {items.map((item, index) => {
        const isOpen = openToggle.includes(index);
        return (
          <div key={index} className="w-full" style={{ paddingRight: `${(30 / 16) * scale}rem` }}>
            <button
              onClick={() => handleToggle(index)}
              className="h-14 pl-4 pr-7 py-5 flex items-center justify-between text-black text-xs pad:text-base font-medium active:translate-x-[0.5px] active:translate-y-[0.5px]"
              style={{
                borderRadius: isOpen
                  ? `${(20 / 16) * scale}rem ${(20 / 16) * scale}rem 0 0`
                  : `${(20 / 16) * scale}rem`,
                width: '100%',
                backgroundColor: isOpen ? '#F8FBE7' : '#FFFFFF',
                border: isOpen
                  ? `${(2 / 16) * scale}rem solid #686868`
                  : `${(1 / 16) * scale}rem solid #686868`,
                borderBottom: isOpen ? 'none' : `${(1 / 16) * scale}rem solid #686868`,
                transition: 'background-color 0s, border-width 0s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F8FBE7';
                e.currentTarget.style.borderWidth = `${(2 / 16) * scale}rem`;
                if (!isOpen) {
                  e.currentTarget.style.borderBottom = `${(2 / 16) * scale}rem solid #686868`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isOpen) {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderWidth = `${(1 / 16) * scale}rem`;
                  e.currentTarget.style.borderBottom = `${(1 / 16) * scale}rem solid #686868`;
                }
              }}
            >
              <div className="flex items-center gap-3">
                {item.badge && (
                  <span
                    className="py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: item.badgeColor || '#C6E400',
                      color: '#FFFFFF',
                      borderRadius: `${(13 / 16) * scale}rem`,
                      fontSize: `${(badgeFontSize / 16) * scale}rem`,
                      paddingLeft:
                        item.badge === '공통'
                          ? `${(16 / 16) * scale}rem`
                          : `${(12 / 16) * scale}rem`,
                      paddingRight:
                        item.badge === '공통'
                          ? `${(16 / 16) * scale}rem`
                          : `${(12 / 16) * scale}rem`,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <span
                  style={{
                    fontSize: `${(titleFontSize / 16) * scale}rem`,
                  }}
                >
                  {item.text}
                </span>
              </div>
              <div className="w-3.5 h-3.5 flex items-center justify-center">
                <img src={Toggle} alt="toggle" />
              </div>
            </button>
            {isOpen && item.explainText && (
              <div
                className="px-6"
                style={{
                  backgroundColor: '#F8FBE7',
                  borderRadius: `0 0 ${(15 / 16) * scale}rem ${(15 / 16) * scale}rem`,
                  width: '100%',
                  marginTop: `-${(2 / 16) * scale}rem`,
                  border: `${(2 / 16) * scale}rem solid #686868`,
                  borderTop: 'none',
                  borderLeft: `${(2 / 16) * scale}rem solid #686868`,
                  borderRight: `${(2 / 16) * scale}rem solid #686868`,
                  borderBottom: `${(2 / 16) * scale}rem solid #686868`,
                  paddingTop: isMobile760 ? `${(3 / 16) * scale}rem` : `${(2 / 16) * scale}rem`,
                  paddingBottom: isMobile760
                    ? `${(14 / 16) * scale}rem`
                    : `${(16 / 16) * scale}rem`,
                  paddingLeft: `${(25 / 16) * scale}rem`,
                  paddingRight: `${(24 / 16) * scale}rem`,
                  minHeight: 'auto',
                }}
              >
                <p
                  style={{
                    fontFamily:
                      'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: `${(explainFontSize / 16) * scale}rem`,
                    fontWeight: 400,
                    color: '#686868',
                    lineHeight: isMobile760
                      ? `${(22 / 16) * scale}rem`
                      : isTab1199
                        ? `${(30 / 16) * scale}rem`
                        : `${(26 / 16) * scale}rem`,
                    margin: 0,
                    whiteSpace: isDesktop1440 ? 'nowrap' : 'normal',
                    wordBreak: isDesktop1440 ? 'normal' : 'break-word',
                  }}
                >
                  {item.explainText}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ModalToggle;
