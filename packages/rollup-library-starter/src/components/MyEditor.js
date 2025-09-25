import * as React from 'react';
const { useState, useRef, useEffect } = React;


const StyloEditor = ({
  initialValue = '',
  placeholder = 'Escribe aquí...',
  onChange = () => {},
  onSave = () => {},
  className = '',
  style = {},
  autoFocus = false,
  readOnly = false,
}) => {
  const [content, setContent] = useState(initialValue);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (autoFocus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [autoFocus]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  const handleKeyDown = (e) => {
    // Ctrl+S para guardar
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      onSave(content);
    }
  };

  const executeCommand = (command, value = null) => {
    if (readOnly) return;
    
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleContentChange();
    
    // Actualizar estados de formato
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
  };

  const handleSelectionChange = () => {
    if (document.getSelection().rangeCount > 0) {
      setIsBold(document.queryCommandState('bold'));
      setIsItalic(document.queryCommandState('italic'));
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const toolbarStyle = {
    display: 'flex',
    gap: '8px',
    padding: '8px',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
  };

  const editorStyle = {
    minHeight: '200px',
    padding: '12px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    lineHeight: '1.6',
    ...style,
  };

  const containerStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
    ...style,
  };

  return (
    <div className={`stylo-editor ${className}`} style={containerStyle}>
      {!readOnly && (
        <div className="stylo-toolbar" style={toolbarStyle}>
          <button
            type="button"
            style={isBold ? activeButtonStyle : buttonStyle}
            onClick={() => executeCommand('bold')}
            title="Negrita (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          
          <button
            type="button"
            style={isItalic ? activeButtonStyle : buttonStyle}
            onClick={() => executeCommand('italic')}
            title="Cursiva (Ctrl+I)"
          >
            <em>I</em>
          </button>
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('underline')}
            title="Subrayado (Ctrl+U)"
          >
            <u>U</u>
          </button>
          
          <div style={{ width: '1px', backgroundColor: '#ccc', margin: '0 4px' }} />
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('justifyLeft')}
            title="Alinear izquierda"
          >
            ←
          </button>
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('justifyCenter')}
            title="Centrar"
          >
            ↔
          </button>
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('justifyRight')}
            title="Alinear derecha"
          >
            →
          </button>
          
          <div style={{ width: '1px', backgroundColor: '#ccc', margin: '0 4px' }} />
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('insertUnorderedList')}
            title="Lista con viñetas"
          >
            •
          </button>
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('insertOrderedList')}
            title="Lista numerada"
          >
            1.
          </button>
          
          <div style={{ width: '1px', backgroundColor: '#ccc', margin: '0 4px' }} />
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('undo')}
            title="Deshacer (Ctrl+Z)"
          >
            ↶
          </button>
          
          <button
            type="button"
            style={buttonStyle}
            onClick={() => executeCommand('redo')}
            title="Rehacer (Ctrl+Y)"
          >
            ↷
          </button>
        </div>
      )}
      
      <div
        ref={editorRef}
        className="stylo-content"
        style={editorStyle}
        contentEditable={!readOnly}
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: initialValue }}
        data-placeholder={placeholder}
      />
      
      <style jsx>{`
        .stylo-content:empty:before {
          content: attr(data-placeholder);
          color: #999;
          pointer-events: none;
        }
        .stylo-content:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

// Componente con configuraciones predefinidas
export const SimpleStyloEditor = (props) => (
  <StyloEditor
    {...props}
    style={{ minHeight: '100px', ...props.style }}
  />
);

// Hook personalizado para usar el editor
export const useStyloEditor = (initialValue = '') => {
  const [content, setContent] = useState(initialValue);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (newContent) => {
    setContent(newContent);
    setHasChanges(newContent !== initialValue);
  };

  const reset = () => {
    setContent(initialValue);
    setHasChanges(false);
  };

  const save = () => {
    setHasChanges(false);
    return content;
  };

  return {
    content,
    hasChanges,
    handleChange,
    reset,
    save,
  };
};

export default StyloEditor;