import { curriculumData } from '@/components/main/track/curriculumModalData';

function ModalContent({ trackType, scale = 1 }) {
  const content = curriculumData[trackType] || curriculumData.PO;

  return (
    <div
      className="flex flex-col"
      style={{
        paddingLeft: `${(63 / 16) * scale}rem`,
        paddingRight: `${(30 / 16) * scale}rem`,
        paddingTop: `${(28 / 16) * scale}rem`,
      }}
    >
      {/* 제목과 서브타이틀 */}
      <div
        className="flex items-baseline"
        style={{
          gap: `${(10 / 16) * scale}rem`,
          marginBottom: `${(15 / 16) * scale}rem`,
        }}
      >
        <h2
          style={{
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: `${(28 / 16) * scale}rem`,
            color: '#00156A',
            lineHeight: 'normal',
            margin: 0,
          }}
        >
          {content.title}
        </h2>
        <p
          style={{
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: `${(15 / 16) * scale}rem`,
            color: '#686868',
            lineHeight: `${(10 / 16) * scale}rem`,
            margin: 0,
          }}
        >
          {content.subtitle}
        </p>
      </div>

      {/* 활용 기술 스택 */}
      <div
        className="flex items-center"
        style={{
          gap: `${(12 / 16) * scale}rem`,
          marginBottom: `${(12 / 16) * scale}rem`,
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: `${(14 / 16) * scale}rem`,
            color: '#3C3C3C',
            lineHeight: `${(28 / 16) * scale}rem`,
            margin: 0,
          }}
        >
          활용 기술 스택
        </p>
        <div
          className="flex items-center"
          style={{
            gap: `${(12 / 16) * scale}rem`,
            marginLeft: `${(15 / 16) * scale}rem`,
          }}
        >
          {content.techStack.map((tech, index) => (
            <div
              key={index}
              style={{
                width: `${(tech.size / 16) * scale}rem`,
                height: `${(tech.size / 16) * scale}rem`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginLeft:
                  tech.name === 'framer'
                    ? `${(-9 / 16) * scale}rem`
                    : tech.name === 'aws'
                      ? `${(3 / 16) * scale}rem`
                      : tech.name === 'protopie'
                        ? `${(-2 / 16) * scale}rem`
                        : '0',
                marginTop: tech.name === 'java' ? `${(-8 / 16) * scale}rem` : '0',
              }}
            >
              {tech.icon ? (
                <img
                  src={tech.icon}
                  alt={tech.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#E0E0E0',
                    borderRadius: '4px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalContent;
