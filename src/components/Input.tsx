'use client';

import { ReactNode } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'date';
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  autoFocus?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  className?: string;
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  min,
  max,
  autoFocus = false,
  error,
  label,
  helperText,
  fullWidth = false,
  className = '',
}: InputProps) {
  const baseStyles = 'px-4 py-3 bg-white text-center text-lg text-gray-900 focus:outline-none transition border-b-2 placeholder:text-gray-500';

  const borderStyles = error ? 'border-red-500' : 'border-[#D57A4E]';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthStyles = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${borderStyles} ${disabledStyles} ${widthStyles} ${className}`;

  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="text-sm font-semibold text-[#0C3527] mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        min={min}
        max={max}
        autoFocus={autoFocus}
        required={required}
        className={combinedClassName}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {helperText && !error && <p className="text-gray-500 text-sm mt-2">{helperText}</p>}
    </div>
  );
}
