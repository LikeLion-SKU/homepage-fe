import { useEffect, useState } from 'react';

// Grid configuration: 24 columns x 18 rows
const columns = 24;
const rows = 18;
const baseSquareSize = 60; // 기본 크기 (1440px 기준)
const baseGridWidth = columns * baseSquareSize; // 1440px

function GridSection({ children }) {
  const [squareSize, setSquareSize] = useState(baseSquareSize);

  // 화면 크기에 따라 squareSize 계산
  useEffect(() => {
    const calculateSquareSize = () => {
      const windowWidth = window.innerWidth;
      // 화면 너비에 맞춰 비율로 조정 (작으면 축소, 크면 확대) - 헤더/푸터와 동일
      const scale = windowWidth / baseGridWidth;
      setSquareSize(baseSquareSize * scale);
    };

    calculateSquareSize();
    window.addEventListener('resize', calculateSquareSize);
    return () => window.removeEventListener('resize', calculateSquareSize);
  }, []);

  // squareSize를 rem으로 변환하는 헬퍼 함수
  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };

  const gridWidthRem = pxToRem(columns * squareSize);
  const gridHeightRem = pxToRem(rows * squareSize);
  const squareSizeRem = pxToRem(squareSize);

  return (
    <main className="relative overflow-hidden" style={{ minHeight: `${gridHeightRem}rem` }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col z-0 box-border pointer-events-none"
        style={{
          width: `${gridWidthRem}rem`,
          height: `${gridHeightRem}rem`,
          maxWidth: '100vw',
        }}
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: columns }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="box-border"
                style={{
                  width: `${squareSizeRem}rem`,
                  height: `${squareSizeRem}rem`,
                  border: '0.8px solid rgba(0, 0, 0, 0.08)',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </main>
  );
}

export default GridSection;
