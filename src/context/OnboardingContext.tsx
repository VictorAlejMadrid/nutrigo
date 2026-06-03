'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  nome?: string;
  idade?: number;
  pesoKg?: number;
  objetivo?: string;
  restricoes?: string[];
  restricoesOutras?: string;
  duracaoDias?: number;
}

interface OnboardingContextType {
  currentStep: 'welcome' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'success';
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<OnboardingContextType['currentStep']>('welcome');
  const [profile, setProfile] = useState<UserProfile>({});

  const stepOrder: Array<OnboardingContextType['currentStep']> = ['welcome', 'step1', 'step2', 'step3', 'step4', 'step5', 'success'];

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const reset = () => {
    setCurrentStep('welcome');
    setProfile({});
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        profile,
        setProfile,
        updateProfile,
        nextStep,
        prevStep,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding deve ser usado dentro de um OnboardingProvider');
  }
  return context;
}
