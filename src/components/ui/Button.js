'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Button({
  children,
  href,
  color = 'primary',
  size = 'default',
  fullWidth = false,
  onClick,
  className = ''
}) {
  const colorStyles = {
    primary: 'bg-[#1a7be6] hover:bg-[#1666c2] text-white border-transparent',
    secondary: 'bg-[#f35e0e] hover:bg-[#d85309] text-white border-transparent',
    accent: 'bg-[#ce1010] hover:bg-[#b00d0d] text-white border-transparent',
    white: 'bg-white hover:bg-gray-100 text-[#1a7be6] border-transparent',
    outline: 'bg-transparent border-white text-white hover:bg-white hover:text-[#1a7be6]',
    outlineDark: 'bg-transparent border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white',
  };

  const sizeStyles = {
    small: 'text-xs px-3 py-1.5',
    default: 'text-sm px-4 py-2',
    large: 'text-base px-6 py-3',
  };

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center border-2 font-medium rounded-md shadow-sm transition-all duration-300
        ${colorStyles[color]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={fullWidth ? 'block' : 'inline-block'}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={fullWidth ? 'block w-full' : 'inline-block'}
    >
      {buttonContent}
    </button>
  );
}