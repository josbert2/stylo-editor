// Helpers sin TS
export const CSS_CATEGORIES = {
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
  
  export const parseSpacingValue = (value) => {
    const match = value?.match(/^(-?\d*\.?\d+)(.*)$/);
    return match ? { value: parseFloat(match[1]), unit: match[2] || 'px' } : { value: 0, unit: 'px' };
  };
  
  export const parseValue = (cssValue) => {
    const match = cssValue?.match(/^(\d*\.?\d+)(.*)$/);
    return match ? { value: match[1], unit: match[2] || 'px' } : { value: cssValue, unit: 'px' };
  };
  
  export const getElementInfo = (el) => {
    const tag = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : '';
    const classes = el.className ? `.${String(el.className).split(' ').join('.')}` : '';
    return `${tag}${id}${classes}`;
  };
  
  export const readComputedSections = (element) => {
    const computed = window.getComputedStyle(element);
    const sections = [];
  
    Object.entries(CSS_CATEGORIES).forEach(([key, props]) => {
      const list = [];
      props.forEach((p) => {
        const val = computed.getPropertyValue(p);
        if (val && val !== 'none' && val !== 'auto' && val !== 'normal') {
          list.push({ name: p, value: val, isDefault: false });
        }
      });
      if (list.length) {
        sections.push({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          properties: list,
          expanded: key === 'spacing' || key === 'typography'
        });
      }
    });
  
    return sections;
  };
  