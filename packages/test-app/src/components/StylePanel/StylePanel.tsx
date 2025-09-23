import React, { useState } from 'react';
import { ColorPicker } from '../ColorPicker';
import { FontSelector } from '../FontSelector';
import { StyleConfig, StyleUpdateFunction } from '../../types';
import './StylePanel.css';

interface StylePanelProps {
  initialConfig: StyleConfig;
  onUpdate: StyleUpdateFunction;
}

export const StylePanel: React.FC<StylePanelProps> = ({ initialConfig, onUpdate }) => {
  const [config, setConfig] = useState<StyleConfig>(initialConfig);

  const handleUpdate = (updates: Partial<StyleConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onUpdate(newConfig);
  };

  const handleColorChange = (key: keyof StyleConfig['colors'], value: string) => {
    handleUpdate({
      colors: {
        ...config.colors,
        [key]: value
      }
    });
  };

  const handleTypographyChange = (key: keyof StyleConfig['typography'], value: any) => {
    handleUpdate({
      typography: {
        ...config.typography,
        [key]: value
      }
    });
  };

  return (
    <div className="stylo-panel">
      Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      <div className="stylo-panel-section">
        <h3 className="stylo-panel-title">Colors</h3>
        <ColorPicker
          label="Primary"
          color={config.colors.primary}
          onChange={(color) => handleColorChange('primary', color)}
        />
        <ColorPicker
          label="Secondary"
          color={config.colors.secondary}
          onChange={(color) => handleColorChange('secondary', color)}
        />
        <ColorPicker
          label="Background"
          color={config.colors.background}
          onChange={(color) => handleColorChange('background', color)}
        />
        <ColorPicker
          label="Text"
          color={config.colors.text}
          onChange={(color) => handleColorChange('text', color)}
        />
      </div>

      <div className="stylo-panel-section">
        <h3 className="stylo-panel-title">Typography</h3>
        <FontSelector
          value={config.typography.fontFamily}
          onChange={(font) => handleTypographyChange('fontFamily', font)}
        />
        
        <div className="stylo-input-group">
          <label className="stylo-input-label">Font Size</label>
          <input
            type="text"
            className="stylo-input"
            value={config.typography.fontSize}
            onChange={(e) => handleTypographyChange('fontSize', e.target.value)}
          />
        </div>
        
        <div className="stylo-input-group">
          <label className="stylo-input-label">Line Height</label>
          <input
            type="number"
            step="0.1"
            min="0"
            className="stylo-input"
            value={config.typography.lineHeight}
            onChange={(e) => handleTypographyChange('lineHeight', parseFloat(e.target.value))}
          />
        </div>
        
        <div className="stylo-input-group">
          <label className="stylo-input-label">Font Weight</label>
          <select
            className="stylo-input"
            value={config.typography.fontWeight}
            onChange={(e) => handleTypographyChange('fontWeight', parseInt(e.target.value))}
          >
            <option value="300">Light (300)</option>
            <option value="400">Regular (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">Semibold (600)</option>
            <option value="700">Bold (700)</option>
          </select>
        </div>
      </div>
      
      <div className="stylo-panel-section">
        <h3 className="stylo-panel-title">Spacing</h3>
        <div className="stylo-input-group">
          <label className="stylo-input-label">Padding</label>
          <input
            type="text"
            className="stylo-input"
            value={config.spacing.padding}
            onChange={(e) => handleUpdate({ spacing: { ...config.spacing, padding: e.target.value } })}
          />
        </div>
        
        <div className="stylo-input-group">
          <label className="stylo-input-label">Margin</label>
          <input
            type="text"
            className="stylo-input"
            value={config.spacing.margin}
            onChange={(e) => handleUpdate({ spacing: { ...config.spacing, margin: e.target.value } })}
          />
        </div>
      </div>
      
      <div className="stylo-panel-section">
        <h3 className="stylo-panel-title">Border Radius</h3>
        <div className="stylo-input-group">
          <input
            type="text"
            className="stylo-input"
            value={config.borderRadius}
            onChange={(e) => handleUpdate({ borderRadius: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};