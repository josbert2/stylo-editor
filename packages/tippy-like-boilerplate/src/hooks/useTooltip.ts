import { useState, useRef, useCallback, useEffect } from 'react';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

export interface UseTooltipOptions {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'manual';
  delay?: number;
  offset?: number;
}

export interface UseTooltipReturn {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  tooltipRef: React.RefObject<HTMLDivElement>;
  arrowRef: React.RefObject<HTMLDivElement>;
  position: { x: number; y: number };
}

export function useTooltip(options: UseTooltipOptions = {}): UseTooltipReturn {
  const {
    placement = 'top',
    trigger = 'hover',
    delay = 0,
    offset: offsetValue = 8
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updatePosition = useCallback(async () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const { x, y, placement: finalPlacement, middlewareData } = await computePosition(
      triggerRef.current,
      tooltipRef.current,
      {
        placement,
        middleware: [
          offset(offsetValue),
          flip(),
          shift({ padding: 8 }),
          arrow({ element: arrowRef.current })
        ]
      }
    );

    setPosition({ x, y });

    // Update arrow position
    if (arrowRef.current && middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      
      Object.assign(arrowRef.current.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${arrowY}px` : '',
      });
    }

    // Update tooltip placement class
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute('data-placement', finalPlacement);
    }
  }, [placement, offsetValue]);

  const show = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, show, hide]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, updatePosition]);

  useEffect(() => {
    const triggerElement = triggerRef.current;
    if (!triggerElement || trigger === 'manual') return;

    if (trigger === 'hover') {
      triggerElement.addEventListener('mouseenter', show);
      triggerElement.addEventListener('mouseleave', hide);
    } else if (trigger === 'click') {
      triggerElement.addEventListener('click', toggle);
      
      const handleClickOutside = (e: Event) => {
        if (!triggerElement.contains(e.target as Node)) {
          hide();
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      
      return () => {
        triggerElement.removeEventListener('click', toggle);
        document.removeEventListener('click', handleClickOutside);
      };
    }

    return () => {
      if (trigger === 'hover') {
        triggerElement.removeEventListener('mouseenter', show);
        triggerElement.removeEventListener('mouseleave', hide);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, show, hide, toggle]);

  return {
    isVisible,
    show,
    hide,
    toggle,
    triggerRef,
    tooltipRef,
    arrowRef,
    position
  };
}