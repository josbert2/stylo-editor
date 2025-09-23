import { useState, useCallback } from 'react';
import { StyleConfig, StyleUpdateFunction } from '../types';

const defaultStyleConfig: StyleConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    background: '#ffffff',
    text: '#1f2937'
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    lineHeight: 1.5,
    fontWeight: 400
  },
  spacing: {
    padding: '1rem',
    margin: '1rem'
  },
  borderRadius: '0.25rem'
};

export function useStyleEditor(initialConfig: Partial<StyleConfig> = {}) {
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    ...defaultStyleConfig,
    ...initialConfig
  });

  const updateStyles: StyleUpdateFunction = useCallback((updates) => {
    setStyleConfig(prev => {
      // Handle nested updates
      const newConfig = { ...prev };
      
      if (updates.colors) {
        newConfig.colors = { ...prev.colors, ...updates.colors };
      }
      
      if (updates.typography) {
        newConfig.typography = { ...prev.typography, ...updates.typography };
      }
      
      if (updates.spacing) {
        newConfig.spacing = { ...prev.spacing, ...updates.spacing };
      }
      
      if (updates.borderRadius !== undefined) {
        newConfig.borderRadius = updates.borderRadius;
      }
      
      return newConfig;
    });
  }, []);

  const resetStyles = useCallback(() => {
    setStyleConfig(defaultStyleConfig);
  }, []);

  const exportStyles = useCallback(() => {
    return JSON.stringify(styleConfig, null, 2);
  }, [styleConfig]);

  return {
    styleConfig,
    updateStyles,
    resetStyles,
    exportStyles
  };
}