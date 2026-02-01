import { withBottomUpAnimation } from '@/components/animation/withBottomUpAnimation';
import Award from '@/components/main/award/Award';
import Explain from '@/components/main/explain/Explain';
import Intro from '@/components/main/intro/Intro';
import Schedule from '@/components/main/schedule/Schedule';
import Track from '@/components/main/track/Track';

const AnimatedTrack = withBottomUpAnimation(Track);
const AnimatedSchedule = withBottomUpAnimation(Schedule);
const AnimatedAward = withBottomUpAnimation(Award);

export default function Main() {
  return (
    <div
      className="bg-white"
      style={{
        marginLeft: '-100vw',
        marginRight: '-100vw',
        paddingLeft: '100vw',
        paddingRight: '100vw',
      }}
    >
      <Intro />
      <Explain />
      <AnimatedTrack />
      <AnimatedSchedule />
      <AnimatedAward />
    </div>
  );
}
