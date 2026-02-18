import { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import ModalOverlay from '@/components/main/schedule/modal/ModalOverlay';
import { curriculumData } from '@/components/main/track/curriculumModalData';
import useMediaQuery from '@/hooks/useMediaQuery';

import ModalWindow from '../modal/ModalWindow';
import GridPattern from './GridPattern';
import CardContent from './content.jsx';
import CardHeader from './header';
import CardPlaceholder from './placeholder';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function Card({ title, description, image = null }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fitScale, setFitScale] = useState(1);
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(min-width: 481px) and (max-width: 1199px)');
  const isMobile760 = useMediaQuery('(max-width: 760px)');

  // title에서 트랙 추출
  const getTrackType = () => {
    if (title.includes('PO')) return 'PO';
    if (title.includes('FRONTEND')) return 'FRONTEND';
    if (title.includes('BACKEND')) return 'BACKEND';
    return null;
  };

  const trackType = getTrackType();
  const modalsToShow = useMemo(() => {
    const modalData = trackType ? curriculumData[trackType] : [];
    return modalData.slice(0, 2);
  }, [trackType]);
  const count = modalsToShow.length;

  // 모달 크기 계산 (ScheduleModal과 동일한 로직)
  useEffect(() => {
    if (!isModalOpen) return;

    let rafId = null;

    const recalc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 1440px 기준 디자인 크기
      const BASE_W = 1012;
      const BASE_H = 716;
      const R = BASE_H / BASE_W; // 종횡비 (약 0.7075)
      const BASE_SCREEN = 1440; // 기준 화면 크기

      // 화면 여백
      const MARGIN_X = isMobile760 ? 16 : 24;
      const MARGIN_Y = isMobile760 ? 16 : 24;

      const availW = Math.max(0, vw - MARGIN_X * 2);
      const availH = Math.max(0, vh - MARGIN_Y * 2);

      // 1440px 기준으로 스케일 계산 (비율 유지)
      const scaleRatio = vw / BASE_SCREEN;
      let w = BASE_W * scaleRatio;
      let h = BASE_H * scaleRatio;

      // 화면을 넘치지 않도록 조정 (비율 유지)
      if (w > availW) {
        w = availW;
        h = w * R;
      }
      if (h > availH) {
        h = availH;
        w = h / R;
      }

      // 내부 요소 스케일은 폭 기준
      const s = w / BASE_W;

      // 최소/최대 스케일 제한
      const MAX_S = 1.5;
      const MIN_S = isMobile760 ? 0.3 : 0.4;

      setFitScale(clamp(s, MIN_S, MAX_S));
    };

    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(recalc);
    };

    recalc();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile760, count, isModalOpen]);

  const effectiveGap = 40;
  const gapRem = useMemo(() => `${(effectiveGap / 16) * fitScale}rem`, [effectiveGap, fitScale]);

  const handleHeaderClick = () => {
    if (trackType) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <GridPattern
      className="w-full border border-[#00156A] flex flex-col bg-[#FAFBF8] relative overflow-hidden"
      style={{
        aspectRatio: isMobile ? '3/4' : undefined,
        height: isMobile ? undefined : '100%',
      }}
    >
      {/* 카드 전체 격자 위에 콘텐츠 배치 */}
      <div className="relative z-10 flex flex-col w-full h-full overflow-hidden">
        <CardHeader title={title} onHeaderClick={handleHeaderClick} />
        {/* 461px~1199px 구간: 이미지 좌측, 텍스트 우측 */}
        {isTablet ? (
          <div className="flex flex-row flex-1 min-h-0">
            <div className="flex-1 min-w-0">
              <CardPlaceholder image={image} />
            </div>
            <div className="flex-1 min-w-0">
              <CardContent description={description} />
            </div>
          </div>
        ) : (
          <>
            <CardPlaceholder image={image} />
            <CardContent description={description} />
          </>
        )}
      </div>
      {isModalOpen &&
        modalsToShow.length > 0 &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden">
            <ModalOverlay
              onClick={handleCloseModal}
              backgroundColor="rgba(0, 0, 0, 0.5)"
              opacity={0.7}
            />

            <div
              className="flex items-center justify-center"
              style={{
                gap: gapRem,
                flexWrap: 'nowrap',
                maxWidth: 'calc(100vw - 24px)',
                maxHeight: 'calc(100vh - 24px)',
                overflow: 'hidden',
                padding: '12px',
              }}
            >
              {modalsToShow.map((data, index) => (
                <ModalWindow
                  key={index}
                  title={data.title}
                  titleBarBgColor="transparent"
                  titleBarIconBoxColor="#00156A"
                  titleBarTitleBoxColor="#B3B3B3"
                  titleBarBoxSize={1}
                  windowBgColor="#FFFFFF"
                  windowBorderColor="#A8A8A8"
                  windowBorderWidth={2.5}
                  scale={fitScale}
                  onClose={handleCloseModal}
                />
              ))}
            </div>
          </div>,
          document.getElementById('modal-root') || document.body
        )}
    </GridPattern>
  );
}

export default Card;
