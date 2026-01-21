import rightIcon from '@/assets/icons/right_icon.svg';

function ModalTitleBar({
  title = '3월',
  backgroundColor = '#E8E8E8',
  iconBoxColor = '#00156A',
  titleBoxColor = '#00156A',
  boxSize = 1,
  onClose,
  scale = 1,
}) {
  return (
    <div
      className="flex items-center w-full relative"
      style={{
        backgroundColor,
        paddingTop: `${(16 / 16) * scale}rem`,
        paddingBottom: `${(8 / 16) * scale}rem`,
        paddingLeft: `${(16 / 16) * scale}rem`,
        paddingRight: `${(16 / 16) * scale}rem`,
        gap: `${(12 / 16) * scale}rem`,
        minHeight: `${(48 / 16) * scale}rem`,
      }}
    >
      <div
        className="flex items-center"
        style={{
          gap: 0,
          display: 'inline-flex',
          marginTop: `${(10 / 16) * scale}rem`,
          marginLeft: `${(14 / 16) * scale}rem`,
        }}
      >
        <div
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: iconBoxColor,
            padding: `${(8 / 16) * scale * boxSize}rem`,
            width: `${(38 / 16) * scale * boxSize}rem`,
            height: `${(38 / 16) * scale * boxSize}rem`,
            cursor: 'pointer',
          }}
        >
          <img
            src={rightIcon}
            alt="arrow"
            style={{
              width: `${(32 / 16) * scale * boxSize}rem`,
              height: `${(16 / 16) * scale * boxSize}rem`,
              filter: 'brightness(0) saturate(100%)',
              opacity: 0.08,
            }}
          />
        </div>
        <span
          className="font-bold uppercase"
          style={{
            fontSize: `${(18 / 16) * scale * boxSize}rem`,
            color: '#080808',
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: titleBoxColor,
            width: `${(56 / 16) * scale * boxSize}rem`,
            height: `${(38 / 16) * scale * boxSize}rem`,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

export default ModalTitleBar;
