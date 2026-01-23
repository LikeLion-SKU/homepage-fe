import GridSection from '@/components/layout/background/GridSection';
import ResultSection from '@/components/result/ResultSection';

export default function Result() {
  return (
    <div>
      <GridSection rows={15}>
        <ResultSection />
      </GridSection>
    </div>
  );
}
