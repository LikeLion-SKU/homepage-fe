import { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import useMediaQuery from '@/hooks/useMediaQuery';

import ModalOverlay from './ModalOverlay';
import ModalWindow from './ModalWindow';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function ScheduleModal({
  isOpen,
  onClose,
  modalData = [],
  modalGap = 32,

  overlayBgColor,
  overlayOpacity,

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

  windowBgColor,
  windowBorderColor,
  windowBorderWidth,
}) {
  const isMobile = useMediaQuery('(max-width: 760px)');
  const [fitScale, setFitScale] = useState(1);

  // 최대 2개까지
  const modalsToShow = modalData.slice(0, 2);
  const count = modalsToShow.length;

  useEffect(() => {
    const recalc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 디자인 기준(원본)
      const BASE_W = 468;
      const BASE_H = 552;
      const R = BASE_H / BASE_W; // 종횡비

      // 화면 여백
      const MARGIN_X = isMobile ? 16 : 24;
      const MARGIN_Y = isMobile ? 16 : 24;

      const availW = Math.max(0, vw - MARGIN_X * 2);
      const availH = Math.max(0, vh - MARGIN_Y * 2);

      // 2개일 때 gap을 자동으로 줄이기
      const effectiveGap = count === 2 ? Math.min(modalGap, 16) : modalGap;

      // 한 장 폭을 2개 기준으로 정의 (1개일 때도 동일하게 사용)
      const wCard = (availW - effectiveGap) / 2;

      // 1개일 때도 똑같이 wCard 사용
      let w = wCard;
      let h = w * R;

      // 세로가 화면을 넘치면 세로 기준으로 다시 맞춤 (비율 유지)
      if (h > availH) {
        h = availH;
        w = h / R;
      }

      // 760px 이하 2개일 때만 높이를 늘려서 텍스트가 다 보이게
      if (isMobile && count === 2) {
        const maxH = vh - 24; // 뷰포트 상단/하단 여백
        h = Math.min(h * 1.4, maxH); // 40% 정도 (텍스트가 다 보이도록)
      }

      // 내부 요소 스케일은 폭 기준
      const s = w / BASE_W;

      // 가득 차게 화면 밖으로는 못 나가게
      const MAX_S = 1.25;

      // 1개일 때만 너무 작아지지 않게하한을 적용
      const MIN_S = count === 1 ? (isMobile ? 0.85 : 0.8) : 0;

      setFitScale(clamp(s, MIN_S, MAX_S));
    };

    recalc();
    window.addEventListener('resize', recalc, { passive: true });
    return () => window.removeEventListener('resize', recalc);
  }, [isMobile, count, modalGap]);

  // 2개일 때 gap을 자동으로 줄이기
  const effectiveGap = count === 2 ? Math.min(modalGap, 16) : modalGap;
  const gapRem = useMemo(() => `${(effectiveGap / 16) * fitScale}rem`, [effectiveGap, fitScale]);

  if (!isOpen || !modalData || modalData.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden">
      <ModalOverlay onClick={onClose} backgroundColor={overlayBgColor} opacity={overlayOpacity} />

      <div
        className="flex items-center justify-center"
        style={{
          gap: gapRem,
          flexWrap: 'nowrap',
          maxWidth: 'calc(100vw - 24px)',
          maxHeight: 'calc(100vh - 24px)',
          overflow: 'auto',
          padding: '12px',
        }}
      >
        {modalsToShow.map((data, index) => (
          <ModalWindow
            key={index}
            title={data.title}
            contentImage={data.contentImage}
            contentTitle={data.contentTitle}
            contentDescription={data.contentDescription}
            titleBarBgColor={titleBarBgColor}
            titleBarIconBoxColor={titleBarIconBoxColor}
            titleBarTitleBoxColor={titleBarTitleBoxColor}
            titleBarBoxSize={titleBarBoxSize}
            placeholderBgColor={placeholderBgColor}
            placeholderPaddingHorizontal={placeholderPaddingHorizontal}
            placeholderPaddingTop={placeholderPaddingTop}
            textTitleColor={textTitleColor}
            textDescriptionColor={textDescriptionColor}
            textBgColor={textBgColor}
            windowBgColor={windowBgColor}
            windowBorderColor={windowBorderColor}
            windowBorderWidth={windowBorderWidth}
            scale={fitScale}
            variantCount={modalsToShow.length}
            onClose={onClose}
          />
        ))}
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}

export default ScheduleModal;
