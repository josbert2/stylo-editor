import { EventEmitter } from '../utils/EventEmitter';
import type { 
  StyloEditorEvents, 
  PanelOptions, 
  TabType, 
  StyleValues,
  ElementInfo 
} from '../types';

export class InspectorPanel extends EventEmitter<StyloEditorEvents> {
  private container: HTMLElement;
  private panelElement: HTMLElement | null = null;
  private isMinimized: boolean = false;
  private isDragging: boolean = false;
  private activeTab: TabType = 'design';
  private position = { x: 20, y: 20 };
  private dragOffset = { x: 0, y: 0 };
  private selectedElement: HTMLElement | null = null;
  private elementInfo: ElementInfo | null = null;
  private styleValues: StyleValues | null = null;
  private logoApp: HTMLElement | null = null;
  
  // Propiedades para mejorar el drag
  private dragThrottleId: number | null = null;
  private snapThreshold: number = 20;
  private dragStartPosition = { x: 0, y: 0 };

  constructor(container: HTMLElement, options: PanelOptions = {}) {
    super();

    this.container = container;
    this.isMinimized = options.minimized || false;
    this.position = options.position || { x: 20, y: 20 };
    this.createLogoApp();
    this.createPanel();
   
    this.bindEvents();
  }

  private createLogoApp(): void {
    this.logoApp = document.createElement('div');
    this.logoApp.className = 'logo-app';
    this.logoApp.innerHTML = `
      <svg 
        version="1.0" 
        xmlns="http://www.w3.org/2000/svg"
        width="32" 
        height="32" 
        viewBox="0 0 1024 1024"
        preserveAspectRatio="xMidYMid meet"
        style="width: 100%; height: 100%;"
      >
        <g 
          transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
          fill="#ffffff" 
          stroke="none"
        >
          <path d="M2070 7109 c-506 -56 -917 -442 -1036 -974 -25 -112 -30 -382 -9
-507 49 -297 199 -588 398 -774 90 -84 184 -148 309 -211 l95 -48 -79 -119
c-133 -202 -288 -504 -288 -563 0 -29 15 -39 223 -159 167 -96 191 -106 215
-98 32 11 178 182 263 309 85 126 180 323 229 474 l42 129 99 31 c132 42 215
80 315 146 198 129 375 347 465 572 75 185 118 466 101 651 -4 45 -6 82 -4 82
2 0 21 -15 43 -33 78 -67 212 -117 314 -117 157 0 326 97 370 214 22 58 14 70
-40 55 -61 -17 -143 -4 -256 41 -57 23 -114 47 -128 54 l-25 14 45 22 c106 54
219 207 249 339 22 94 -9 301 -45 301 -8 0 -35 -27 -60 -60 -55 -72 -98 -102
-241 -172 -168 -81 -256 -180 -290 -323 l-11 -50 -51 107 c-65 137 -134 237
-230 332 -107 106 -180 158 -307 221 -216 107 -422 142 -675 114z m900 -974
c60 -31 73 -98 44 -228 -52 -229 -216 -408 -429 -468 -69 -19 -226 -17 -298 4
-31 10 -92 34 -135 54 -69 33 -86 37 -162 37 -81 1 -90 -1 -195 -49 -106 -48
-113 -50 -200 -50 -79 0 -97 4 -144 28 -132 70 -212 208 -241 419 -15 105 -5
173 27 206 22 22 30 24 86 19 34 -3 121 -21 192 -41 187 -51 302 -67 483 -67
215 0 358 21 587 88 223 65 327 78 385 48z m-512 -997 c25 -25 5 -271 -39
-478 -63 -291 -224 -632 -386 -818 l-38 -44 -218 127 c-119 70 -217 133 -217
140 0 7 30 73 68 147 130 256 267 443 497 674 149 150 283 264 309 264 7 0 17
-5 24 -12z"/>
          <path d="M2532 5901 c-148 -52 -336 -180 -330 -225 4 -25 46 -33 79 -15 20 10
25 9 38 -11 39 -57 88 -99 125 -105 74 -14 164 34 193 103 8 20 13 60 12 95
l-3 60 52 23 c60 26 71 44 48 79 -14 22 -24 25 -74 25 -37 0 -86 -10 -140 -29z"/>
          <path d="M1392 5908 c-29 -29 -1 -69 67 -97 29 -13 29 -13 15 -47 -40 -96 11
-195 109 -211 46 -7 102 20 133 66 19 28 31 36 55 36 18 0 36 7 42 16 24 39
-52 104 -226 193 -109 57 -169 70 -195 44z"/>
          <path d="M4565 5784 c-257 -57 -409 -254 -392 -509 9 -134 62 -234 160 -301
65 -45 135 -69 327 -115 277 -65 373 -112 400 -195 40 -121 -73 -214 -265
-217 -106 -2 -177 14 -237 52 -41 26 -55 47 -91 132 -19 44 -37 49 -186 49
-140 0 -146 -4 -138 -95 14 -149 109 -280 256 -353 114 -57 207 -76 371 -77
216 0 370 51 490 161 215 199 185 559 -58 701 -67 40 -160 70 -342 114 -268
64 -350 115 -350 215 0 91 82 152 217 161 156 11 258 -35 298 -132 32 -80 20
-75 189 -75 184 0 186 1 166 88 -18 82 -76 188 -137 247 -62 62 -142 106 -243
135 -101 29 -333 37 -435 14z"/>
          <path d="M7570 5773 c-39 -14 -39 -9 -33 -802 4 -481 9 -771 16 -778 13 -18
278 -18 295 -1 9 9 12 196 12 780 0 755 0 768 -20 788 -18 18 -33 20 -137 19
-65 0 -125 -3 -133 -6z"/>
          <path d="M5697 5602 c-14 -15 -17 -41 -17 -140 l0 -122 -83 0 c-51 0 -88 -5
-95 -12 -8 -8 -12 -49 -12 -120 0 -128 2 -130 117 -127 l76 2 4 -324 c5 -354
10 -390 62 -470 58 -86 156 -118 371 -119 138 0 140 2 140 139 0 75 -4 112
-12 118 -7 6 -50 13 -96 16 -94 6 -116 18 -132 76 -5 20 -10 156 -10 304 l0
268 115 -3 c94 -2 117 0 125 12 5 8 10 59 10 112 0 128 0 128 -141 128 l-109
0 0 124 c0 100 -3 128 -16 140 -12 13 -41 16 -148 16 -116 0 -135 -2 -149 -18z"/>
          <path d="M8512 5359 c-182 -28 -337 -140 -417 -303 -45 -90 -65 -185 -65 -306
0 -192 51 -322 171 -435 117 -110 241 -158 409 -158 170 0 308 52 414 158 121
120 167 240 167 435 0 127 -21 230 -64 315 -39 79 -153 193 -233 233 -111 56
-259 80 -382 61z m219 -286 c39 -20 61 -40 81 -73 77 -128 77 -372 0 -485 -77
-112 -269 -128 -368 -30 -62 62 -79 122 -78 270 0 100 4 130 24 180 26 69 91
139 142 154 67 19 141 13 199 -16z"/>
          <path d="M6342 5328 c-20 -20 -14 -52 34 -180 37 -100 203 -560 330 -914 l26
-71 -23 -48 c-31 -67 -66 -85 -160 -85 -105 0 -109 -5 -109 -148 0 -108 1
-112 25 -128 22 -14 42 -16 129 -10 57 3 127 13 155 22 112 33 189 126 265
320 56 146 297 818 374 1046 56 164 56 167 38 187 -17 19 -30 21 -141 21 -81
0 -127 -4 -138 -12 -15 -12 -192 -549 -230 -699 l-13 -53 -93 275 c-122 356
-156 447 -177 470 -15 17 -32 19 -149 19 -88 0 -135 -4 -143 -12z"/>
          <path d="M1432 3762 c-7 -5 -10 -16 -6 -25 5 -13 1 -17 -17 -17 -40 0 -107
-40 -153 -91 -61 -67 -86 -139 -97 -274 -17 -207 -45 -290 -126 -365 -48 -46
-53 -70 -22 -101 21 -21 29 -21 133 -16 129 6 213 30 329 89 89 46 214 157
254 225 55 95 76 211 52 298 -8 29 -8 40 0 43 6 2 11 12 11 23 0 21 -39 48
-221 153 -128 73 -119 69 -137 58z"/>
        </g>
      </svg>
    `;
    this.logoApp.style.cssText = `
      position: absolute;
      top: 8px;
      left: 8px;
      width: 32px;
      height: 32px;
      border-radius: 4px;
    `;
  }

  /**
   * Crear el panel principal
   */
  private createPanel(): void {
    this.panelElement = document.createElement('div');
    this.panelElement.className = 'stylo-panel';
    this.panelElement.style.cssText = `
      position: fixed;
      left: ${this.position.x}px;
      top: ${this.position.y}px;
      width: ${this.isMinimized ? '200px' : '320px'};
      height: ${this.isMinimized ? '44px' : '400px'};
      min-width: ${this.isMinimized ? '200px' : '320px'};
      min-height: ${this.isMinimized ? '44px' : '400px'};
      max-width: ${this.isMinimized ? '300px' : '90vw'};
      max-height: ${this.isMinimized ? '44px' : '90vh'};
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: white;
      resize: ${this.isMinimized ? 'none' : 'both'};
      overflow: hidden;
      transition: box-shadow 0.2s ease, transform 0.1s ease;
      user-select: none;
    `;

    this.renderContent();
    this.container.appendChild(this.panelElement);
  }

  /**
   * Renderizar el contenido del panel
   */
  private renderContent(): void {
    if (!this.panelElement) return;

    if (this.isMinimized) {
      this.renderMinimizedView();
    } else {
      this.renderFullView();
    }
  }

  /**
   * Renderizar vista minimizada
   */
  private renderMinimizedView(): void {
    if (!this.panelElement) return;

    this.panelElement.innerHTML = `
      <div class="minimized-panel" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        height: 100%;
        cursor: grab;
        background: linear-gradient(135deg, #4AEDFF 0%, #B794F6 100%);
        border-radius: 8px;
      " data-drag-handle>
        <div style="display: flex; align-items: center; gap: 8px;">
          
          ${this.logoApp ? this.logoApp.outerHTML : ''}
          <span style="font-size: 14px; font-weight: 500; color: white;">Stylo Editor ew</span>
        </div>
        
        <div style="display: flex; align-items: center; gap: 4px;">
          <button class="inspector-toggle-btn" style="
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 4px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
            font-size: 12px;
          " title="Activate Inspector">🎯</button>
          
          <button class="expand-btn" style="
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 4px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
            font-size: 10px;
          " title="Expand Panel">⬆</button>
        </div>
      </div>
    `;
  }

  /**
   * Renderizar el encabezado del panel
   */
  private renderPanelHeader(): string {
    return `
      <div class="panel-header" style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        border-bottom: 1px solid #333;
        cursor: grab;
        background: linear-gradient(135deg, #4AEDFF 0%, #B794F6 100%);
        border-radius: 8px 8px 0 0;
      " data-drag-handle>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">${this.logoApp ? this.logoApp.innerHTML : 'S'}</div>
          <span style="font-size: 16px; font-weight: 600; color: white;">Stylo Editor</span>
        </div>
        
        <div style="display: flex; align-items: center; gap: 4px;">
          <button class="inspector-toggle-btn" style="
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 4px;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
          " title="Toggle Inspector">🎯</button>
          
          <button class="minimize-btn" style="
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 4px;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: white;
            font-size: 14px;
          " title="Minimize Panel">−</button>
        </div>
      </div>
    `;
  }

  /**
   * Renderizar las pestañas del panel
   */
  private renderPanelTabs(): string {
    return `
      <div class="text-center panel-tabs" style="
        display: flex;
        background: #2a2a2a;
        border-bottom: 1px solid #333;
      ">
        <button class="tab-btn ${this.activeTab === 'design' ? 'active' : ''}" data-tab="design" style="
          flex: 1;
          padding: 12px;
          background: ${this.activeTab === 'design' ? '#4AEDFF' : 'transparent'};
          color: ${this.activeTab === 'design' ? '#000' : '#fff'};
          border: none;
          cursor: pointer;
          font-weight: 500;
        ">Design</button>
        <button class="tab-btn ${this.activeTab === 'code' ? 'active' : ''}" data-tab="code" style="
          flex: 1;
          padding: 12px;
          background: ${this.activeTab === 'code' ? '#4AEDFF' : 'transparent'};
          color: ${this.activeTab === 'code' ? '#000' : '#fff'};
          border: none;
          cursor: pointer;
          font-weight: 500;
        ">Code</button>
      </div>
    `;
  }

  /**
   * Renderizar el contenido del panel
   */
  private renderPanelContent(): string {
    return `
      <div class="panel-content" style="
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      ">
        ${this.renderTabContent()}
      </div>
    `;
  }

  /**
   * Renderizar vista completa usando componentes
   */
  private renderFullView(): void {
    if (!this.panelElement) return;

    this.panelElement.innerHTML = `
      ${this.renderPanelHeader()}
      ${this.renderPanelTabs()}
      ${this.renderPanelContent()}
    `;
  }

  /**
   * Renderizar contenido de la pestaña activa
   */
  private renderTabContent(): string {
    if (this.activeTab === 'design') {
      return this.renderDesignTab();
    } else if (this.activeTab === 'code') {
      return this.renderCodeTab();
    }
    return '';
  }

  /**
   * Renderizar estado vacío
   */
  private renderEmptyState(): string {
    return `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 200px;
        text-align: center;
        color: #888;
      ">
        <div style="
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4AEDFF 0%, #B794F6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          font-size: 24px;
        ">🎯</div>
        <h3 style="margin: 0 0 8px 0; color: #fff;">Click the inspector button and select any element to view its CSS properties</h3>
        <p style="margin: 0; font-size: 14px;">Inspector mode: OFF</p>
        <button class="inspector-toggle-btn" style="
          margin-top: 16px;
          background: linear-gradient(135deg, #4AEDFF 0%, #B794F6 100%);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        ">Activate Inspector</button>
      </div>
    `;
  }

  /**
   * Renderizar pestaña de diseño
   */
  private renderDesignTab(): string {
    if (!this.selectedElement || !this.elementInfo) {
      return this.renderEmptyState();
    }

    return `
      <div>
        <div style="margin-bottom: 16px;">
          <h3 style="margin: 0 0 8px 0; color: #4AEDFF;">Selected Element</h3>
          <div style="
            background: #2a2a2a;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #333;
          ">
            <div style="font-family: monospace; color: #fff;">
              &lt;${this.elementInfo.tagName}${this.elementInfo.id ? ` id="${this.elementInfo.id}"` : ''}${this.elementInfo.classes.length ? ` class="${this.elementInfo.classes.join(' ')}"` : ''}&gt;
            </div>
          </div>
        </div>
        
        <div style="color: #888; text-align: center; padding: 40px 0;">
          Design controls will be implemented here
        </div>
      </div>
    `;
  }

  /**
   * Renderizar pestaña de código
   */
  private renderCodeTab(): string {
    if (!this.selectedElement || !this.elementInfo) {
      return this.renderEmptyState();
    }

    return `
      <div>
        <div style="margin-bottom: 16px;">
          <h3 style="margin: 0 0 8px 0; color: #4AEDFF;">CSS Properties</h3>
          <div style="
            background: #2a2a2a;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #333;
            font-family: monospace;
            font-size: 12px;
            color: #fff;
            max-height: 300px;
            overflow-y: auto;
          ">
            <div>/* CSS properties for ${this.elementInfo.selector} */</div>
            <div style="color: #888; margin-top: 8px;">
              Properties will be displayed here when implemented
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Vincular eventos
   */
  private bindEvents(): void {
    if (!this.panelElement) return;

    this.panelElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains('minimize-btn')) {
        this.minimize();
      } else if (target.classList.contains('expand-btn')) {
        this.expand();
      } else if (target.classList.contains('tab-btn')) {
        const tab = target.getAttribute('data-tab') as TabType;
        if (tab) {
          this.setActiveTab(tab);
        }
      } else if (target.classList.contains('inspector-toggle-btn')) {
          // Emitir evento de toggle del inspector
          this.emit('inspector:toggle', true);
        }
    });

    // Eventos globales de arrastre
    document.addEventListener('mousemove', this.handleDragMove);
    document.addEventListener('mouseup', this.handleDragEnd.bind(this));

    // Eventos de arrastre en el panel
    this.panelElement.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-drag-handle]')) {
        this.handleDragStart(e);
      }
    });
  }

  /**
   * Manejar inicio de arrastre
   */
  private handleDragStart(e: MouseEvent): void {
    if (!this.panelElement) return;

    this.isDragging = true;
    this.dragStartPosition = { x: e.clientX, y: e.clientY };
    
    const rect = this.panelElement.getBoundingClientRect();
    this.dragOffset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    // Efectos visuales
    this.panelElement.style.cursor = 'grabbing';
    this.panelElement.style.transform = 'scale(1.02)';
    this.panelElement.style.zIndex = '10000';
    this.panelElement.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';

    e.preventDefault();
  }

  /**
   * Función throttle para optimizar rendimiento
   */
  private throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Calcular límites de la pantalla
   */
  private calculateBounds(): { minX: number; maxX: number; minY: number; maxY: number } {
    if (!this.panelElement) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    
    const rect = this.panelElement.getBoundingClientRect();
    return {
      minX: 0,
      maxX: window.innerWidth - rect.width,
      minY: 0,
      maxY: window.innerHeight - rect.height
    };
  }

  /**
   * Aplicar snap a los bordes
   */
  private applySnap(x: number, y: number): { x: number; y: number } {
    const bounds = this.calculateBounds();
    
    // Snap horizontal
    if (x < this.snapThreshold) {
      x = 0;
    } else if (x > bounds.maxX - this.snapThreshold) {
      x = bounds.maxX;
    }
    
    // Snap vertical
    if (y < this.snapThreshold) {
      y = 0;
    } else if (y > bounds.maxY - this.snapThreshold) {
      y = bounds.maxY;
    }
    
    return { x, y };
  }

  /**
   * Manejar movimiento de arrastre (con throttle)
   */
  private handleDragMove = this.throttle((e: MouseEvent) => {
    if (!this.isDragging || !this.panelElement) return;

    const bounds = this.calculateBounds();
    let newX = e.clientX - this.dragOffset.x;
    let newY = e.clientY - this.dragOffset.y;

    // Aplicar límites
    newX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
    newY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));

    // Aplicar snap
    const snapped = this.applySnap(newX, newY);
    
    this.position = snapped;
    this.panelElement.style.left = `${snapped.x}px`;
    this.panelElement.style.top = `${snapped.y}px`;
  }, 16); // ~60fps

  /**
   * Manejar fin de arrastre
   */
  private handleDragEnd(): void {
    if (!this.isDragging || !this.panelElement) return;

    this.isDragging = false;

    // Restaurar efectos visuales
    this.panelElement.style.cursor = 'grab';
    this.panelElement.style.transform = 'scale(1)';
    this.panelElement.style.zIndex = '9999';
    this.panelElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';

    // Limpiar throttle
    if (this.dragThrottleId) {
      clearTimeout(this.dragThrottleId);
      this.dragThrottleId = null;
    }
  }

  /**
   * Minimizar el panel
   */
  minimize(): void {
    this.isMinimized = true;
    this.updatePanelDimensions();
    this.renderContent();
    this.emit('panel:minimized', true);
  }

  /**
   * Expandir el panel
   */
  expand(): void {
    this.isMinimized = false;
    this.updatePanelDimensions();
    this.renderContent();
    this.emit('panel:minimized', false);
  }

  /**
   * Actualizar dimensiones del panel según el estado
   */
  private updatePanelDimensions(): void {
    if (!this.panelElement) return;
    
    const width = this.isMinimized ? '200px' : '320px';
    const height = this.isMinimized ? '44px' : '400px';
    const minWidth = this.isMinimized ? '200px' : '320px';
    const minHeight = this.isMinimized ? '44px' : '400px';
    const maxWidth = this.isMinimized ? '300px' : '90vw';
    const maxHeight = this.isMinimized ? '44px' : '90vh';
    const resize = this.isMinimized ? 'none' : 'both';
    
    this.panelElement.style.width = width;
    this.panelElement.style.height = height;
    this.panelElement.style.minWidth = minWidth;
    this.panelElement.style.minHeight = minHeight;
    this.panelElement.style.maxWidth = maxWidth;
    this.panelElement.style.maxHeight = maxHeight;
    this.panelElement.style.resize = resize;
  }

  /**
   * Establecer pestaña activa
   */
  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
    this.renderContent();
    this.emit('tab:changed', tab);
  }

  /**
   * Actualizar elemento seleccionado
   */
  public updateSelectedElement(element: HTMLElement | null, elementInfo: ElementInfo | null): void {
    this.selectedElement = element;
    this.elementInfo = elementInfo;
    this.renderContent();
  }

  /**
   * Actualizar valores de estilo
   */
  public updateStyleValues(styleValues: StyleValues): void {
    this.styleValues = styleValues;
    this.renderContent();
  }

  /**
   * Obtener estado minimizado
   */
  public getIsMinimized(): boolean {
    return this.isMinimized;
  }

  /**
   * Mostrar el panel
   */
  public show(): void {
    if (this.panelElement) {
      this.panelElement.style.display = 'block';
    }
  }

  /**
   * Ocultar el panel
   */
  public hide(): void {
    if (this.panelElement) {
      this.panelElement.style.display = 'none';
    }
  }

  /**
   * Destruir el panel
   */
  override destroy(): void {
    if (this.panelElement) {
      this.panelElement.remove();
      this.panelElement = null;
    }
    
    // Limpiar eventos globales
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd.bind(this));
    
    super.destroy();
  }
}