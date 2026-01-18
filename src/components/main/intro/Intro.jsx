import { useEffect, useRef, useState } from 'react';

import cursorIcon from '@/assets/icons/cursor-pointer.svg';
import GridSection from '@/components/background/GridSection';

// Grid configuration: 24 columns x 16 rows
const columns = 24;
const rows = 16;
const baseSquareSize = 60; // 기본 크기 (1440px 기준)
const baseGridWidth = columns * baseSquareSize; // 1440px

const predefinedSquares = {
  '3-2': '#242424', // x=240, y=259
  '3-17': '#d9d9d9', // x=1020, y=259
  '5-16': '#d9d9d9', // x=960, y=379
  '1-20': '#636363', // x=1200, y=79
  '2-14': '#d9d9d9', // x=840, y=139
  '3-13': '#636363', // x=780, y=199
  '7-23': '#636363', // x=1380, y=439
  '9-0': '#d9d9d9', // x=0, y=559
  '13-3': '#636363', // x=180, y=799
  '14-16': '#636363', // x=960, y=859
  '15-18': '#636363', // x=1080, y=919
  '15-19': '#636363', // x=1140, y=919
  '15-20': '#636363', // x=1200, y=919
  '12-3': '#d9d9d9', // x=180, y=739
  '11-2': '#d9d9d9', // x=120, y=679
};

function Intro() {
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 }); // 절대 좌표 (clientX, clientY)
  const [cursorRelativePos, setCursorRelativePos] = useState({ x: -1000, y: -1000 }); // 그리드 내 상대 좌표
  const [affectedSquares, setAffectedSquares] = useState(new Set()); // 영향받는 사각형들
  const [squareSize, setSquareSize] = useState(baseSquareSize);
  const gridRef = useRef(null);

  // 화면 크기에 따라 squareSize 계산
  useEffect(() => {
    const calculateSquareSize = () => {
      const windowWidth = window.innerWidth;
      const baseGridWidthPx = baseGridWidth;

      // 화면 너비에 맞춰 비율로 조정 (작으면 축소, 크면 확대) - 헤더/푸터와 동일
      const scale = windowWidth / baseGridWidthPx;
      setSquareSize(baseSquareSize * scale);
    };

    calculateSquareSize();
    window.addEventListener('resize', calculateSquareSize);
    return () => window.removeEventListener('resize', calculateSquareSize);
  }, []);

  // 마우스 이동 이벤트 처리
  useEffect(() => {
    const handleMove = (e) => {
      if (!gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 그리드 영역 밖이면 off-screen 처리
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        setCursorPosition({ x: -1000, y: -1000 });
        setCursorRelativePos({ x: -1000, y: -1000 });
        setAffectedSquares(new Set());
        return;
      }

      setCursorPosition({ x: e.clientX, y: e.clientY }); // 절대 좌표
      setCursorRelativePos({ x, y }); // 그리드 내 상대 좌표

      // 커서가 직접 가리키는 사각형 찾기
      const cursorCol = Math.floor(x / squareSize);
      const cursorRow = Math.floor(y / squareSize);
      const cursorSquareKey = `${cursorRow}-${cursorCol}`;

      // 커서가 가리키는 방향의 근처 사각형 3개 찾기
      // 커서 아이콘 방향: 아래쪽으로 약간 오른쪽 기울어짐 (약 30도)
      const cursorAngle = Math.PI / 6; // 30도
      const cursorDirX = Math.sin(cursorAngle);
      const cursorDirY = Math.cos(cursorAngle);

      // 모든 사각형과의 거리 계산
      const squareDistances = [];
      const d9d9d9Squares = []; // #d9d9d9 사각형들 (커서 근처에 있으면 무조건 포함)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const key = `${row}-${col}`;
          // 이미 색이 지정된 사각형은 제외 (#d9d9d9 제외)
          if (predefinedSquares[key] && predefinedSquares[key] !== '#d9d9d9') {
            continue;
          }

          // 커서가 직접 가리키는 사각형은 제외 (나중에 별도로 추가)
          if (key === cursorSquareKey) {
            continue;
          }

          const squareX = col * squareSize + squareSize / 2;
          const squareY = row * squareSize + squareSize / 2;
          const dx = squareX - x;
          const dy = squareY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // #d9d9d9 사각형은 커서 근처에 있으면 무조건 포함
          if (predefinedSquares[key] === '#d9d9d9' && distance < squareSize * 2) {
            d9d9d9Squares.push({ key, distance, row, col });
            continue;
          }

          // 커서 방향으로의 거리 (커서가 가리키는 방향)
          const projDistance = dx * cursorDirX + dy * cursorDirY;
          // 커서에 수직인 거리
          const perpDistance = Math.abs(dx * cursorDirY - dy * cursorDirX);

          // 커서가 가리키는 방향에 있는 사각형만 고려 (projDistance > 0)
          if (
            projDistance > 0 &&
            projDistance < squareSize * 2 &&
            perpDistance < squareSize * 1.5
          ) {
            squareDistances.push({ key, distance, row, col });
          }
        }
      }

      // 거리순으로 정렬하고 가장 가까운 3개 선택
      squareDistances.sort((a, b) => a.distance - b.distance);
      const closestSquares = new Set(squareDistances.slice(0, 3).map((s) => s.key));

      // #d9d9d9 사각형들 추가 (커서 근처에 있는 것들)
      d9d9d9Squares.forEach((s) => closestSquares.add(s.key));

      // 커서가 직접 가리키는 사각형도 포함 (유효한 범위 내에 있고 이미 색이 지정되지 않은 경우)
      if (
        cursorRow >= 0 &&
        cursorRow < rows &&
        cursorCol >= 0 &&
        cursorCol < columns &&
        (!predefinedSquares[cursorSquareKey] || predefinedSquares[cursorSquareKey] === '#d9d9d9')
      ) {
        closestSquares.add(cursorSquareKey);
      }

      setAffectedSquares(closestSquares);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [squareSize]);

  const getSquareColor = (row, col) => {
    const key = `${row}-${col}`;

    // Check if it's a predefined colored square (not #d9d9d9)
    if (predefinedSquares[key] && predefinedSquares[key] !== '#d9d9d9') {
      return predefinedSquares[key];
    }

    // 영향받는 사각형에만 그라데이션 효과 적용
    if (!affectedSquares.has(key)) {
      return predefinedSquares[key] || 'transparent';
    }

    // 영향받는 사각형에 그라데이션 효과
    const squareX = col * squareSize + squareSize / 2;
    const squareY = row * squareSize + squareSize / 2;
    const dx = cursorRelativePos.x - squareX;
    const dy = cursorRelativePos.y - squareY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 가장 가까운 사각형일수록 더 진한 색상
    const maxDistance = squareSize * 1.5; // 약 90px
    const ratio = Math.max(0, Math.min(1, 1 - distance / maxDistance));

    // If it's a predefined #d9d9d9 square, start from #d9d9d9
    // Otherwise start from transparent
    const startColor = predefinedSquares[key] === '#d9d9d9' ? '#d9d9d9' : 'transparent';

    if (ratio === 0) {
      return startColor;
    }

    // Interpolate between start color and #636363
    let r1, g1, b1;
    if (startColor === 'transparent') {
      r1 = 255; // white background
      g1 = 255;
      b1 = 255;
    } else {
      r1 = parseInt('#d9d9d9'.substring(1, 3), 16);
      g1 = parseInt('#d9d9d9'.substring(3, 5), 16);
      b1 = parseInt('#d9d9d9'.substring(5, 7), 16);
    }

    const r2 = parseInt('#636363'.substring(1, 3), 16);
    const g2 = parseInt('#636363'.substring(3, 5), 16);
    const b2 = parseInt('#636363'.substring(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // squareSize를 rem으로 변환하는 헬퍼 함수
  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };

  const squareSizeRem = pxToRem(squareSize);

  return (
    <section className="relative w-full min-h-screen overflow-hidden" style={{ cursor: 'none' }}>
      <GridSection />
      {/* predefinedSquares와 커서 효과를 위한 오버레이 */}
      <div
        ref={gridRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col z-10 max-w-screen box-border pointer-events-none"
        style={{
          width: `${squareSizeRem * columns}rem`,
          height: `${squareSizeRem * rows}rem`,
        }}
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: columns }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="box-border transition-colors duration-150 ease-in-out"
                style={{
                  width: `${squareSizeRem}rem`,
                  height: `${squareSizeRem}rem`,
                  backgroundColor: getSquareColor(row, col),
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* 커서 이미지 */}
      <img
        src={cursorIcon}
        alt="cursor"
        className="pointer-events-none fixed z-50 transition-transform duration-100 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          display: cursorPosition.x < 0 ? 'none' : 'block',
        }}
      />
      {/* 여기에 Intro 내용 추가 */}
    </section>
  );
}

export default Intro;
