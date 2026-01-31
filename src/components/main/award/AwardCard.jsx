import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function AwardCard({ title, image, onClick }) {
  const scale = useScale();
  const isMobile460 = useMediaQuery('(max-width: 460px)');

  return (
    <div
      className="flex-shrink-0 bg-[#B0B0B0] overflow-hidden"
      style={{
        width: `${(699 / 16) * scale * (isMobile460 ? 1.6 : 1)}rem`,
        height: `${(393 / 16) * scale * (isMobile460 ? 1.6 : 1)}rem`,
        marginRight: `${(35 / 16) * scale}rem`,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
      }}
      onClick={onClick}
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
  );
}

export default AwardCard;
