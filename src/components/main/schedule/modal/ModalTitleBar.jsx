import rightIcon from '@/assets/icons/main/schedule/modal-arrow.svg';

function ModalTitleBar({
  title = '3월',
  backgroundColor = '#E8E8E8',
  // eslint-disable-next-line no-unused-vars
  iconBoxColor, // 받지만 사용하지 않음 (호환성을 위해 유지)
  // eslint-disable-next-line no-unused-vars
  titleBoxColor, // 받지만 사용하지 않음 (호환성을 위해 유지)
  boxSize = 1,
  onClose,
  scale = 1,
}) {
  return (
    <>
      {/* 좌측 상단 화살표 아이콘 */}
      <div
        className="flex items-center absolute"
        style={{
          gap: 0,
          display: 'inline-flex',
          top: `${(26 / 16) * scale}rem`,
          left: `${(20 / 16) * scale}rem`,
          zIndex: 100,
          pointerEvents: 'auto',
        }}
      >
        <div
          onClick={onClose}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            pointerEvents: 'auto',
            padding: `${(12 / 16) * scale * boxSize}rem`,
            minWidth: `${(56 / 16) * scale * boxSize}rem`,
            minHeight: `${(40 / 16) * scale * boxSize}rem`,
          }}
        >
          <img
            src={rightIcon}
            alt="arrow"
            style={{
              width: `${(32 / 16) * scale * boxSize}rem`,
              height: `${(16 / 16) * scale * boxSize}rem`,
            }}
          />
        </div>
      </div>
      {/* 우측 상단 사각형들 */}
      <div
        className="flex items-center absolute"
        style={{
          gap: 0,
          display: 'inline-flex',
          top: `${(38 / 16) * scale}rem`,
          right: `${(35 / 16) * scale}rem`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#C6E400',
            width: `${(48 / 16) * scale * boxSize}rem`,
            height: `${(21 / 16) * scale * boxSize}rem`,
            borderRadius: `${(32 / 16) * scale * boxSize}rem 0 0 ${(32 / 16) * scale * boxSize}rem`,
          }}
        />
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1928B0',
            width: `${(48 / 16) * scale * boxSize}rem`,
            height: `${(21 / 16) * scale * boxSize}rem`,
            borderRadius: `0 ${(32 / 16) * scale * boxSize}rem ${(32 / 16) * scale * boxSize}rem 0`,
          }}
        />
      </div>
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
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            <img
              src={rightIcon}
              alt="arrow"
              style={{
                width: `${(32 / 16) * scale * boxSize}rem`,
                height: `${(16 / 16) * scale * boxSize}rem`,
              }}
            />
          </div>
          <span
            className="font-bold uppercase relative"
            style={{
              fontSize: `${(18 / 16) * scale * boxSize}rem`,
              color: '#080808',
              fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: `${(80 / 16) * scale * boxSize}rem`,
              height: `${(38 / 16) * scale * boxSize}rem`,
              paddingLeft: `${(12 / 16) * scale * boxSize}rem`,
              paddingRight: `${(12 / 16) * scale * boxSize}rem`,
              overflow: 'visible',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: `${(-33 / 16) * scale * boxSize}rem`,
                top: 0,
                width: `${(95 / 16) * scale * boxSize}rem`,
                height: `${(42 / 16) * scale * boxSize}rem`,
                backgroundColor: '#E9E9E9',
                borderRadius: `${(10 / 16) * scale * boxSize}rem`,
                zIndex: 0,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: `${(-33 / 16) * scale * boxSize}rem`,
                top: 0,
                width: `${(38 / 16) * scale * boxSize}rem`,
                height: `${(42 / 16) * scale * boxSize}rem`,
                backgroundColor: '#1928B0',
                borderRadius: `${(10 / 16) * scale * boxSize}rem`,
                zIndex: 0,
              }}
            />
            <span
              style={{
                position: 'relative',
                zIndex: 1,
                transform: `translate(${(-8 / 16) * scale * boxSize}rem, ${(2 / 16) * scale * boxSize}rem)`,
              }}
            >
              {title}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ModalTitleBar;
