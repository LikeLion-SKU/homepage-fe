/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

import { curriculumData } from '@/components/main/track/curriculumModalData';
import useMediaQuery from '@/hooks/useMediaQuery';

import ModalToggle from './ModalToggle';

function ModalContent({ trackType, scale = 1 }) {
  const isMobile480 = useMediaQuery('(max-width: 480px)');
  const isMobile760 = useMediaQuery('(max-width: 760px)');
  const isTab1199 = useMediaQuery('(min-width: 761px) and (max-width: 1199px)');
  const content = curriculumData[trackType] || curriculumData.PO;

  // title에서 TRACK 부분만 추출
  const getTrackText = (title) => {
    if (title.includes('PO TRACK')) return 'PO TRACK';
    if (title.includes('FRONTEND TRACK')) return 'FRONTEND TRACK';
    if (title.includes('BACKEND TRACK')) return 'BACKEND TRACK';
    return '';
  };

  const getRestText = (title) => {
    if (title.includes('PO TRACK')) return title.replace('PO TRACK', '');
    if (title.includes('FRONTEND TRACK')) return title.replace('FRONTEND TRACK', '');
    if (title.includes('BACKEND TRACK')) return title.replace('BACKEND TRACK', '');
    return title;
  };

  const trackText = getTrackText(content.title);
  const restText = getRestText(content.title);

  return (
    <div
      className="flex flex-col h-full"
      style={{
        paddingLeft: isMobile480 ? `${(32 / 16) * scale}rem` : `${(63 / 16) * scale}rem`,
        paddingRight: `${(30 / 16) * scale}rem`,
        paddingTop: isMobile480 ? `${(15 / 16) * scale}rem` : `${(28 / 16) * scale}rem`,
        overflow: 'hidden',
      }}
    >
      {/* 제목과 서브타이틀 - 고정 */}
      <div
        className="flex flex-col flex-shrink-0"
        style={{
          gap: `${(8 / 16) * scale}rem`,
          marginBottom: `${(15 / 16) * scale}rem`,
        }}
      >
        <h2
          style={{
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: 800,
            fontSize: isMobile480
              ? `${(16 / 16) * scale}rem`
              : isMobile760
                ? `${(20 / 16) * scale}rem`
                : isTab1199
                  ? `${(28 / 16) * scale}rem`
                  : `${(28 / 16) * scale}rem`,
            lineHeight: 'normal',
            margin: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: `${(4 / 16) * scale}rem`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {trackText && (
            <motion.span
              className="font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #BCD800 0%, #65C42A 50%, #BCD800 100%)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['100% 0%', '-100% 0%'],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {trackText}
            </motion.span>
          )}
          <span style={{ color: '#00156A' }}>{restText}</span>
        </h2>
        <p
          style={{
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: isMobile480
              ? `${(11 / 16) * scale}rem`
              : isMobile760
                ? `${(12 / 16) * scale}rem`
                : isTab1199
                  ? `${(15 / 16) * scale}rem`
                  : `${(15 / 16) * scale}rem`,
            color: '#686868',
            lineHeight: 'normal',
            margin: 0,
          }}
        >
          {content.subtitle}
        </p>
      </div>

      {/* 활용 기술 스택 - 고정 */}
      <div
        className="flex items-center flex-shrink-0"
        style={{
          gap: `${(12 / 16) * scale}rem`,
          marginBottom: `${(12 / 16) * scale}rem`,
          flexWrap: 'nowrap',
        }}
      >
        <p
          style={{
            fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: isMobile480 ? `${(13 / 16) * scale}rem` : `${(14 / 16) * scale}rem`,
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
            marginLeft: isMobile480 ? `${(-5 / 16) * scale}rem` : `${(15 / 16) * scale}rem`,
            flexWrap: 'nowrap',
            flexShrink: 0,
          }}
        >
          {content.techStack.map((tech, index) => (
            <div
              key={index}
              style={{
                width: isMobile480
                  ? `${((tech.size * 0.7) / 16) * scale}rem`
                  : `${(tech.size / 16) * scale}rem`,
                height: isMobile480
                  ? `${((tech.size * 0.7) / 16) * scale}rem`
                  : `${(tech.size / 16) * scale}rem`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginLeft:
                  tech.name === 'framer'
                    ? `${(-9 / 16) * scale}rem`
                    : tech.name === 'aws'
                      ? `${(-2 / 16) * scale}rem`
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

      {/* 커리큘럼 토글 - 스크롤 가능한 영역 */}
      {content.curriculum && content.curriculum.length > 0 && (
        <div
          className="relative flex-1 min-h-0"
          style={{
            marginTop: `${(24 / 16) * scale}rem`,
            overflow: 'hidden',
          }}
        >
          <div
            className="h-full overflow-y-auto no-scrollbar"
            style={{
              paddingRight: isMobile480 ? `${(0 / 16) * scale}rem` : `${(20 / 16) * scale}rem`,
              paddingBottom: `${(20 / 16) * scale}rem`,
            }}
          >
            <ModalToggle items={content.curriculum} scale={scale} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalContent;
