function ModalIndicators({
  count = 4,
  activeIndex = 0,
  backgroundColor = '#E0E0E0',
  activeColor = '#1a1a1a',
  scale = 1,
}) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        gap: `${(20 / 16) * scale}rem`,
        padding: `${(12 / 16) * scale}rem`,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `${(4 / 16) * scale}rem`,
            height: `${(24 / 16) * scale}rem`,
            backgroundColor: index === activeIndex ? activeColor : backgroundColor,
          }}
        />
      ))}
    </div>
  );
}

export default ModalIndicators;
