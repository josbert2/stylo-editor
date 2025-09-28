import React from 'react';

interface LogoAppProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function LogoApp({ 
  src = "/logo.svg", 
  alt = "Logo de la aplicación",
  width = 50,
  height = 50,
  className = "logo-app"
}: LogoAppProps) {
  return (
    <div className={className}>
      <img 
        src={src} 
        alt={alt} 
        width={width}
        height={height}
        style={{ display: 'block' }}
      />
    </div>
  );
}