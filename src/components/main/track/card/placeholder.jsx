import useScale from '@/components/main/hooks/useScale';

function CardPlaceholder({ image }) {
  const scale = useScale();

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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          style={{
            width: '88%',
            height: '88%',
          }}
        />
      )}
    </div>
  );
}

export default CardPlaceholder;
