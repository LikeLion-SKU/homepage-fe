import PageTitle from '@/components/common/PageTitle';
import TextTile from '@/components/result/TextTile';
import { getResultText } from '@/components/result/getResultText';

export default function ResultSection({ pass, interviewScheduleConfirmedAt }) {
  const text = getResultText(pass, interviewScheduleConfirmedAt);

  const getTitle = () => {
    if (pass.test == 'document') {
      if (pass.result) {
        return '서류 합격을 축하드립니다!';
      } else {
        return '서류 결과 안내';
      }
    } else {
      if (pass.result) {
        return '최종 합격을 축하드립니다!!';
      } else {
        return '면접 결과 안내';
      }
    }
  };
  return (
    <div className="flex flex-col px-6 justify-center items-center gap-9 pt-40">
      <PageTitle title={getTitle()} color="Navy" />
      <TextTile>{text}</TextTile>
    </div>
  );
}
