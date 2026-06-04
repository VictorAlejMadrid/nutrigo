'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import { useProfileStore } from '../../../hooks/use-profile';
import { useRouter } from 'next/navigation';

export default function ProfileStep1() {
  const router = useRouter();

  const { age, setAge, name, setName } = useProfileStore();
  const [ageInput, setAgeInput] = useState(age?.toString() || '');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateAge(value: string): string | null {
    const num = parseInt(value);
    if (!value) return 'Idade é obrigatória';
    if (isNaN(num) || num < 13 || num > 120) return 'Informe uma idade válida (13-120)';
    return null;
  }

  function handleAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    if (value.startsWith('0') && value.length > 1) {
      value = value.slice(1);
    }

    setAgeInput(value);
    setAge(value ? parseInt(value) : 0);

    const error = validateAge(value);
    if (error) {
      setErrors((prev) => ({ ...prev, idade: error }));
    } else {
      setErrors((prev) => ({ ...prev, idade: '' }));
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);

    if (!name || name.trim() === '') {
      setErrors({ name: 'Informe seu nome' });
      setIsSubmitting(false);
    } else {
      setErrors({ name: '' });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (errors.name || errors.idade) {
      setIsSubmitting(false);
      return;
    }

    setName(name.trim());

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    router.push('/onboarding/step-2');
  };

  function prevPage() {
    router.push('/onboarding/welcome');
  }

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center bg-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-8 text-sm text-gray-600">
        Passo <span className="font-bold text-[#0C3527]">1</span> de{' '}
        <span className="font-bold">5</span>
      </div>

      <motion.h2
        className="mb-12 text-center text-3xl font-bold text-[#0C3527]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Qual seu nome e idade?
      </motion.h2>

      {/* Formulário */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
            autoFocus
            fullWidth
          />
        </div>

        <div className="mb-8">
          <Input
            type="number"
            placeholder="Sua idade"
            value={ageInput}
            onChange={handleAgeChange}
            min="13"
            max="120"
            error={errors.idade}
            fullWidth
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !!errors.idade}
          variant="primary"
          size="lg"
          fullWidth
          className="mt-12"
        >
          {isSubmitting ? 'Processando...' : 'Continuar'}
        </Button>
      </motion.form>

      <IconButton
        onClick={prevPage}
        icon="arrow-left"
        position="bottom-left"
        variant="default"
        size="md"
        ariaLabel="Voltar para tela anterior"
      />

      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-[#D57A4E] opacity-5 blur-3xl" />
    </motion.div>
  );
}
