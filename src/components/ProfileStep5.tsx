'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '@/context/OnboardingContext';
import Button from './Button';
import IconButton from './IconButton';

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: custom * 0.08, duration: 0.4 },
  }),
};

export function ProfileStep5() {
  const { profile, nextStep, prevStep, updateProfile } = useOnboarding();
  const [duracaoDias, setDuracaoDias] = useState(profile.duracaoDias || 7);
  const [isLoading, setIsLoading] = useState(false);

  const DURACAO_OPTIONS = [7, 14, 30];

  const handleSelectDuracao = (dias: number) => {
    setDuracaoDias(dias);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    updateProfile({ duracaoDias });

    // Simula delay de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    nextStep();
  };

  // Formatação dos dados para exibição
  const restricoesDisplay = profile.restricoes && profile.restricoes.length > 0 ? profile.restricoes.join(', ') : 'Nenhuma';

  const formatarCampo = (label: string, valor: any) => {
    if (!valor && valor !== 0) return null;
    return (
      <motion.div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0" variants={cardVariants}>
        <span className="text-gray-600">{label}:</span>
        <span className="font-semibold text-[#0C3527]">{valor}</span>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="w-full h-screen bg-white flex flex-col items-center justify-center px-6 py-8 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Indicador de progresso */}
      <motion.div className="w-full text-center text-gray-500 text-sm mb-6" custom={0} variants={itemVariants} initial="hidden" animate="visible">
        Passo 5 de 5
      </motion.div>

      {/* Título */}
      <motion.h2 className="text-3xl font-bold text-center mb-8 text-[#0C3527]" custom={1} variants={itemVariants} initial="hidden" animate="visible">
        Duração e Revisão
      </motion.h2>

      {/* Seção de duração */}
      <motion.div className="w-full max-w-sm mb-8" custom={2} variants={itemVariants} initial="hidden" animate="visible">
        <h3 className="text-lg font-semibold text-[#0C3527] mb-4">Qual será a duração do plano?</h3>
        <div className="grid grid-cols-3 gap-3">
          {DURACAO_OPTIONS.map((dias, idx) => (
            <motion.button
              key={dias}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleSelectDuracao(dias)}
              className={` py-3 px-3 rounded-lg hover:cursor-pointer font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C3527] ${
                duracaoDias === dias
                  ? 'bg-[#0C3527] text-white shadow-lg'
                  : 'bg-gray-100 text-[#D57A4E] border-2 border-transparent hover:border-[#D57A4E]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {dias} dias
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Cartão de revisão */}
      <motion.div
        className="w-full max-w-sm bg-gray-50 rounded-lg p-6 mb-8 border-2 border-gray-200"
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-semibold text-[#0C3527] mb-4">Seus dados</h3>
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
          {formatarCampo('Nome', profile.nome || 'Não informado')}
          {formatarCampo('Idade', profile.idade ? `${profile.idade} anos` : 'Não informado')}
          {formatarCampo('Peso', profile.pesoKg ? `${profile.pesoKg} kg` : 'Não informado')}
          {formatarCampo('Objetivo', profile.objetivo || 'Não informado')}
          {formatarCampo('Restrições', restricoesDisplay)}
          {profile.restricoesOutras && formatarCampo('Outras restrições', profile.restricoesOutras)}
          {formatarCampo('Duração', `${duracaoDias} dias`)}
        </motion.div>
      </motion.div>

      {/* Botão de continuar */}
      <motion.div className="w-full max-w-sm space-y-3" custom={4} variants={itemVariants} initial="hidden" animate="visible">
        <Button type="submit" variant="primary" size="lg" fullWidth onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Processando...' : 'Confirmar e Gerar Plano'}
        </Button>
      </motion.div>

      {/* Botão de voltar */}
      <IconButton onClick={prevStep} icon="arrow-left" position="bottom-left" variant="default" size="md" ariaLabel="Voltar para tela anterior" />
    </motion.div>
  );
}
