
import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'purple' | 'cyan' | 'green';
  glow?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  variant = 'purple', 
  glow = true, 
  className = '', 
  ...props 
}) => {
  const themes = {
    purple: 'border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500/10 shadow-[0_0_10px_rgba(217,70,239,0.3)]',
    cyan: 'border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    green: 'border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
  };

  return (
    <button 
      className={`
        px-6 py-2 border-2 rounded-lg font-bold transition-all duration-300 orbitron uppercase tracking-widest
        ${themes[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;
