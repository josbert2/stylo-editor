import styles from "../Csspro.module.css";
import { Minus as MinusIcon, Plus as PlusIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SpacingVisualizer({
  spacingValues,
  setSpacingValue,
  setSpacingUnit,
  onDragStart
}) {
  const NumberField = ({ propName, vertical }) => (
    <label
      data-css-pro-edit-rule={propName.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}
      onMouseDown={(e) => onDragStart(propName, e)}
      data-css-pro-input
      className={
        propName === 'marginTop' ? "flex absolute top-2 left-1/2 items-center border transform -translate-x-1/2 border-secondary-bg"
        : propName === 'marginBottom' ? "flex absolute bottom-2 left-1/2 items-center border transform -translate-x-1/2 border-secondary-bg"
        : propName === 'marginLeft' ? "absolute left-[-48px] top-[42%] transform -translate-y-[-6%] -rotate-90 origin-center border border-secondary-bg h-[44px] w-[45.035%]"
        : "absolute right-1 top-1/2 transform -translate-[101px] rotate-90 origin-center border border-secondary-bg h-[44px] w-[45.035%] top-[213px] right-[-148px]"
      }
    >
      <div className="flex items-center h-full">
        <span className="mr-1 text-xs text-gray-400">{vertical ? '⇕' : '⇔'}</span>
        <div className="flex gap-1 items-center h-full">
          <div className="flex items-center w-full h-full rounded">
            <button type="button" onClick={() => setSpacingValue(propName, Math.max(-999, (spacingValues[propName]?.value || 0) - 1))} className="flex justify-center items-center w-full h-full text-gray-400 hover:text-white hover:bg-secondary-bg">
              <PlusIcon size={12} className="rotate-180" />
            </button>
            <input
              type="text"
              value={spacingValues[propName]?.value || 0}
              onChange={(e) => setSpacingValue(propName, parseFloat(e.target.value) || 0)}
              className="w-full text-xs text-center text-white bg-transparent border-none outline-none"
            />
            <button type="button" onClick={() => setSpacingValue(propName, Math.min(999, (spacingValues[propName]?.value || 0) + 1))} className="flex justify-center items-center w-full h-full text-gray-400 hover:text-white hover:bg-secondary-bg">
              <PlusIcon size={12} />
            </button>
          </div>
          <Select value={spacingValues[propName]?.unit || 'px'} onValueChange={(v) => setSpacingUnit(propName, v)}>
            <SelectTrigger className="w-[60px] bg-none text-white px-2 py-1 rounded-r text-xs border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-primary-bg border-secondary-bg">
              <SelectItem value="auto">auto</SelectItem>
              <SelectItem value="px">px</SelectItem>
              <SelectItem value="%">%</SelectItem>
              <SelectItem value="em">em</SelectItem>
              <SelectItem value="rem">rem</SelectItem>
              <SelectItem value="vw">vw</SelectItem>
              <SelectItem value="vh">vh</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </label>
  );

  return (
    <div className={`${styles.cssProVisualSpacingBox} ${styles.cssProVisualAccordionContent} border border-secondary-bg css-pro-visual-spacing-box`}>
      <div className="css-pro-visual-spacing-placeholder horizontal top"></div>
      <div className="css-pro-visual-spacing-placeholder horizontal bottom"></div>
      <div className='css-pro-visual-spacing-placeholder vertical left'></div>
      <div className='css-pro-visual-spacing-placeholder vertical right'></div>

      <div className="p-6 rounded-lg bg-secondary-bg">
        <NumberField propName="marginTop" vertical />
        <NumberField propName="marginBottom" vertical />
        <NumberField propName="marginLeft" />
        <NumberField propName="marginRight" />

        <div className="relative p-10 m-8 rounded bg-secondary-bg">
          {/* padding controls compact (top/bottom/left/right) los puedes replicar si quieres el mismo estilo que arriba */}
          <span className="absolute top-1 left-2 text-xs font-medium text-gray-400">Padding</span>
          <div className="bg-primary-bg p-8 rounded text-center border border-secondary-bg min-h-[80px] flex flex-col justify-center">
            <div className="mb-1 text-xs font-medium text-gray-300">element</div>
          </div>
        </div>
        <span className="absolute top-1 left-2 text-xs font-medium text-gray-400">Margin</span>
      </div>
    </div>
  );
}
