"use client";

type SelectOption<T extends string> = {
  id: T;
  title: string;
  description: string;
  accent: string;
};

type MultiSelectGroupProps<T extends string> = {
  label: string;
  values: T[];
  options: SelectOption<T>[];
  onToggle: (value: T) => void;
};

export function MultiSelectGroup<T extends string>({
  label,
  values,
  options,
  onToggle,
}: MultiSelectGroupProps<T>) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">
          {label}
        </h3>
        <p className="text-xs text-stone-500">Chọn tối đa 3 phụ kiện để preview gọn đẹp</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = values.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`rounded-[26px] border p-4 text-left transition ${
                active
                  ? "border-[#e3bb8d] bg-[rgba(235,214,189,0.16)]"
                  : "border-white/8 bg-white/4 hover:border-white/15"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-11 w-11 rounded-2xl border border-white/10"
                  style={{ backgroundColor: option.accent }}
                />
                <div>
                  <p className="font-semibold text-stone-100">{option.title}</p>
                  <p className="text-sm leading-6 text-stone-400">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
