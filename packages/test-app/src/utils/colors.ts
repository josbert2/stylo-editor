export const colorPresets = {
    light: {
      primary: "#3b82f6",
      secondary: "#10b981",
      background: "#ffffff",
      text: "#1f2937"
    },
    dark: {
      primary: "#60a5fa",
      secondary: "#34d399",
      background: "#111827",
      text: "#f9fafb"
    }
  };
  
  export const hexToRgb = (hex: string): string => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgb(${r}, ${g}, ${b})`;
  };