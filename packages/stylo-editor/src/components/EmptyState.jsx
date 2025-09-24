import { DotPattern } from '../../components/dot-parttern';
import LogoApp from '../LogoApp';
import { cn } from "../../utils/cn";

export default function EmptyState({ isInspectorMode, toggle }) {
  return (
    <>
      <div className="flex overflow-hidden absolute inset-0 flex-col justify-center items-center w-full h-full">
        <DotPattern glow useParentDimensions areaCircle={20}
          className={cn("[mask-image:radial-gradient(circle_at_center,white_0%,rgba(255,255,255,0.8)_30%,rgba(255,255,255,0.4)_60%,transparent_100%)]")}
        />
      </div>
      <div className="relative z-10 p-4 text-center text-gray-400">
        <div className="flex justify-center w-full">
          <LogoApp variant="white" size={42} className="w-[260px] h-[260px]" />
        </div>
        <p className="mb-2 text-sm">Click the inspector button and select any element to view its CSS properties.</p>
        <p className="text-xs">Inspector mode: {isInspectorMode ? 'ON' : 'OFF'}</p>
        <div className="flex justify-center mt-11">
          <button
            onClick={toggle}
            className={cn(
              "group relative cursor-pointer inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 ease-out",
              "bg-secondary-bg text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25",
              "transform hover:scale-105 active:scale-95 border border-white/20 hover:border-white/30"
            )}
          >
            <i className="ti ti-target mr-2 w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="relative z-10">
              {isInspectorMode ? 'Desactivar Inspector' : 'Activar Inspector'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r rounded-full opacity-0 blur-xl transition-opacity duration-300 from-purple-400/20 via-pink-400/20 to-red-400/20 group-hover:opacity-100 -z-10" />
          </button>
        </div>
      </div>
    </>
  );
}
