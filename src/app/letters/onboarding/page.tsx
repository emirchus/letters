import OnboardingForm from './components/form';

export default function OnboardingPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-center text-3xl font-bold">Welcome! Let&apos;s get to know you</h1>
      <OnboardingForm />
    </div>
  );
}
