// src/types/cssTypes.ts
export interface CSSProperty {
    name: string;
    value: string;
    isDefault?: boolean;
  }
  
  export interface PropertySection {
    title: string;
    properties: CSSProperty[];
    expanded: boolean;
  }