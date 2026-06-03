'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import WelcomeScreen from './WelcomeScreen';
import ProfileStep1 from './ProfileStep1';
import { ProfileStep2 } from './ProfileStep2';
import { ProfileStep3 } from './ProfileStep3';

export default function OnboardingFlow() {
  const { currentStep, nextStep } = useOnboarding();

  return (
    <div>
      {currentStep === 'welcome' && <WelcomeScreen onStart={nextStep} />}
      {currentStep === 'step1' && <ProfileStep1 />}
      {currentStep === 'step2' && <ProfileStep2 />}
      {currentStep === 'step3' && <ProfileStep3 />}
      {/* Próximas etapas serão adicionadas aqui */}
    </div>
  );
}
