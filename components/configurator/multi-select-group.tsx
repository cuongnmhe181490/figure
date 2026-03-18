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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">{label}</h3>
        <p className="text-xs text-stone-500">Chọn tối đa 3 phụ kiện để bố cục luôn gọn và sang.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = values.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`premium-card rounded-[28px] border p-5 text-left transition ${
                active
                  ? "border-[#ead3b4]/40 bg-[rgba(235,214,189,0.16)] shadow-[0_16px_36px_rgba(226,191,149,0.10)]"
                  : "border-white/8 bg-white/4 hover:border-white/14 hover:bg-white/6"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className="h-11 w-11 shrink-0 rounded-2xl border border-white/10"
                  style={{ backgroundColor: option.accent }}
                />
                <div>
                  <p className="font-semibold text-stone-100">{option.title}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-400">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
