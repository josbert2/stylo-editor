// src/constants/cssCategories.ts
export const CSS_CATEGORIES: { [key: string]: string[] } = {
    spacing: [
      'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding-top', 'padding-right', 'padding-bottom', 'padding-left'
    ],
    typography: [
      'font-family', 'font-size', 'font-weight', 'line-height', 'color',
      'text-align', 'letter-spacing', 'text-decoration', 'text-transform',
      'text-shadow', 'font-style'
    ],
    background: [
      'background-color', 'background-image', 'background-position',
      'background-size', 'background-repeat', 'background-attachment'
    ],
    border: [
      'border-width', 'border-style', 'border-color', 'border-radius',
      'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'
    ],
    display: [
      'display', 'position', 'top', 'right', 'bottom', 'left',
      'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
      'overflow', 'overflow-x', 'overflow-y', 'visibility', 'opacity', 'z-index'
    ],
    flexbox: [
      'flex-direction', 'justify-content', 'align-items', 'align-content',
      'flex-wrap', 'flex-grow', 'flex-shrink', 'flex-basis', 'align-self'
    ],
    effects: [
      'box-shadow', 'filter', 'transform', 'transition', 'animation',
      'backdrop-filter', 'clip-path'
    ]
  };