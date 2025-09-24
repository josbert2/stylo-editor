import { useCallback, useEffect, useState } from 'react';
import { parseSpacingValue, parseValue, getElementInfo, readComputedSections } from '../utils/css';

export default function useInspector({ panelRef, updateOverlay }) {
  const [selectedElement, setSelectedElement] = useState(null);
  const [isInspectorMode, setIsInspectorMode] = useState(false);
  const [sections, setSections] = useState([]);
  const [elementInfo, setElementInfo] = useState('');

  const [editableValues, setEditableValues] = useState({
    width: { value: 'auto', unit: 'px' },
    height: { value: 'auto', unit: 'px' },
    borderRadius: { value: '0', unit: 'px' },
    rotate: { value: '0', unit: 'deg' }
  });

  const [spacingValues, setSpacingValues] = useState({
    marginTop: { value: 0, unit: 'px' },
    marginRight: { value: 0, unit: 'px' },
    marginBottom: { value: 0, unit: 'px' },
    marginLeft: { value: 0, unit: 'px' },
    paddingTop: { value: 0, unit: 'px' },
    paddingRight: { value: 0, unit: 'px' },
    paddingBottom: { value: 0, unit: 'px' },
    paddingLeft: { value: 0, unit: 'px' }
  });

  const [typographyValues, setTypographyValues] = useState({
    fontFamily: 'Arial, sans-serif',
    fontWeight: '400',
    fontSize: { value: 16, unit: 'px' },
    color: '#000000',
    lineHeight: '1.5',
    textAlign: 'left',
    textDecoration: { underline: false, overline: false, lineThrough: false },
    fontStyle: 'normal',
    useBackgroundAsText: false
  });

  const activate = useCallback(() => setIsInspectorMode(true), []);
  const deactivate = useCallback(() => {
    setIsInspectorMode(false);
    updateOverlay(null);
    setSelectedElement(null);
    setElementInfo('');
    setSections([]);
  }, [updateOverlay]);

  const onClick = useCallback((e) => {
    if (!isInspectorMode) return;
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;

    if (panelRef.current?.contains(target)) return;

    setSelectedElement(target);
    setElementInfo(getElementInfo(target));
    updateOverlay(target, true);
    const newSections = readComputedSections(target);
    setSections(newSections);

    const computed = window.getComputedStyle(target);
    setEditableValues({
      width: parseValue(computed.width),
      height: parseValue(computed.height),
      borderRadius: parseValue(computed.borderRadius),
      rotate: { value: '0', unit: 'deg' }
    });

    setSpacingValues({
      marginTop: parseSpacingValue(computed.marginTop),
      marginRight: parseSpacingValue(computed.marginRight),
      marginBottom: parseSpacingValue(computed.marginBottom),
      marginLeft: parseSpacingValue(computed.marginLeft),
      paddingTop: parseSpacingValue(computed.paddingTop),
      paddingRight: parseSpacingValue(computed.paddingRight),
      paddingBottom: parseSpacingValue(computed.paddingBottom),
      paddingLeft: parseSpacingValue(computed.paddingLeft)
    });

    setIsInspectorMode(false);
    document.body.style.cursor = 'default';
  }, [isInspectorMode, panelRef, updateOverlay]);

  const onHover = useCallback((e) => {
    if (!isInspectorMode) return;
    const target = e.target;
    if (panelRef.current?.contains(target)) return;
    updateOverlay(target);
  }, [isInspectorMode, panelRef, updateOverlay]);

  const onQuickSelect = useCallback((e) => {
    if (!selectedElement || (!e.ctrlKey && !e.metaKey)) return;
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    if (panelRef.current?.contains(target)) return;

    setSelectedElement(target);
    setElementInfo(getElementInfo(target));
    updateOverlay(target, true);
    setSections(readComputedSections(target));

    const computed = window.getComputedStyle(target);
    setEditableValues({
      width: parseValue(computed.width),
      height: parseValue(computed.height),
      borderRadius: parseValue(computed.borderRadius),
      rotate: { value: '0', unit: 'deg' }
    });

    setSpacingValues({
      marginTop: parseSpacingValue(computed.marginTop),
      marginRight: parseSpacingValue(computed.marginRight),
      marginBottom: parseSpacingValue(computed.marginBottom),
      marginLeft: parseSpacingValue(computed.marginLeft),
      paddingTop: parseSpacingValue(computed.paddingTop),
      paddingRight: parseSpacingValue(computed.paddingRight),
      paddingBottom: parseSpacingValue(computed.paddingBottom),
      paddingLeft: parseSpacingValue(computed.paddingLeft)
    });
  }, [panelRef, selectedElement, updateOverlay]);

  useEffect(() => {
    if (isInspectorMode) {
      document.addEventListener('click', onClick, true);
      document.addEventListener('mouseover', onHover, true);
      document.body.style.cursor = 'crosshair';
    } else {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('mouseover', onHover, true);
      document.body.style.cursor = 'default';
    }
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('mouseover', onHover, true);
      document.body.style.cursor = 'default';
    };
  }, [isInspectorMode, onClick, onHover]);

  useEffect(() => {
    if (!selectedElement) return;
    document.addEventListener('click', onQuickSelect, true);
    return () => document.removeEventListener('click', onQuickSelect, true);
  }, [selectedElement, onQuickSelect]);

  return {
    selectedElement,
    isInspectorMode,
    setIsInspectorMode,
    sections,
    setSections,
    elementInfo,
    editableValues,
    setEditableValues,
    spacingValues,
    setSpacingValues,
    typographyValues,
    setTypographyValues,
    activate,
    deactivate
  };
}
