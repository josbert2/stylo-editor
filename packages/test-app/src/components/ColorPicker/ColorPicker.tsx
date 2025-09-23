import React, { useEffect, useRef } from 'react';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/classic.min.css';
import './ColorPicker.css';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color, 
  onChange, 
  label 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pickrInstance = useRef<Pickr | null>(null);

  useEffect(() => {
    if (containerRef.current && !pickrInstance.current) {
      pickrInstance.current = Pickr.create({
        el: containerRef.current,
        theme: 'classic',
        default: color,
        swatches: [
          '#f44336', '#E91E63', '#9C27B0', '#673AB7',
          '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
          '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
          '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
        ],
        components: {
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
            hex: true,
            rgba: true,
            input: true,
            save: true
          }
        }
      })
      .on('save', (color: any) => {
        const hexColor = color.toHEXA().toString();
        onChange(hexColor);
        pickrInstance.current?.hide();
      });
    }

    return () => {
      if (pickrInstance.current) {
        pickrInstance.current.destroyAndRemove();
        pickrInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (pickrInstance.current) {
      pickrInstance.current.setColor(color);
    }
  }, [color]);

  return (
    <div className="stylo-color-picker">
      {label && <label className="stylo-color-picker-label">{label}</label>}
      <div className="stylo-color-picker-container" ref={containerRef}></div>
    </div>
  );
};

export { ColorPicker };
export default ColorPicker;