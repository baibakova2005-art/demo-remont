import { DemoBar, Header, Footer } from "./ui.jsx";

export const BASE = import.meta.env.BASE_URL;

export const Logo = () => (
  <span className="flex items-center gap-2.5">
    <svg viewBox="0 0 64 64" className="size-8" aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="#1b1a17" />
      <path d="M16 48V16h10v22h22v10z" fill="#c2410c" />
    </svg>
    <span className="text-lg font-bold tracking-tight">Ровный угол</span>
  </span>
);

const PAGES = [
  { key: "uslugi", href: `${BASE}uslugi/`, label: "Услуги и цены" },
  { key: "raboty", href: `${BASE}raboty/`, label: "Работы" },
  { key: "kontakty", href: `${BASE}kontakty/`, label: "Контакты" },
];

export default function Layout({ page, children }) {
  const links = {
    home: BASE,
    items: [
      { href: BASE, label: "Главная", current: page === "home" },
      ...PAGES.map((p) => ({ ...p, current: p.key === page })),
    ],
  };
  return (
    <>
      <DemoBar />
      <Header
        brand={<Logo />}
        links={links}
        cta={{ href: `${BASE}kontakty/#zayavka`, label: "Вызвать замерщика" }}
      />
      <main>{children}</main>
      <Footer
        brand={<Logo />}
        about="Ремонт квартир под ключ в Москве и ближнем Подмосковье. Фиксированная смета, оплата по этапам, гарантия 3 года."
        contacts={[
          "+7 900 000-00-00 (демо)",
          "Ежедневно 9:00–20:00",
          "Москва и ближнее Подмосковье",
        ]}
      />
    </>
  );
}

export function PageHead({ eyebrow, title, lead }) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-[clamp(48px,8vw,88px)]">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-text">
          {eyebrow}
        </p>
        <h1 className="max-w-[20ch] text-[clamp(2.2rem,1.3rem+3.4vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.025em]">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-[58ch] text-[18px] leading-relaxed text-muted">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

export function mount(el) {
  return el;
}
