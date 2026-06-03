'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IconButtonProps {
  onClick?: () => void;
  icon: ReactNode | 'arrow-left' | 'arrow-right' | 'check' | 'close';
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  position?: 'static' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
  ariaLabel?: string;
}

const positionClasses = {
  static: 'relative',
  'bottom-left': 'absolute bottom-8 left-8',
  'bottom-right': 'absolute bottom-8 right-8',
  'top-left': 'absolute top-8 left-8',
  'top-right': 'absolute top-8 right-8',
};

const sizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
};

const variantClasses = {
  default: 'text-[#0C3527] hover:bg-gray-100',
  primary: 'text-white bg-[#D57A4E] hover:bg-[#c46a3f]',
  secondary: 'text-[#0C3527] border-2 border-[#0C3527] hover:bg-[#0C3527] hover:text-white',
};

const iconMap: { [key: string]: ReactNode } = {
  'arrow-left': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 19l-7-7 7-7" />
    </svg>
  ),
  'arrow-right': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5l7 7-7 7" />
    </svg>
  ),
  check: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function IconButton({
  onClick,
  icon,
  variant = 'default',
  size = 'md',
  position = 'static',
  className = '',
  ariaLabel = 'Icon button',
}: IconButtonProps) {
  const renderedIcon = typeof icon === 'string' ? iconMap[icon] : icon;

  const combinedClassName = `${positionClasses[position]} ${sizeClasses[size]} ${variantClasses[variant]} rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D57A4E] ${className}`;

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      aria-label={ariaLabel}
    >
      {renderedIcon}
    </motion.button>
  );
}
