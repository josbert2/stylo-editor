import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function PositionTransform({
  selectedElement,
  editableValues,
  setEditableValues
}) {
  const setRotate = (value) => {
    setEditableValues((prev) => ({ ...prev, rotate: { ...prev.rotate, value } }));
    if (selectedElement) selectedElement.style.setProperty('transform', `rotate(${value}${editableValues.rotate.unit})`, 'important');
  };
  const setRotateUnit = (unit) => {
    setEditableValues((prev) => ({ ...prev, rotate: { ...prev.rotate, unit } }));
    if (selectedElement) selectedElement.style.setProperty('transform', `rotate(${editableValues.rotate.value}${unit})`, 'important');
  };

  const setWH = (key, value) => {
    setEditableValues((prev) => ({ ...prev, [key]: { ...prev[key], value } }));
    if (selectedElement) {
      const v = value === 'auto' ? 'auto' : `${value}${editableValues[key].unit}`;
      selectedElement.style[key] = v;
    }
  };
  const setWHUnit = (key, unit) => {
    setEditableValues((prev) => ({ ...prev, [key]: { ...prev[key], unit } }));
    if (selectedElement && editableValues[key].value !== 'auto') {
      selectedElement.style[key] = `${editableValues[key].value}${unit}`;
    }
  };

  return (
    <div className="p-3 space-y-3 rounded-lg bg-secondary-bg">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center"><span className="text-gray-400">X</span><span className="ml-1 text-gray-500">{selectedElement ? Math.round(selectedElement.getBoundingClientRect().left) : 0}</span></div>
        <div className="flex items-center"><span className="text-gray-400">Y</span><span className="ml-1 text-gray-500">{selectedElement ? Math.round(selectedElement.getBoundingClientRect().top) : 0}</span></div>

        <div className="flex items-center">
          <label className="mr-2 text-gray-400">↻</label>
          <div className="flex relative rounded-lg border-2 border-secondary-bg">
            <input
              type="text"
              value={editableValues.rotate.value}
              onChange={(e) => setRotate(e.target.value)}
              className="flex-1 px-2 py-1 w-full text-xs text-white bg-transparent outline-none"
              placeholder="0"
            />
            <Select value={editableValues.rotate.unit} onValueChange={setRotateUnit}>
              <SelectTrigger className="w-[60px] bg-none text-white px-2 py-1 rounded-r text-xs border-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-primary-bg border-secondary-bg">
                <SelectItem value="deg">deg</SelectItem>
                <SelectItem value="rad">rad</SelectItem>
                <SelectItem value="grad">grad</SelectItem>
                <SelectItem value="turn">turn</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        {['width','height','borderRadius'].map((k) => (
          <div key={k} className="space-y-1">
            <label className="text-gray-400">{k === 'width' ? 'W' : k === 'height' ? 'H' : 'R'}</label>
            <div className="flex relative rounded-lg border-2 border-secondary-bg">
              <input
                type="text"
                value={editableValues[k].value}
                onChange={(e) => setWH(k, e.target.value)}
                className="flex-1 px-2 py-1 w-full text-xs text-white bg-none border-none focus:outline-none"
                placeholder={k === 'borderRadius' ? '0' : 'auto'}
              />
              <Select value={editableValues[k].unit} onValueChange={(u) => setWHUnit(k, u)}>
                <SelectTrigger className="w-[60px] bg-none text-white px-2 py-1 rounded-r text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-primary-bg border-secondary-bg">
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="%">%</SelectItem>
                  <SelectItem value="em">em</SelectItem>
                  <SelectItem value="rem">rem</SelectItem>
                  {k !== 'borderRadius' && (<><SelectItem value="vw">vw</SelectItem><SelectItem value="vh">vh</SelectItem><SelectItem value="auto">auto</SelectItem></>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
