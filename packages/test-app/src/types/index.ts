export interface StyleConfig {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    typography: {
      fontFamily: string;
      fontSize: string;
      lineHeight: number;
      fontWeight: number;
    };
    spacing: {
      padding: string;
      margin: string;
    };
    borderRadius: string;
  }

  export interface ButtonProps {
    label: string;
    onClick: () => void;
  }
  
  export type StyleUpdateFunction = (config: Partial<StyleConfig>) => void;
  