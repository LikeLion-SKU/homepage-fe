function ModalOverlay({ onClick, backgroundColor = 'rgba(0, 0, 0, 0.5)', opacity = 0.7 }) {
  return (
    <div
      className="fixed inset-0 z-[50] pointer-events-auto"
      style={{
        backgroundColor,
        opacity,
      }}
      onMouseDown={onClick}
    />
  );
}

export default ModalOverlay;
