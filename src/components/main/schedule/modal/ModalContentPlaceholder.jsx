import { useEffect, useRef, useState } from 'react';

// 이미지 로딩 상태를 전역적으로 추적하는 캐시
const imageCache = new Map();

function ModalContentPlaceholder({
  className = '',
  style = {},
  backgroundColor = '#636363',
  paddingHorizontal = '30px',
  paddingTop,
  paddingBottom,
  contentImage,
  title,
  scale = 1,
  forceFill = false,
}) {
  // 이미지가 이미 로드되었는지 초기 상태 확인
  const checkImageLoaded = (src) => {
    if (!src) return false;
    if (imageCache.has(src)) return true;

    // 브라우저 캐시에서 확인
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      imageCache.set(src, true);
      return true;
    }
    return false;
  };

  const [isImageLoaded, setIsImageLoaded] = useState(() => checkImageLoaded(contentImage));
  const imgRef = useRef(null);

  useEffect(() => {
    if (!contentImage) {
      return;
    }

    // 캐시에서 확인
    if (imageCache.has(contentImage)) {
      // 이미 로드된 경우 즉시 표시
      if (!isImageLoaded) {
        requestAnimationFrame(() => {
          setIsImageLoaded(true);
        });
      }
      return;
    }

    // 이미지가 이미 로드되었는지 확인
    const img = new Image();
    img.src = contentImage;

    if (img.complete && img.naturalWidth > 0) {
      // 이미 로드된 경우
      imageCache.set(contentImage, true);
      if (!isImageLoaded) {
        requestAnimationFrame(() => {
          setIsImageLoaded(true);
        });
      }
    } else {
      // 아직 로드되지 않은 경우
      img.onload = () => {
        imageCache.set(contentImage, true);
        setIsImageLoaded(true);
      };
      img.onerror = () => {
        // 에러 발생 시 기본값 유지
      };
    }
  }, [contentImage, isImageLoaded]);

  return (
    <div
      className={className}
      style={{
        ...style,
        width: '100%',
        height: forceFill ? '100%' : 'auto',
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingTop: paddingTop !== undefined ? paddingTop : paddingHorizontal,
        paddingBottom: paddingBottom !== undefined ? paddingBottom : paddingHorizontal,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          height: forceFill ? '100%' : '100%',
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: `${(10 / 16) * scale}rem`,
          flex: 1,
          minHeight: 0,
          position: 'relative',
        }}
      >
        {contentImage && (
          <img
            ref={imgRef}
            src={contentImage}
            alt={title}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isImageLoaded ? 1 : 0,
              transition: 'opacity 0.15s ease-in-out',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            onLoad={() => {
              imageCache.set(contentImage, true);
              setIsImageLoaded(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ModalContentPlaceholder;
