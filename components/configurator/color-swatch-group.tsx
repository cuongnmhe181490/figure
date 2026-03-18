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
      <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">
        {label}
      </h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const active = color === value;
          return (
            <button
              key={color}
              type="button"
              aria-label={`Chọn màu ${color}`}
              onClick={() => onChange(color)}
              className={`h-12 w-12 rounded-2xl border transition ${
                active ? "scale-105 border-[#f1d3af] ring-2 ring-[#f1d3af]/40" : "border-white/10"
              }`}
              style={{ backgroundColor: color }}
            />
          );
        })}
      </div>
    </section>
  );
}
