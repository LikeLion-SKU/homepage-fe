import { useLayoutEffect, useMemo, useState } from 'react';

const baseSquareSize = 60;
const baseColumns = 24;
const baseGridWidth = baseColumns * baseSquareSize; // 1440px 기준

function GridSection({ children }) {
  const [layout, setLayout] = useState({
    squareSize: baseSquareSize,
    squareSizeRem: 0,
    cols: baseColumns,
    rows: 18,
  });

  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };

  // 인트로 섹션과 동일한 반응형 계산 로직
  useLayoutEffect(() => {
    const calculateLayout = () => {
      const windowWidth = window.innerWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const targetHeight = Math.max(vh, docH);

      // 인트로 섹션과 동일한 계산 방식
      const calculatedSquareSize = baseSquareSize * (windowWidth / baseGridWidth);
      const calculatedSquareSizeRem = pxToRem(calculatedSquareSize);

      // 화면을 덮기 위해 필요한 칸 수
      const cols = Math.ceil(windowWidth / calculatedSquareSize);
      const rows = Math.ceil(targetHeight / calculatedSquareSize);

      setLayout({
        squareSize: calculatedSquareSize,
        squareSizeRem: calculatedSquareSizeRem,
        cols,
        rows,
      });
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    window.visualViewport?.addEventListener('resize', calculateLayout);

    return () => {
      window.removeEventListener('resize', calculateLayout);
      window.visualViewport?.removeEventListener('resize', calculateLayout);
    };
  }, []);

  const cellRem = useMemo(
    () => layout.squareSizeRem || pxToRem(baseSquareSize),
    [layout.squareSizeRem]
  );
  const gridWRem = useMemo(() => cellRem * layout.cols, [cellRem, layout.cols]);
  const gridHRem = useMemo(() => cellRem * layout.rows, [cellRem, layout.rows]);

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
        {Array.from({ length: layout.rows }).map((_, r) => (
          <div key={r} className="flex">
            {Array.from({ length: layout.cols }).map((_, c) => (
              <div
                key={`${r}-${c}`}
                className="box-border"
                style={{
                  width: `${cellRem}rem`,
                  height: `${cellRem}rem`,
                  border: '0.8px solid rgba(0, 0, 0, 0.06)',
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
