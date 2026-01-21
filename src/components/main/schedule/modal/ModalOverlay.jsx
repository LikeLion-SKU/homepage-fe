function ModalOverlay({ onClick, backgroundColor = 'rgba(0, 0, 0, 0.5)', opacity = 0.7 }) {
  return (
    <div
      className="fixed inset-0 z-[1000]"
      style={{
        backgroundColor,
        opacity,
      }}
      onClick={onClick}
    />
  );
}

export default ModalOverlay;
