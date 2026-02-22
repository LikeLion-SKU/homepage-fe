import { useEffect } from 'react';

/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function ClickCursor({ cursorRef }) {
  const scale = useScale();
  // 터치 디바이스만 체크 (데스크톱에서 모바일 사이즈로 봐도 커서 표시)
  const isMobile = useMediaQuery('(pointer: coarse)');

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.setProperty('--scale', String(scale));
      // 모바일에서는 커서 숨기기
      if (isMobile) {
        cursorRef.current.style.opacity = '0';
        cursorRef.current.style.pointerEvents = 'none';
      }
    }
  }, [scale, cursorRef, isMobile]);

  // 모바일에서는 렌더링하지 않음
  if (isMobile) {
    return null;
  }

  return (
    <div className="awards-click-cursor" ref={cursorRef} aria-hidden="true">
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          padding: `calc(7px * var(--scale, ${scale}))`,
        }}
      >
        <motion.span
          className="awards-click-cursor-arrow awards-click-cursor-arrow-left"
          style={{
            backgroundImage: 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['100% 0%', '-100% 0%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          &lt;
        </motion.span>
        <motion.span
          className="awards-click-cursor-label"
          style={{
            backgroundImage: 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['100% 0%', '-100% 0%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          DRAG
        </motion.span>
        <motion.span
          className="awards-click-cursor-arrow awards-click-cursor-arrow-right"
          style={{
            backgroundImage: 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: ['100% 0%', '-100% 0%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          &gt;
        </motion.span>
      </div>
    </div>
  );
}

export default ClickCursor;
