import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"
import { IconBackground, IconBorderSides, IconCarouselVertical, IconTiltShift, IconBoxPadding, IconWashDryShade, IconStackFront, IconSquareRounded } from '@tabler/icons-react';
import Typography from '../../components/Typography/Typography';
import Background from '../../components/Background/Background';
import Filters from '../../components/Filters/Filters';
import Shadows from '../../components/Shadows/Shadows';
import BoxShadows from '../../components/BoxShadows/BoxShadows';
import Positioning from '../../components/Positioning/Positioning';
import Border from '../../components/Border/Border';
import Display from '../../components/Display/Display';

export default function Sections({
  typographyValues, setTypographyValues, handleTypographyChange, handleFontSizeChange, handleFontSizeUnitChange,
  backgroundValues, handleBackgroundChange,
  filtersValues, handleFiltersChange,
  shadowsValues, handleShadowsChange,
  boxShadow, handleBoxShadowChange,
  positioning, handlePositioningChange,
  borderValues, handleBorderChange,
  displayValues, handleDisplayChange
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem className='border-b-2 border-secondary-bg' value="item-1">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconBackground stroke={2} size={21} />Typography</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <Typography values={typographyValues} onChange={handleTypographyChange} onFontSizeChange={handleFontSizeChange} onFontSizeUnitChange={handleFontSizeUnitChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className='border-b-2 border-secondary-bg' value="item-2">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconSquareRounded stroke={2} size={21} />Background</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <Background value={backgroundValues} onChange={handleBackgroundChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className='border-b-2 border-secondary-bg' value="item-3">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconTiltShift stroke={2} size={21}/>Filters</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <Filters values={filtersValues} onChange={handleFiltersChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className='border-b-2 border-secondary-bg' value="item-4">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconBoxPadding stroke={2} size={21}/>Text shadow</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <Shadows values={shadowsValues} onChange={handleShadowsChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className='border-b-2 border-secondary-bg' value="item-5">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconWashDryShade stroke={2} size={21}/>Box shadow</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <BoxShadows value={boxShadow} onChange={handleBoxShadowChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className='border-b-2 border-secondary-bg' value="item-6">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconStackFront stroke={2} size={21}/>Positioning</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <Positioning values={positioning} onChange={handlePositioningChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className='border-b-2 border-secondary-bg' value="item-7">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconBorderSides stroke={2} size={21}/>Border</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <Border values={borderValues} onChange={handleBorderChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className='border-b-2 border-secondary-bg' value="item-8">
        <AccordionTrigger className='px-3 mb-2 cursor-pointer hover:bg-secondary-bg text-[#b1b1b1] flex text-left justify-normal mt-2'><IconCarouselVertical stroke={2} size={21}/>Display</AccordionTrigger>
        <AccordionContent className='px-2 py-2'>
          <Display values={displayValues} onChange={handleDisplayChange} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
