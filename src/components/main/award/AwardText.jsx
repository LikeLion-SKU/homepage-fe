import useScale from '@/components/main/hooks/useScale';

function AwardText() {
  const scale = useScale();

  return (
    <div
      className="text-[#1a1a1a] font-medium leading-[160%]"
      style={{
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
        fontSize: `${(18 / 16) * scale}rem`,
      }}
    >
      <div>
        안녕하세요 <span className="font-bold">서경대학교 멋쟁이사자처럼</span>입니다.
      </div>
      <div>멋쟁이사자처럼은 다양한 전공의 학생들로 이루어진 IT 동아리입니다.</div>
      <div>서경대 멋쟁이사자처럼은 함께 배우고 성장하는 커뮤니티를 지향합니다.</div>
    </div>
  );
}

export default AwardText;
