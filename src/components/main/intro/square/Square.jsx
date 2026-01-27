import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// grid
const columns = 24;
const rows = 18;
const baseSquareSize = 60;
const baseGridWidth = columns * baseSquareSize;

const OFFSCREEN = -1000;

// ====== TUNING ======

// “커서 크기만큼” 강한 영역 반경 = (커서 반지름) * 이 배수
const CORE_RADIUS_MULT = 1.05;

// 강한 영역 밖 퍼짐(페이드) = core * 이 배수
const FALLOFF_MULT = 1.8;

// 꼬리 길이(최근 경로 샘플 유지 시간)
const TRAIL_MS = 140;

// 꼬리 샘플 최대 개수(고속 보간 때문에 늘림)
const TRAIL_MAX_POINTS = 24;

// 고속 이동 시 경로를 촘촘히 채우는 스텝(px) (작을수록 더 부드럽고 계산량 증가)
const TRAIL_STEP_PX = 8; // 6~12 추천

// 움직임이 거의 없을 때(정지) 꼬리 영향 줄이기
const MOVE_EPS_PX = 0.8;

// 꼬리 샘플의 가중치 감소(나이)
const TRAIL_DECAY = 0.85; // 0~1 (낮을수록 빨리 사라짐)

// 현재 값이 목표 값으로 따라가는 속도(프레임 독립)
const FOLLOW_TAU_MS = 55; // 작을수록 더 “쫀쫀하게” 따라감

// 거의 0이면 투명으로 컷
const EPS = 0.015;

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function lerpColor(a, b, t) {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

export default function Square({ onScaleChange, onSquareSizeRemChange }) {
  const [layout, setLayout] = useState({ squareSize: baseSquareSize, scale: 1, squareSizeRem: 0 });
  const { squareSize, scale, squareSizeRem } = layout;

  const gridRef = useRef(null);

  // 432칸 DOM refs
  const cellRefs = useRef([]);

  // 현재 포인터 상태(ref)
  const pointerRef = useRef({
    inside: false,
    x: OFFSCREEN, // grid-relative
    y: OFFSCREEN,
    clientX: OFFSCREEN,
    clientY: OFFSCREEN,
  });

  // 이동/속도/방향 + trail
  const motionRef = useRef({
    prevX: OFFSCREEN,
    prevY: OFFSCREEN,
    vx: 0,
    vy: 0,
    speed: 0,
    points: [], // [{x,y,t}]
  });

  // per-cell intensity (현재값)
  const intensityRef = useRef(new Float32Array(rows * columns)); // current intensity 0..1

  // "최근에 손댄 칸"만 업데이트하기 위한 active set
  const activeRef = useRef(new Set());

  // px -> rem
  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };

  // responsive: squareSize/scale - useLayoutEffect로 첫 페인트 전에 계산
  useLayoutEffect(() => {
    const calculateLayout = () => {
      const windowWidth = window.innerWidth;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      const calculatedScale = windowWidth / (baseGridWidth * (rootFontSize / 16));
      const calculatedSquareSize = baseSquareSize * (windowWidth / baseGridWidth);
      const calculatedSquareSizeRem = pxToRem(calculatedSquareSize);

      // 한 번에 업데이트
      setLayout({
        squareSize: calculatedSquareSize,
        scale: calculatedScale,
        squareSizeRem: calculatedSquareSizeRem,
      });
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []);

  // 부모에 한 번에 전달
  useLayoutEffect(() => {
    onScaleChange?.(scale);
    onSquareSizeRemChange?.(squareSizeRem);
  }, [scale, squareSizeRem, onScaleChange, onSquareSizeRemChange]);

  // pointermove: 좌표 저장 + 커서 목표만 갱신 + trail 보간
  useEffect(() => {
    const handleMove = (e) => {
      const gridEl = gridRef.current;
      if (!gridEl) return;

      const rect = gridEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;

      pointerRef.current.inside = inside;
      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.clientX = e.clientX;
      pointerRef.current.clientY = e.clientY;

      // motion + trail 갱신
      const m = motionRef.current;
      const now = performance.now();

      if (inside && m.prevX >= 0 && m.prevY >= 0) {
        const dx = x - m.prevX;
        const dy = y - m.prevY;
        const d = Math.hypot(dx, dy);
        m.vx = dx;
        m.vy = dy;
        m.speed = d;
      } else {
        m.vx = 0;
        m.vy = 0;
        m.speed = 0;
      }

      // trail: 고속 이동이면 중간 포인트 삽입해서 "선"으로 만들기
      if (inside) {
        const pts = m.points;
        const last = pts[pts.length - 1];

        if (!last) {
          pts.push({ x, y, t: now });
        } else {
          const dxp = x - last.x;
          const dyp = y - last.y;
          const dist = Math.hypot(dxp, dyp);

          // 너무 미세한 떨림은 무시 (계산량 감소)
          if (dist >= 1.2) {
            const steps = Math.max(1, Math.floor(dist / TRAIL_STEP_PX));
            for (let s = 1; s <= steps; s++) {
              const tt = s / steps;
              pts.push({
                x: last.x + dxp * tt,
                y: last.y + dyp * tt,
                t: now - (1 - tt) * 6, // 살짝 시간 분산(자연스러움)
              });
            }
          }
        }

        while (m.points.length > TRAIL_MAX_POINTS) m.points.shift();
      } else {
        m.points.length = 0;
      }

      m.prevX = inside ? x : OFFSCREEN;
      m.prevY = inside ? y : OFFSCREEN;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  // rAF: per-cell intensity 보간 + trail 반영
  useEffect(() => {
    let rafId;
    let lastTs = performance.now();

    // 3-step gradient
    const c1 = { r: 0xed, g: 0xf6, b: 0xad };
    const c2 = { r: 0xde, g: 0xef, b: 0x6e };
    const c3 = { r: 0xc6, g: 0xe4, b: 0x00 };

    // LUT 캐시
    const colorLUT = Array.from({ length: 256 }, (_, i) => {
      const t = smoothstep(i / 255);
      const col = t < 0.5 ? lerpColor(c1, c2, t / 0.5) : lerpColor(c2, c3, (t - 0.5) / 0.5);
      return `rgb(${col.r}, ${col.g}, ${col.b})`;
    });

    const getColor = (t01) => colorLUT[Math.max(0, Math.min(255, (t01 * 255) | 0))];

    const clearAllDOM = () => {
      const active = activeRef.current;
      const curArr = intensityRef.current;

      for (const idx of active) {
        const el = cellRefs.current[idx];
        if (el) el.style.backgroundColor = 'transparent';
        curArr[idx] = 0;
      }
      active.clear();
    };

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(40, Math.max(1, now - lastTs)); // ms
      lastTs = now;

      const { inside, x, y } = pointerRef.current;

      if (!inside || x < 0 || y < 0) {
        clearAllDOM();
        rafId = requestAnimationFrame(tick);
        return;
      }

      // 커서 크기 기반 core 반경 (전역 커서 크기 기준)
      const cursorRadiusPx = 16;

      // trail 포인트 정리(시간 기준)
      const m = motionRef.current;
      const pts = m.points;
      while (pts.length && now - pts[0].t > TRAIL_MS) pts.shift();

      const moving = m.speed > MOVE_EPS_PX;

      // 속도 기반 반경 부스트 (고속에서 끊김 완화)
      const speedBoost = clamp01(m.speed / 30); // 0..1
      const coreR = cursorRadiusPx * CORE_RADIUS_MULT * (1 + 0.25 * speedBoost);
      const maxR = coreR * FALLOFF_MULT * (1 + 0.15 * speedBoost);

      // 전체 영향 범위 bounding box (현재 + trail)
      let minX = x - maxR,
        maxX = x + maxR,
        minY = y - maxR,
        maxY = y + maxR;

      for (const p of pts) {
        const extra = maxR * 0.85;
        minX = Math.min(minX, p.x - extra);
        maxX = Math.max(maxX, p.x + extra);
        minY = Math.min(minY, p.y - extra);
        maxY = Math.max(maxY, p.y + extra);
      }

      const minCol = Math.max(0, Math.floor(minX / squareSize));
      const maxCol = Math.min(columns - 1, Math.floor(maxX / squareSize));
      const minRow = Math.max(0, Math.floor(minY / squareSize));
      const maxRow = Math.min(rows - 1, Math.floor(maxY / squareSize));

      const touched = new Set();

      const targetAtCell = (cx, cy) => {
        // 현재 커서 영향
        const d0 = Math.hypot(cx - x, cy - y);
        let best = 0;

        if (d0 <= maxR) {
          const t = d0 <= coreR ? 1 : 1 - (d0 - coreR) / Math.max(1, maxR - coreR);
          best = Math.max(best, smoothstep(clamp01(t)));
        }

        if (pts.length) {
          for (let i = pts.length - 1; i >= 0; i--) {
            const p = pts[i];
            const age = (now - p.t) / TRAIL_MS; // 0..1
            const ageW = Math.pow(TRAIL_DECAY, age * 10);

            const moveW = moving ? 1 : 0.18;

            // trail은 현재보다 약간 약하고 살짝 좁게
            const trCore = coreR * 0.9;
            const trMax = maxR * 0.95;

            const d = Math.hypot(cx - p.x, cy - p.y);
            if (d > trMax) continue;

            const t = d <= trCore ? 1 : 1 - (d - trCore) / Math.max(1, trMax - trCore);

            const v = smoothstep(clamp01(t)) * 0.65 * ageW * moveW;
            if (v > best) best = v;
            if (best > 0.98) break;
          }
        }

        return best;
      };

      const current = intensityRef.current;
      const active = activeRef.current;

      // dt 독립 보간
      const alpha = 1 - Math.exp(-dt / FOLLOW_TAU_MS);

      // 1) 후보 칸 업데이트
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const centerX = col * squareSize + squareSize / 2;
          const centerY = row * squareSize + squareSize / 2;

          const target = targetAtCell(centerX, centerY);
          const idx = row * columns + col;

          if (target <= EPS && current[idx] <= EPS) continue;

          touched.add(idx);

          const cur = current[idx];
          const next = cur + (target - cur) * alpha;
          current[idx] = next;

          const el = cellRefs.current[idx];
          if (!el) continue;

          if (next <= EPS) {
            el.style.backgroundColor = 'transparent';
            active.delete(idx);
            current[idx] = 0;
          } else {
            el.style.backgroundColor = getColor(next);
            active.add(idx);
          }
        }
      }

      // 2) active인데 이번 touched에 없는 칸은 서서히 꺼짐
      if (active.size) {
        const toCheck = [];
        for (const idx of active) {
          if (!touched.has(idx)) toCheck.push(idx);
        }

        for (const idx of toCheck) {
          const cur = current[idx];
          const next = cur + (0 - cur) * alpha;
          current[idx] = next;

          const el = cellRefs.current[idx];
          if (!el) continue;

          if (next <= EPS) {
            el.style.backgroundColor = 'transparent';
            active.delete(idx);
            current[idx] = 0;
          } else {
            el.style.backgroundColor = getColor(next);
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [squareSize]);

  return (
    <>
      {/* 인트로 섹션 전용 격자 배경 (24 x 18 고정) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col z-0 box-border pointer-events-none"
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

      {/* 커서 영향 오버레이 */}
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
            {Array.from({ length: columns }).map((_, col) => {
              const idx = row * columns + col;
              return (
                <div
                  key={`${row}-${col}`}
                  ref={(el) => {
                    cellRefs.current[idx] = el;
                  }}
                  className="box-border"
                  style={{
                    width: `${squareSizeRem}rem`,
                    height: `${squareSizeRem}rem`,
                    backgroundColor: 'transparent',
                    willChange: 'background-color',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
