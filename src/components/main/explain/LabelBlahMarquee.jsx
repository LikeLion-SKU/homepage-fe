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

  // 8개 아이템으로 구성된 그룹 (2번 복제하여 정확히 200% 폭)
  const items = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className="blah-item">
      {text}
    </span>
  ));

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
        className="absolute blah-viewport"
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
          className={`blah-track ${isReverse ? 'is-reverse' : ''} ${type === '1' ? 'is-offset' : ''}`}
          style={{
            fontFamily: 'Bytebounce, pixel',
            fontSize: fontSize,
            color: '#00156A',
            fontWeight: 'bold',
            letterSpacing: letterSpacing,
          }}
        >
          <div className="blah-group">{items}</div>
          <div className="blah-group" aria-hidden="true">
            {items}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabelBlahMarquee;
