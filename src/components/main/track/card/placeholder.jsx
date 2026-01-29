import useScale from '@/components/main/hooks/useScale';

function CardPlaceholder({ image }) {
  const scale = useScale();

  return (
    <div
      className="flex-1 bg-[#F9F9F9] relative overflow-hidden"
      style={{
        minHeight: `${(320 / 16) * scale}rem`,
      }}
    >
      {image && <img src={image} alt="" className="w-full h-full object-cover" />}
    </div>
  );
}

export default CardPlaceholder;
