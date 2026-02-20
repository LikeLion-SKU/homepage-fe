// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import labelBlah1Icon from '@/assets/icons/main/label-blah1.svg';
import labelBlah2Icon from '@/assets/icons/main/label-blah2.svg';
import useScale from '@/components/main/hooks/useScale';

function LabelBlahMarquee({ type = '1' }) {
  const scale = useScale();
  const icon = type === '1' ? labelBlah1Icon : labelBlah2Icon;
  const isReverse = type === '2';

  // 텍스트 설정
  const text = 'LIKELION';
  const fontSize = `${(120 / 16) * scale}rem`; // 크기 증가 (32 -> 48)
  const letterSpacing = `${(7 / 16) * scale}rem`;

  return (
    <div className="relative" style={{ position: 'relative' }}>
      {/* 배경 SVG */}
      <img
        src={icon}
        alt={`Label BLAH ${type}`}
        className="object-contain"
        style={{
          width: `${(1220 / 16) * scale}rem`,
          height: `${(140 / 16) * scale}rem`,
          minWidth: `${(1220 / 16) * scale}rem`,
          minHeight: `${(140 / 16) * scale}rem`,
          imageRendering: 'crisp-edges',
          display: 'block',
        }}
      />

      {/* 전광판 텍스트 - SVG 안에 오버레이 */}
      <div
        className="absolute"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          left: type === '1' ? `${(50 / 16) * scale}rem` : `${(80 / 16) * scale}rem`,
          right: type === '1' ? `${(50 / 16) * scale}rem` : `${(80 / 16) * scale}rem`,
          bottom: `${(-20 / 16) * scale}rem`,
          top: 'auto',
        }}
      >
        <div
          className={
            isReverse
              ? 'blah-marquee-content-reverse'
              : type === '1'
                ? 'blah-marquee-content-offset'
                : 'blah-marquee-content'
          }
          style={{
            display: 'inline-flex',
            fontFamily: 'Bytebounce, pixel',
            fontSize: fontSize,
            color: '#00156A',
            fontWeight: 'bold',
            letterSpacing: letterSpacing,
            whiteSpace: 'nowrap',
          }}
        >
          {/* 텍스트를 여러 번 반복하여 무한 스크롤 효과 */}
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LabelBlahMarquee;
