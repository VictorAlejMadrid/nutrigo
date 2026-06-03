'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useOnboarding } from '@/context/OnboardingContext';
import Input from './Input';
import Button from './Button';
import IconButton from './IconButton';

export default function ProfileStep1() {
  const { profile, updateProfile, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const age = profile.idade || '';
  const name = profile.nome || '';

  const validateAge = (value: string): string | null => {
    const num = parseInt(value);
    if (!value) return 'Idade é obrigatória';
    if (isNaN(num) || num < 13 || num > 120) return 'Informe uma idade válida (13-120)';
    return null;
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateProfile({ idade: value ? parseInt(value) : undefined });

    const error = validateAge(value);
    if (error) {
      setErrors((prev) => ({ ...prev, idade: error }));
    } else {
      setErrors((prev) => ({ ...prev, idade: '' }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfile({ nome: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ageError = validateAge(age.toString());
    if (ageError) {
      setErrors({ idade: ageError });
      setIsSubmitting(false);
      return;
    }

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    nextStep();
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Indicador de progresso (passo 1 de 5) */}
      <div className="absolute top-8 text-sm text-gray-600">
        Passo <span className="font-bold text-[#0C3527]">1</span> de <span className="font-bold">5</span>
      </div>

      {/* Título */}
      <motion.h2
        className="text-3xl font-bold text-[#0C3527] mb-12 text-center"
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
        {/* Campo de Nome */}
        <div className="mb-6">
          <Input type="text" placeholder="Seu nome (opcional)" value={name} onChange={handleNameChange} fullWidth />
        </div>

        {/* Campo de Idade */}
        <div className="mb-8">
          <Input
            type="number"
            placeholder="Sua idade"
            value={age}
            onChange={handleAgeChange}
            min="13"
            max="120"
            error={errors.idade}
            autoFocus
            fullWidth
          />
        </div>

        {/* Botão */}
        <Button type="submit" disabled={isSubmitting || !!errors.idade} variant="primary" size="lg" fullWidth className="mt-12">
          {isSubmitting ? 'Processando...' : 'Continuar'}
        </Button>
      </motion.form>

      {/* Botão Voltar - IconButton no rodapé */}
      <IconButton onClick={prevStep} icon="arrow-left" position="bottom-left" variant="default" size="md" ariaLabel="Voltar para tela anterior" />

      {/* Decoração de fundo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D57A4E] opacity-5 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
