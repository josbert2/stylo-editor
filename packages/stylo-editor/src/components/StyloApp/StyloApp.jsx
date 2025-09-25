import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CSS_CATEGORIES, getElementInfo } from '../../utils/css';
import useOverlay from '../../hooks/useOverlay';
import useInspector from '../../hooks/useInspector';
import usePanelDrag from '../../hooks/usePanelDrag';
import useSpacingDrag from '../../hooks/useSpacingDrag';
import PanelShell from '../PanelShell';
import MinimizedPanel from '../MinimizedPanel';
import ExpandedPanel from '../ExpandedPanel';
import HeaderBar from '../HeaderBar';
import Tabs from '../Tabs';
import EmptyState from '../EmptyState';
import PositionTransform from '../DesignTab/PositionTransform';
import SpacingVisualizer from '../DesignTab/SpacingVisualizer';
import Sections from '../DesignTab/Sections';
import CodeTab from '../CodeTab';
import HtmlTab from '../HtmlTab';
import ChatTab from '../ChatTab';
import DockTrigger from '../DockTrigger';
import { cn } from "../../utils/cn";

export default function StyloApp() {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedMedia, setSelectedMedia] = useState('Auto - screen and (min-width: 1024px)');
  const [selectedState, setSelectedState] = useState('None');

  const [activeDockTool, setActiveDockTool] = useState('inspector');
  const [isMinimized, setIsMinimized] = useState(true);
  const [minimizedCorner, setMinimizedCorner] = useState('top-left');

  const { updateOverlay, destroyOverlay } = useOverlay();

  // Panel drag
  const {
    panelRef,
    panelPosition,
    isDraggingPanel,
    handlePanelDragStart
  } = usePanelDrag({ isMinimized, minimizedCorner, setMinimizedCorner });

  // Inspector & selection
  const {
    selectedElement,
    isInspectorMode,
    setIsInspectorMode,
    sections, setSections,
    elementInfo,
    editableValues, setEditableValues,
    spacingValues, setSpacingValues,
    typographyValues, setTypographyValues,
    activate, deactivate
  } = useInspector({ panelRef, updateOverlay });

  // Drag spacing
  const { onMouseDown: spacingDragStart } = useSpacingDrag({ selectedElement, spacingValues, setSpacingValues });

  // Filters
  const [filtersValues, setFiltersValues] = useState({ blur: 0, contrast: 1, brightness: 1, saturate: 1, invert: 0, grayscale: 0, sepia: 0 });
  const applyFiltersToSelected = useCallback((vals) => {
    if (!selectedElement) return;
    const parts = [
      `blur(${vals.blur}px)`,
      `contrast(${vals.contrast})`,
      `brightness(${vals.brightness})`,
      `saturate(${vals.saturate})`,
      `invert(${vals.invert}%)`,
      `grayscale(${vals.grayscale}%)`,
      `sepia(${vals.sepia}%)`,
    ];
    selectedElement.style.setProperty('filter', parts.join(' '), 'important');
  }, [selectedElement]);
  const handleFiltersChange = useCallback((key, val) => {
    setFiltersValues((prev) => {
      const next = { ...prev, [key]: val };
      applyFiltersToSelected(next);
      return next;
    });
  }, [applyFiltersToSelected]);

  // Shadows (text)
  const [shadowsValues, setShadowsValues] = useState({ layers: [{ offsetX: 1, offsetY: 2, blur: 3, color: 'rgba(0,0,0,0.35)' }] });
  const applyTextShadowsToSelected = useCallback((vals) => {
    if (!selectedElement) return;
    const css = vals.layers.map((l) => `${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.color}`).join(', ');
    selectedElement.style.setProperty('text-shadow', css || 'none', 'important');
  }, [selectedElement]);
  const handleShadowsChange = useCallback((next) => {
    setShadowsValues(next);
    applyTextShadowsToSelected(next);
  }, [applyTextShadowsToSelected]);

  // Box shadow
  const [boxShadow, setBoxShadow] = useState('none');
  const handleBoxShadowChange = useCallback((css) => {
    setBoxShadow(css);
    if (selectedElement) selectedElement.style.setProperty('box-shadow', css, 'important');
  }, [selectedElement]);

  // Positioning
  const [positioning, setPositioning] = useState({ position: 'static', top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' });
  const handlePositioningChange = useCallback((prop, value) => {
    setPositioning((prev) => ({ ...prev, [prop]: value }));
    if (!selectedElement) return;
    if (prop === 'position') selectedElement.style.setProperty('position', value, 'important');
    else selectedElement.style.setProperty(prop, value, 'important');
  }, [selectedElement]);

  // Border
  const [borderValues, setBorderValues] = useState({ color: '#c0d0d7', width: 1, unit: 'px', style: 'solid' });
  const handleBorderChange = useCallback((prop, value) => {
    setBorderValues((prev) => {
      const next = { ...prev, [prop]: value };
      if (selectedElement) {
        const css = `${next.width}${next.unit} ${next.style} ${next.color}`;
        selectedElement.style.setProperty('border', css, 'important');
      }
      return next;
    });
  }, [selectedElement]);

  // Display
  const [displayValues, setDisplayValues] = useState({ display: 'block', opacity: 100 });
  const handleDisplayChange = useCallback((prop, value) => {
    setDisplayValues((prev) => {
      const next = { ...prev, [prop]: value };
      if (selectedElement) {
        if (prop === 'display') selectedElement.style.setProperty('display', next.display, 'important');
        else if (prop === 'opacity') selectedElement.style.setProperty('opacity', String(next.opacity / 100), 'important');
      }
      return next;
    });
  }, [selectedElement]);

  // Background
  const [backgroundValues, setBackgroundValues] = useState([]);
  const handleBackgroundChange = useCallback((css, layers) => {
    setBackgroundValues(layers);
    if (selectedElement) {
      selectedElement.style.setProperty('background', css.background, 'important');
      selectedElement.style.setProperty('background-repeat', css.backgroundRepeat, 'important');
      selectedElement.style.setProperty('background-size', css.backgroundSize, 'important');
      selectedElement.style.setProperty('background-position', css.backgroundPosition, 'important');
    }
  }, [selectedElement]);

  // Spacing setters
  const setSpacingValue = useCallback((prop, n) => {
    if (!selectedElement) return;
    const unit = spacingValues[prop]?.unit || 'px';
    setSpacingValues((prev) => ({ ...prev, [prop]: { value: n, unit } }));
    selectedElement.style[prop] = `${n}${unit}`;
  }, [selectedElement, spacingValues, setSpacingValues]);

  const setSpacingUnit = useCallback((prop, unit) => {
    if (!selectedElement) return;
    const value = spacingValues[prop]?.value || 0;
    setSpacingValues((prev) => ({ ...prev, [prop]: { value, unit } }));
    selectedElement.style[prop] = `${value}${unit}`;
  }, [selectedElement, spacingValues, setSpacingValues]);

  // Tabs helpers
  const toggleInspector = useCallback(() => setIsInspectorMode((p) => !p), [setIsInspectorMode]);
  const onToolSelect = (id) => setActiveDockTool(id);

  const generateCSS = useCallback(() => {
    if (!selectedElement || sections.length === 0) return '';
    const selector = elementInfo || 'element';
    let css = `${selector} {\n`;
    sections.forEach((section) => {
      if (section.expanded && section.properties.length) {
        css += `  /* ${section.title} */\n`;
        section.properties.forEach((p) => { css += `  ${p.name}: ${p.value};\n`; });
        css += `\n`;
      }
    });
    css += '}';
    return css;
  }, [selectedElement, sections, elementInfo]);

  // Keep overlay updated for selected element
  useEffect(() => {
    if (!selectedElement) return;
    const updateSelectedOverlay = () => updateOverlay(selectedElement, true);
    window.addEventListener('resize', updateSelectedOverlay);
    window.addEventListener('scroll', updateSelectedOverlay);
    const ro = new ResizeObserver(updateSelectedOverlay);
    ro.observe(selectedElement);
    updateSelectedOverlay();
    return () => {
      window.removeEventListener('resize', updateSelectedOverlay);
      window.removeEventListener('scroll', updateSelectedOverlay);
      ro.disconnect();
    };
  }, [selectedElement, updateOverlay]);

  useEffect(() => () => destroyOverlay(), [destroyOverlay]);

  const cycleCorner = () => {
    const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
    // eslint-disable-next-line no-undef
    setMinimizedCorner((cur) => corners[(corners.indexOf(cur) + 1) % corners.length]);
  };

  return (
    <>
      {!isMinimized && (
        <DockTrigger
          onToolSelect={onToolSelect}
          activeTool={activeDockTool}
          isInspectorMode={isInspectorMode}
          onInspectorToggle={toggleInspector}
          selectedElement={selectedElement}
        />
      )}

      <PanelShell
        panelRef={panelRef}
        isDraggingPanel={isDraggingPanel}
        isMinimized={isMinimized}
        panelPosition={panelPosition}
      >
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
        {isMinimized ? (
          <MinimizedPanel
            isInspectorMode={isInspectorMode}
            selectedElement={selectedElement}
            onDragStart={handlePanelDragStart}
            onExpand={() => setIsMinimized(false)}
            onCycleCorner={cycleCorner}
          />
        ) : (
          <ExpandedPanel onDragStart={handlePanelDragStart} onMinimize={() => setIsMinimized(true)}>
            <HeaderBar
              selectedElement={selectedElement}
              isInspectorMode={isInspectorMode}
              onDragStart={handlePanelDragStart}
              onClearSelection={() => { /* clear selection */ updateOverlay(null); }}
            />

            {selectedElement && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}

            <ScrollArea className="flex-1 h-[200px] w-full relative">
              {!selectedElement ? (
                <EmptyState isInspectorMode={isInspectorMode} toggle={toggleInspector} />
              ) : (
                <div className="p-4">
                  {activeTab === 'design' && (
                    <div className="space-y-4">
                      {/* Media selector */}
                      <div className="space-y-3 bg-[#ff80bf0f] rounded-lg">
                        <div className="flex gap-2 items-center px-3 pt-3 text-gray-400">
                          <span className="text-xs">Media:</span>
                        </div>
                        <select value={selectedMedia} onChange={(e) => setSelectedMedia(e.target.value)} className="px-3 py-2 w-full text-sm text-pink-400 rounded border-none outline-none">
                          <option value="Auto - screen and (min-width: 1024px)">Auto - screen and (min-width: 1024px)</option>
                          <option value="Mobile - screen and (max-width: 768px)">Mobile - screen and (max-width: 768px)</option>
                          <option value="Tablet - screen and (max-width: 1024px)">Tablet - screen and (max-width: 1024px)</option>
                          <option value="Desktop - screen and (min-width: 1200px)">Desktop - screen and (min-width: 1200px)</option>
                        </select>
                      </div>

                      {/* State selector */}
                      <div className="space-y-3 bg-[#77f0a00d] rounded-lg">
                        <div className="flex gap-2 items-center px-3 pt-3 text-gray-400">
                          <div className="flex justify-center items-center w-4 h-4 rounded-full border border-gray-500">
                            <div className="w-2 h-2 bg-gray-500 rounded-full" />
                          </div>
                          <span className="text-xs">State or pseudo</span>
                        </div>
                        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="px-3 py-2 w-full text-sm text-green-400 bg-transparent rounded border-none outline-none">
                          <option value="None">None</option>
                          <option value="hover">:hover</option>
                          <option value="active">:active</option>
                          <option value="focus">:focus</option>
                          <option value="visited">:visited</option>
                          <option value="first-child">:first-child</option>
                          <option value="last-child">:last-child</option>
                          <option value="before">::before</option>
                          <option value="after">::after</option>
                        </select>
                      </div>

                      <PositionTransform
                        selectedElement={selectedElement}
                        editableValues={editableValues}
                        setEditableValues={setEditableValues}
                      />

                      <SpacingVisualizer
                        spacingValues={spacingValues}
                        setSpacingValue={setSpacingValue}
                        setSpacingUnit={setSpacingUnit}
                        onDragStart={spacingDragStart}
                      />

                      <Sections
                        typographyValues={typographyValues}
                        setTypographyValues={setTypographyValues}
                        handleTypographyChange={(prop, val) => {
                          if (!selectedElement) return;
                          setTypographyValues((prev) => ({ ...prev, [prop]: val }));
                          if (prop === 'textDecoration') {
                            const d = [];
                            if (val.underline) d.push('underline');
                            if (val.overline) d.push('overline');
                            if (val.lineThrough) d.push('line-through');
                            selectedElement.style.textDecoration = d.length ? d.join(' ') : 'none';
                          } else if (prop === 'fontSize') {
                            selectedElement.style.fontSize = `${val.value}${val.unit}`;
                          } else if (prop === 'useBackgroundAsText') {
                            if (val) {
                              selectedElement.style.backgroundClip = 'text';
                              selectedElement.style.webkitBackgroundClip = 'text';
                              selectedElement.style.color = 'transparent';
                            } else {
                              selectedElement.style.backgroundClip = 'unset';
                              selectedElement.style.webkitBackgroundClip = 'unset';
                              selectedElement.style.color = typographyValues.color;
                            }
                          } else {
                            selectedElement.style[prop] = val;
                          }
                        }}
                        handleFontSizeChange={(value) => {
                          if (!selectedElement) return;
                          const newFS = { ...typographyValues.fontSize, value };
                          setTypographyValues((prev) => ({ ...prev, fontSize: newFS }));
                          selectedElement.style.fontSize = `${value}${newFS.unit}`;
                        }}
                        handleFontSizeUnitChange={(unit) => {
                          if (!selectedElement) return;
                          const newFS = { ...typographyValues.fontSize, unit };
                          setTypographyValues((prev) => ({ ...prev, fontSize: newFS }));
                          selectedElement.style.fontSize = `${newFS.value}${unit}`;
                        }}
                        backgroundValues={backgroundValues}
                        handleBackgroundChange={handleBackgroundChange}
                        filtersValues={filtersValues}
                        handleFiltersChange={handleFiltersChange}
                        shadowsValues={shadowsValues}
                        handleShadowsChange={handleShadowsChange}
                        boxShadow={boxShadow}
                        handleBoxShadowChange={handleBoxShadowChange}
                        positioning={positioning}
                        handlePositioningChange={handlePositioningChange}
                        borderValues={borderValues}
                        handleBorderChange={handleBorderChange}
                        displayValues={displayValues}
                        handleDisplayChange={handleDisplayChange}
                      />
                    </div>
                  )}

                  {activeTab === 'code' && <CodeTab generateCSS={generateCSS} />}
                  {activeTab === 'html' && <HtmlTab selectedElement={selectedElement} />}
                  {activeTab === 'chat' && <ChatTab />}
                </div>
              )}
            </ScrollArea>
          </ExpandedPanel>
        )}
      </PanelShell>

      {!isMinimized && isInspectorMode && !selectedElement && (
        <div className="fixed top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-[9997] text-sm">
          🎯 Inspector Mode: Click any element to inspect its CSS
        </div>
      )}

      {!isMinimized && selectedElement && !isInspectorMode && (
        <div className="fixed top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-[9997] text-sm">
          💡 Hold <kbd className="px-1 bg-green-700 rounded">Ctrl</kbd> + Click to select another element
        </div>
      )}
    </>
  );
}
