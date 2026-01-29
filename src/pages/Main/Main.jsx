import Award from '@/components/main/award/Award';
import Explain from '@/components/main/explain/Explain';
import Intro from '@/components/main/intro/Intro';
import Schedule from '@/components/main/schedule/Schedule';
import Track from '@/components/main/track/Track';

export default function Main() {
  return (
    <>
      <Intro />
      <Explain />
      <Track />
      <Schedule />
      <Award />
    </>
  );
}
