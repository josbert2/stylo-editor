import React, { useState, useRef, useEffect } from 'react';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';

export interface TooltipProps {
  content: string;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  delay?: number;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  trigger = 'hover',
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updatePosition = async () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const { x, y, placement: finalPlacement, middlewareData } = await computePosition(
      triggerRef.current,
      tooltipRef.current,
      {
        placement,
        middleware: [
          offset(8),
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
    tooltipRef.current.setAttribute('data-placement', finalPlacement);
  };

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible]);

  useEffect(() => {
    const triggerElement = triggerRef.current;
    if (!triggerElement) return;

    if (trigger === 'hover') {
      triggerElement.addEventListener('mouseenter', showTooltip);
      triggerElement.addEventListener('mouseleave', hideTooltip);
    } else if (trigger === 'click') {
      triggerElement.addEventListener('click', showTooltip);
      document.addEventListener('click', (e) => {
        if (!triggerElement.contains(e.target as Node)) {
          hideTooltip();
        }
      });
    }

    return () => {
      if (trigger === 'hover') {
        triggerElement.removeEventListener('mouseenter', showTooltip);
        triggerElement.removeEventListener('mouseleave', hideTooltip);
      } else if (trigger === 'click') {
        triggerElement.removeEventListener('click', showTooltip);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, delay]);

  const clonedChild = React.cloneElement(children, {
    ref: triggerRef,
    ...children.props
  });

  return (
    <>
      {clonedChild}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`tippy-tooltip ${className}`}
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            zIndex: 9999
          }}
          role="tooltip"
        >
          <div className="tippy-content">
            {content}
          </div>
          <div ref={arrowRef} className="tippy-arrow" />
        </div>
      )}
    </>
  );
};

export default Tooltip;