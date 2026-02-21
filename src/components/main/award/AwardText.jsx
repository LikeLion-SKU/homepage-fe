import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function AwardText() {
  const scale = useScale();
  const isMobile480 = useMediaQuery('(max-width: 480px)');

  return (
    <div
      className="text-[#1a1a1a] font-medium leading-[180%] text-right"
      style={{
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        fontSize: `${(18 / 15) * scale * (isMobile480 ? 1.8 : 1)}rem`,
      }}
    >
      <div style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'flex-end' }}>
        단순한 아이디어에 그치지 않고, 기획부터 디자인, 개발까지 전 과정을 거쳐
      </div>
      <div style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'flex-end' }}>
        실제 서비스와 의미 있는 결과로 완성된 프로젝트들입니다.
      </div>
      <div style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'flex-end' }}>
        멋쟁이사자들이 팀으로 협업하며 현실의 문제를 정의하고 해결해 온 과정이 담긴
      </div>
      <div style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'flex-end' }}>
        역대 수상 프로젝트의 이야기를 만나보세요.
      </div>
    </div>
  );
}

export default AwardText;
