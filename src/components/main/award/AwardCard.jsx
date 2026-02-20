import { useState } from 'react';

import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function AwardCard({ title, image }) {
  const scale = useScale();
  const isMobile480 = useMediaQuery('(max-width: 480px)');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: `${(699 / 16) * scale * (isMobile480 ? 1.6 : 1)}rem`,
        height: `${(393 / 16) * scale * (isMobile480 ? 1.6 : 1)}rem`,
        marginRight: `${(35 / 16) * scale}rem`,
        padding: isHovered ? `${(5 / 16) * scale}rem` : '0',
        background: isHovered
          ? 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)'
          : 'transparent',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transformOrigin: 'center center',
        transition: 'padding 0.2s ease, transform 0.2s ease',
        position: 'relative',
      }}
    >
      <div
        className="w-full h-full bg-[#B0B0B0] overflow-hidden"
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 0,
        }}
      >
        {image ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#B0B0B0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 0,
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                // 카드 이미지 영역 전체를 채우도록
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: 0,
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#B0B0B0',
              borderRadius: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AwardCard;
