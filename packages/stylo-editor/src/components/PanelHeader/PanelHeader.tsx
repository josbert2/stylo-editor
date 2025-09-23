import React from 'react';
import styles from './PanelHeader.module.css';

interface PanelHeaderProps {
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ 
  title, 
  onClose, 
  children 
}) => {
  return (
    <div className={styles.panelHeader}>
      <div className={styles.panelHeaderContent}>
        <h3 className={styles.panelTitle}>{title}</h3>
        {children}
      </div>
      {onClose && (
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close panel"
        >
          ×
        </button>
      )}
    </div>
  );
};
