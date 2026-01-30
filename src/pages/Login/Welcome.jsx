import WelcomeSection from '@/components/login/WelcomeSection';

export default function WelcomePage() {
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
      <WelcomeSection />
    </div>
  );
}
