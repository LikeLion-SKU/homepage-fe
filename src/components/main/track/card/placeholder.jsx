import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function CardPlaceholder({ image }) {
  const scale = useScale();
  const isMobile = useMediaQuery('(max-width: 460px)');
  const isTablet = useMediaQuery('(min-width: 461px) and (max-width: 1199px)');

  return (
    <div
      className="flex-1 bg-transparent relative overflow-hidden"
      style={{
        minHeight: `${(320 / 16) * scale}rem`,
      }}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="absolute object-contain"
          style={{
            left: isTablet ? '-10%' : isMobile ? '50%' : '50%',
            top: isMobile ? '45%' : '50%',
            transform: isTablet
              ? 'translate(0, -53%)'
              : isMobile
                ? 'translate(-50%, -50%)'
                : 'translate(-50%, -50%)',
            width: isMobile ? '60%' : isTablet ? '85%' : '88%',
            height: isMobile ? '60%' : isTablet ? '85%' : '88%',
          }}
        />
      )}
    </div>
  );
}

export default CardPlaceholder;
