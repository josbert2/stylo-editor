import React from 'react';
import { popularFonts } from '../../utils';
import './FontSelector.css';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
  label?: string;
  fonts?: string[];
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  value,
  onChange,
  label = 'Font Family',
  fonts = popularFonts
}) => {
  return (
    <div className="stylo-font-selector">
      {label && <label className="stylo-font-selector-label">{label}</label>}
      <select
        className="stylo-font-selector-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};