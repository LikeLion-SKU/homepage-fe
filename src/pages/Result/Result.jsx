import GridSection from '@/components/layout/background/GridSection';
import ApplyNotice from '@/components/result/ApplyNotice';
import InterviewNotice from '@/components/result/InterviewNotice';

export default function Result() {
  return (
    <div>
      <GridSection rows={15}>
        {/* <ApplyNotice /> */}
        <InterviewNotice />
      </GridSection>
    </div>
  );
}
