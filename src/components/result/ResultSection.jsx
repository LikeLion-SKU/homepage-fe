import PageTitle from '@/components/common/PageTitle';
import TextTile from '@/components/result/TextTile';

export default function ResultSection({ pass }) {
  const notPassText = `안녕하세요. IT동아리 멋쟁이사자처럼 운영진입니다.
        먼저 저희 동아리에 지원해주셔서 감사합니다.
        14기 면접 결과 불합격이라는 소식을 전해드립니다.
        많은 지원자로 인해 면접자님의 뛰어난 역량에도 불구하고 한정된 인원 
        때문에 더 많은 부원들을 모시지 못하게 되어 송구스럽게 생각합니다.
        다음 모집에는 더 많은 분들과 함께 하기 위해 노력하겠습니다.
        다시 한번 소중한 시간을 내어 면접에 응해 주셔서
        진심으로 감사드립니다.
        지원자님의 정보는 한 달 이내로 일괄 삭제하겠습니다.`;
  const passText = `합격 축하요`;
  const date = new Date().getTime();
  const applyResultDate = [
    new Date(2026, 0, 22, 0, 0).getTime(),
    new Date(2026, 1, 25, 0, 0).getTime(),
  ];
  const interviewResultDate = [
    new Date(2026, 1, 22, 0, 0).getTime(),
    new Date(2026, 2, 25, 0, 0).getTime(),
  ];
  return (
    <div className="flex flex-col justify-center items-center gap-9 pt-40">
      <PageTitle title="면접 결과 안내" width="290px" color="Navy" />
      <TextTile>
        {date > applyResultDate[0] && date < applyResultDate[1] && !pass && notPassText}
        {date > applyResultDate[0] && date < applyResultDate[1] && pass && passText}
        {date > interviewResultDate[0] && date < interviewResultDate[1] && '면접 기간'}
      </TextTile>
    </div>
  );
}
