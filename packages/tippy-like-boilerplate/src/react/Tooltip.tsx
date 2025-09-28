import React, { useEffect, useRef } from 'react';


export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactElement;  // un solo child (button, span, etc.)
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    return () => {
        
    }
  }, [content, placement]);

  // Clona el child para inyectar ref (soporta button, div, etc.)
  return React.cloneElement(children, { ref });
}