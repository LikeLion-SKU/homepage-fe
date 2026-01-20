import useScale from '@/components/main/hooks/useScale';

function GridPattern({ className = '', style = {}, children }) {
  const scale = useScale();

  return (
    <div
      className={className}
      style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 23%, rgba(230, 230, 230, 1) 24%, rgba(230, 230, 230, 1) 26%, transparent 27%),
          linear-gradient(90deg, transparent 23%, rgba(230, 230, 230, 1) 24%, rgba(230, 230, 230, 1) 26%, transparent 27%)
        `,
        backgroundSize: `${(20 / 16) * scale}rem ${(20 / 16) * scale}rem`,
        backgroundPosition: `${(-5 / 16) * scale}rem ${(1 / 16) * scale}rem`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'local',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default GridPattern;
