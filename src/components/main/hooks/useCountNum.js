import { useEffect, useRef, useState } from 'react';

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function useCountNum(end, start = 0, duration = 2000) {
  const [count, setCount] = useState(start);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);
  const intervalRef = useRef(null);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    // 기존 interval이 있으면 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    currentFrameRef.current = 0;

    // 상태를 start로 초기화 (다음 틱에서 실행)
    const initTimeout = setTimeout(() => {
      setCount(start);
    }, 0);

    // 약간의 지연 후 애니메이션 시작 (상태 초기화 보장)
    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        currentFrameRef.current += 1;
        const progress = easeOutExpo(currentFrameRef.current / totalFrame);
        const newCount = Math.round(start + (end - start) * progress);
        setCount(newCount);

        if (progress >= 1 || currentFrameRef.current >= totalFrame) {
          setCount(end); // 최종값 보장
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, frameRate);
    }, 10); // 초기화 후 약간의 지연

    // cleanup
    return () => {
      if (initTimeout) clearTimeout(initTimeout);
      if (startTimeout) clearTimeout(startTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [end, frameRate, start, totalFrame]);

  return count;
}
