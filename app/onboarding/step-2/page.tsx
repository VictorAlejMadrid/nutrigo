'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import IconButton from '../../../components/IconButton';
import { useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
};

export default function ProfileStep2() {
  const router = useRouter();

  const { weight, setWeight } = useProfileStore();

  const [error, setError] = useState('');
  const [weightInput, setWeightInput] = useState(weight?.toString() || '');
  const [isLoading, setIsLoading] = useState(false);

  const validatePeso = (value: string | number): boolean => {
    const numPeso = parseFloat(value.toString());
    if (!value || isNaN(numPeso)) {
      setError('Informe seu peso');
      return false;
    }

    setError('');
    return true;
  };

  const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value.startsWith('0') && value.length > 1) {
      value = value.slice(1);
    }

    setWeightInput(value);
    setWeight(value);

    if (value) validatePeso(value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (parseInt(weight) < 20) {
      setError('Peso mínimo é 20kg');
      return;
    }

    if (parseInt(weight) > 500) {
      setError('Peso máximo é 500kg');
      return;
    }

    setError('');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push('/onboarding/step-3');
  };

  function handlePrev() {
    router.push('/onboarding/step-1');
  }

  return (
    <motion.div
      className="flex h-screen w-full flex-col items-center justify-center bg-white px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Indicador de progresso */}
      <motion.div
        className="absolute top-8 text-center text-sm text-gray-500"
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Passo 2 de 5
      </motion.div>

      {/* Título */}
      <motion.h2
        className="mt-8 mb-12 text-center text-3xl font-bold text-[#0C3527]"
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Qual seu peso?
      </motion.h2>

      {/* Formulário */}
      <motion.div
        className="w-full max-w-sm space-y-8"
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Input
          type="number"
          value={weightInput}
          onChange={handlePesoChange}
          placeholder="Seu peso (kg)"
          error={error ? error : undefined}
          min={20}
          max={500}
          fullWidth
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Continuar'}
        </Button>
      </motion.div>

      {/* Botão de voltar */}
      <IconButton
        onClick={handlePrev}
        icon="arrow-left"
        position="bottom-left"
        variant="default"
        size="md"
        ariaLabel="Voltar para tela anterior"
      />
    </motion.div>
  );
}
