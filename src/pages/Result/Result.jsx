import GridSection from '@/components/layout/background/GridSection';
import ApplyNotice from '@/components/result/ApplyNotice';
import InterviewNotice from '@/components/result/InterviewNotice';

export default function Result() {
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
    <div>
      <GridSection rows={15}>
        {date > applyResultDate[0] && date < applyResultDate[1] && <ApplyNotice />}
        {date > interviewResultDate[0] && date < interviewResultDate[1] && <InterviewNotice />}
      </GridSection>
    </div>
  );
}
