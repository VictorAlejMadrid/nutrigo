'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import WelcomeScreen from './WelcomeScreen';
import ProfileStep1 from './ProfileStep1';
import { ProfileStep2 } from './ProfileStep2';
import { ProfileStep3 } from './ProfileStep3';
import { ProfileStep4 } from './ProfileStep4';
import { ProfileStep5 } from './ProfileStep5';
import SuccessScreen from './SuccessScreen';

export default function OnboardingFlow() {
  const { currentStep, nextStep } = useOnboarding();

  return (
    <div>
      {currentStep === 'welcome' && <WelcomeScreen onStart={nextStep} />}
      {currentStep === 'step1' && <ProfileStep1 />}
      {currentStep === 'step2' && <ProfileStep2 />}
      {currentStep === 'step3' && <ProfileStep3 />}
      {currentStep === 'step4' && <ProfileStep4 />}
      {currentStep === 'step5' && <ProfileStep5 />}
      {currentStep === 'success' && <SuccessScreen />}
    </div>
  );
}
