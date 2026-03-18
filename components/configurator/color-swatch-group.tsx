"use client";

type ColorSwatchGroupProps = {
  label: string;
  colors: string[];
  value: string;
  onChange: (value: string) => void;
};

export function ColorSwatchGroup({
  label,
  colors,
  value,
  onChange,
}: ColorSwatchGroupProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">{label}</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const active = color === value;

          return (
            <button
              key={color}
              type="button"
              aria-label={`Chọn màu ${color}`}
              onClick={() => onChange(color)}
              className={`premium-card flex h-14 w-14 items-center justify-center rounded-2xl border transition ${
                active ? "scale-[1.04] border-[#f1d3af] ring-2 ring-[#f1d3af]/30" : "border-white/10"
              }`}
              style={{ backgroundColor: color }}
            >
              <span className="h-4 w-4 rounded-full border border-white/30 bg-white/20" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
