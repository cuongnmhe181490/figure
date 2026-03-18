"use client";

type Option<T extends string> = {
  id: T;
  title: string;
  description: string;
  accent?: string;
  meta?: string;
};

type OptionCardGroupProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export function OptionCardGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: OptionCardGroupProps<T>) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">{label}</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = option.id === value;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`premium-card rounded-[28px] border p-5 text-left transition ${
                active
                  ? "border-[#ead3b4]/40 bg-[rgba(235,214,189,0.16)] shadow-[0_18px_45px_rgba(226,191,149,0.10)]"
                  : "border-white/8 bg-white/4 hover:border-white/14 hover:bg-white/6"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-stone-100">{option.title}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{option.description}</p>
                </div>
                {option.accent ? (
                  <span
                    className="mt-1 h-4 w-4 shrink-0 rounded-full border border-white/20"
                    style={{ backgroundColor: option.accent }}
                  />
                ) : null}
              </div>

              {option.meta ? (
                <p className="mt-4 text-xs tracking-[0.16em] text-stone-500 uppercase">{option.meta}</p>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
