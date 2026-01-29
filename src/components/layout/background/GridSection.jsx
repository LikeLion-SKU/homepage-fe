import { useEffect, useMemo, useState } from 'react';

const CELL_PX = 60; // 격자 셀 크기 고정

function GridSection({ children }) {
  const [dims, setDims] = useState({ cols: 24, rows: 18 });

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      // 어떤 모바일/데스크톱에서도 실제 표시 영역 기준
      const vw = document.documentElement.clientWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      // 세로 기준은 현재 페이지 전체 높이를 기준으로 계산해서
      // 인트로/프로젝트 등 긴 섹션에서도 아래가 비지 않도록 함
      const targetHeight = Math.max(vh, docH);

      // 화면을 덮기 위해 필요한 칸 수
      const cols = Math.ceil(vw / CELL_PX);
      const rows = Math.ceil(targetHeight / CELL_PX);

      setDims({ cols, rows });
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('resize', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
    };
  }, []);

  const pxToRem = (px) => {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / root;
  };

  const cellRem = useMemo(() => pxToRem(CELL_PX), []);
  const gridWRem = useMemo(() => pxToRem(dims.cols * CELL_PX), [dims.cols]);
  const gridHRem = useMemo(() => pxToRem(dims.rows * CELL_PX), [dims.rows]);

  return (
    // 페이지는 최소 뷰포트 높이를 가지되, 내용이 더 길면 자연스럽게 스크롤 되도록 height 대신 minHeight 사용
    <main className="relative overflow-hidden" style={{ minHeight: '100dvh', width: '100%' }}>
      {/* 배경 격자: 화면 좌상단에 딱 붙여서 그린다 (중앙정렬 금지) */}
      <div
        className="absolute top-0 left-0 flex flex-col z-0 pointer-events-none"
        style={{
          width: `${gridWRem}rem`,
          height: `${gridHRem}rem`,
        }}
      >
        {Array.from({ length: dims.rows }).map((_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: dims.cols }).map((_, c) => (
              <div
                key={`${r}-${c}`}
                className="box-border"
                style={{
                  width: `${cellRem}rem`,
                  height: `${cellRem}rem`,
                  border: '0.8px solid rgba(0, 0, 0, 0.08)',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* 콘텐츠는 배경 위 */}
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </main>
  );
}

export default GridSection;
