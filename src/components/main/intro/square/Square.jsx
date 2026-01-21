import { useEffect, useMemo, useRef, useState } from 'react';

import cursorIcon from '@/assets/icons/cursor-pointer.svg';
import GridSection from '@/components/layout/background/GridSection';

// grid
const columns = 24;
const rows = 18;
const baseSquareSize = 60;
const baseGridWidth = columns * baseSquareSize;

const OFFSCREEN = -1000;

// ====== TUNING (여기만 만지면 체감 바뀜) ======

// “커서 크기만큼” 강한 영역 반경 = (커서 반지름) * 이 배수
const CORE_RADIUS_MULT = 1.05;

// 강한 영역 밖 퍼짐(페이드) = core * 이 배수
const FALLOFF_MULT = 1.8;

// 꼬리 길이(최근 경로 샘플 유지 시간)
const TRAIL_MS = 140;

// 꼬리 샘플 최대 개수(너무 크면 계산량 증가)
const TRAIL_MAX_POINTS = 10;

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
  const [squareSize, setSquareSize] = useState(baseSquareSize);
  const [scale, setScale] = useState(1);

  // 커서 이미지 위치만 state (432칸은 React로 안 건드림)
  const [cursorAbs, setCursorAbs] = useState({ x: OFFSCREEN, y: OFFSCREEN });

  const gridRef = useRef(null);
  const cursorRef = useRef(null);

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

  // per-cell intensity (현재값) — rAF에서만 갱신
  const intensityRef = useRef(new Float32Array(rows * columns)); // current intensity 0..1

  // “최근에 손댄 칸”만 업데이트하기 위한 active set
  const activeRef = useRef(new Set());

  // responsive: squareSize/scale
  useEffect(() => {
    const calculateSquareSize = () => {
      const windowWidth = window.innerWidth;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      const calculatedScale = windowWidth / (baseGridWidth * (rootFontSize / 16));
      setScale(calculatedScale);
      setSquareSize(baseSquareSize * (windowWidth / baseGridWidth));
    };

    calculateSquareSize();
    window.addEventListener('resize', calculateSquareSize);
    return () => window.removeEventListener('resize', calculateSquareSize);
  }, []);

  // px -> rem
  const pxToRem = (px) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return px / rootFontSize;
  };
  const squareSizeRem = useMemo(() => pxToRem(squareSize), [squareSize]);

  useEffect(() => onScaleChange?.(scale), [scale, onScaleChange]);
  useEffect(() => onSquareSizeRemChange?.(squareSizeRem), [squareSizeRem, onSquareSizeRemChange]);

  // mousemove: 좌표 저장 + 커서 state만 갱신
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

      // 커서 이미지 표시/이동
      if (inside) setCursorAbs({ x: e.clientX, y: e.clientY });
      else setCursorAbs({ x: OFFSCREEN, y: OFFSCREEN });

      // motion + trail 갱신
      const m = motionRef.current;
      const now = performance.now();

      if (inside && m.prevX >= 0 && m.prevY >= 0) {
        const dx = x - m.prevX;
        const dy = y - m.prevY;
        const d = Math.hypot(dx, dy);

        // 간단 velocity (dt까지 엄밀히 안 가도 체감 충분)
        m.vx = dx;
        m.vy = dy;
        m.speed = d;
      } else {
        m.vx = 0;
        m.vy = 0;
        m.speed = 0;
      }

      m.prevX = inside ? x : OFFSCREEN;
      m.prevY = inside ? y : OFFSCREEN;

      if (inside) {
        // trail 포인트 쌓기 (너무 촘촘하면 의미없고 계산만 늘어남)
        const pts = m.points;
        const last = pts[pts.length - 1];
        const minDist = 2.5; // px: 이 정도는 움직였을 때만 추가
        if (!last || Math.hypot(x - last.x, y - last.y) > minDist) {
          pts.push({ x, y, t: now });
          if (pts.length > TRAIL_MAX_POINTS) pts.shift();
        }
        // 오래된 포인트 제거는 rAF에서 한번에 처리
      } else {
        m.points.length = 0;
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // rAF: transition 없이 per-cell intensity를 직접 보간 + trail(꼬리) 반영
  useEffect(() => {
    let rafId;
    let lastTs = performance.now();

    // 3-step gradient
    const c1 = { r: 0xed, g: 0xf6, b: 0xad };
    const c2 = { r: 0xde, g: 0xef, b: 0x6e };
    const c3 = { r: 0xc6, g: 0xe4, b: 0x00 };

    // 미리 캐시(0..255 단계) → 매 프레임 문자열 계산 비용 줄임
    const colorLUT = Array.from({ length: 256 }, (_, i) => {
      const t = smoothstep(i / 255);
      const col = t < 0.5 ? lerpColor(c1, c2, t / 0.5) : lerpColor(c2, c3, (t - 0.5) / 0.5);
      return `rgb(${col.r}, ${col.g}, ${col.b})`;
    });

    const getColor = (t01) => colorLUT[Math.max(0, Math.min(255, (t01 * 255) | 0))];

    const clearAllDOM = () => {
      const active = activeRef.current;
      for (const idx of active) {
        const el = cellRefs.current[idx];
        if (el) el.style.backgroundColor = 'transparent';
        intensityRef.current[idx] = 0;
      }
      active.clear();
    };

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(40, Math.max(1, now - lastTs)); // ms
      lastTs = now;

      const { inside, x, y } = pointerRef.current;

      if (!inside || x < 0 || y < 0) {
        // 밖으로 나가면 자연스럽게 꺼지게 할 수도 있지만, UX상 즉시 꺼지는 게 깔끔
        clearAllDOM();
        rafId = requestAnimationFrame(tick);
        return;
      }

      // 커서 렌더 크기 기반 core 반경
      let cursorRadiusPx = 16;
      const cursorEl = cursorRef.current;
      if (cursorEl) {
        const r = cursorEl.getBoundingClientRect();
        cursorRadiusPx = Math.max(r.width, r.height) / 2 || cursorRadiusPx;
      }

      const coreR = cursorRadiusPx * CORE_RADIUS_MULT;
      const maxR = coreR * FALLOFF_MULT;

      // trail 포인트 정리(시간 기준)
      const m = motionRef.current;
      const pts = m.points;
      while (pts.length && now - pts[0].t > TRAIL_MS) pts.shift();

      // “꼬리 느낌”은 현재 포인트 + 최근 포인트들의 max 영향으로 만든다.
      // 단, 정지 시에는 꼬리 영향 약화.
      const moving = m.speed > MOVE_EPS_PX;

      // 전체 영향 범위 bounding box(현재 + trail)
      let minX = x - maxR,
        maxX = x + maxR,
        minY = y - maxR,
        maxY = y + maxR;

      for (const p of pts) {
        // 꼬리는 core보다 약간 더 퍼지도록(부드러운 흐름)
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

      // 이번 프레임에 “target 계산된 칸”들
      const touched = new Set();

      // 목표값(target) 계산 함수:
      // - 현재 커서: coreR 안이면 1, 밖은 maxR까지 페이드
      // - trail: 각 포인트는 나이에 따라 가중치 감소 + coreR보다 약한 강도로
      const targetAtCell = (cx, cy) => {
        // 현재 커서 영향
        const d0 = Math.hypot(cx - x, cy - y);
        let best = 0;

        if (d0 <= maxR) {
          const t = d0 <= coreR ? 1 : 1 - (d0 - coreR) / Math.max(1, maxR - coreR);
          best = Math.max(best, smoothstep(clamp01(t)));
        }

        if (pts.length) {
          // trail 영향: 최근일수록 강함, 멀수록 약함
          for (let i = pts.length - 1; i >= 0; i--) {
            const p = pts[i];
            const age = (now - p.t) / TRAIL_MS; // 0..1
            const ageW = Math.pow(TRAIL_DECAY, age * 10); // 체감 튜닝용

            // 정지 상태면 trail 약화
            const moveW = moving ? 1 : 0.18;

            // trail 반경은 조금 더 작고, 강도도 낮게
            const trCore = coreR * 0.9;
            const trMax = maxR * 0.95;

            const d = Math.hypot(cx - p.x, cy - p.y);
            if (d > trMax) continue;

            const t = d <= trCore ? 1 : 1 - (d - trCore) / Math.max(1, trMax - trCore);

            // trail은 현재 커서보다 최대치 낮게(0.65)
            const v = smoothstep(clamp01(t)) * 0.65 * ageW * moveW;
            if (v > best) best = v;

            // best가 충분히 크면 더 안 봐도 됨
            if (best > 0.98) break;
          }
        }

        return best;
      };

      const current = intensityRef.current;
      const active = activeRef.current;

      // follow alpha (dt 독립): alpha = 1 - exp(-dt/tau)
      const alpha = 1 - Math.exp(-dt / FOLLOW_TAU_MS);

      // 1) 후보 칸들 target 계산 + current를 target으로 보간 + DOM 업데이트
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const centerX = col * squareSize + squareSize / 2;
          const centerY = row * squareSize + squareSize / 2;

          const target = targetAtCell(centerX, centerY);
          if (target <= EPS && current[row * columns + col] <= EPS) {
            continue; // 영향도 거의 없고 현재도 0이면 스킵
          }

          const idx = row * columns + col;
          touched.add(idx);

          const cur = current[idx];
          const next = cur + (target - cur) * alpha;
          current[idx] = next;

          const el = cellRefs.current[idx];
          if (!el) continue;

          if (next <= EPS) {
            // 거의 0이면 투명 처리
            el.style.backgroundColor = 'transparent';
            active.delete(idx);
            current[idx] = 0;
          } else {
            el.style.backgroundColor = getColor(next);
            active.add(idx);
          }
        }
      }

      // 2) 이전에 활성(active)인데 이번 touched 범위 바깥으로 밀려난 칸들도 “서서히 꺼지게” 처리
      //    (이게 없으면 bounding box 밖 칸이 그대로 남을 수 있음)
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
      <GridSection />

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
                    // CSS transition 제거: rAF에서 직접 보간(더 안정적)
                    willChange: 'background-color',
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* 커서 이미지 */}
      <img
        ref={cursorRef}
        src={cursorIcon}
        alt="cursor"
        className="pointer-events-none fixed z-50 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
        style={{
          left: `${cursorAbs.x}px`,
          top: `${cursorAbs.y}px`,
          transform: 'translate(-50%, -50%)',
          display: cursorAbs.x < 0 ? 'none' : 'block',
          willChange: 'transform, left, top',
        }}
      />
    </>
  );
}
