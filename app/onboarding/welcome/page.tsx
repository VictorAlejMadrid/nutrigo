'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components/ui/button';

export default function WelcomeScreen() {
  const router = useRouter();

  function onStart() {
    router.push('/onboarding/step-1');
  }

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center bg-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-16 flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src={'/nutrigo/logo.png'}
          alt="NutriGO Logo"
          width={220}
          height={220}
          priority
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }}
        />

        <p className="mb-1 text-2xl font-bold text-[#0C3527]">Da dieta ao mercado em um clique</p>
      </motion.div>

      <motion.div
        className="mb-12 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="mx-auto max-w-sm text-base leading-relaxed text-gray-600">
          Crie dietas personalizadas e transforme-as em listas de compras práticas. Organize sua
          alimentação saudável sem complicações.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Button onClick={onStart} size="lg" className="bg-primary mx-auto h-12 w-sm text-base">
          Começar
        </Button>
      </motion.div>

      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-[#D57A4E] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#0C3527] opacity-5 blur-3xl" />
    </motion.div>
  );
}
