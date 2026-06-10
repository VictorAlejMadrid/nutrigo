'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useProfileStore } from '../hooks/use-profile';

export default function Home() {
  const router = useRouter();
  const { name, age } = useProfileStore();

  useEffect(() => {
    if (!name || !age) {
      router.push('/onboarding/welcome');
    }
  });

  return <div></div>;
}
