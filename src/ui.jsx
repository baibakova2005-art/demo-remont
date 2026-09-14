import { useEffect, useId, useRef, useState } from "react";

// Общие детали демо-сайтов: плашка «демо», шапка, секция, вопросы, форма, подвал.
// Цвета берутся из токенов темы в index.css (bg, surface, ink, muted, line, accent…),
// поэтому один и тот же код выглядит по-разному на каждом сайте.

const BASE = import.meta.env.BASE_URL;

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-[15px] font-semibold text-on-accent shadow-[var(--shadow-btn)] transition duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 disabled:opacity-60";
export const btnGhost =
  "inline-flex min-h-12 items-center justify-center rounded-[var(--radius-btn)] border border-line-strong px-6 py-3 text-[15px] font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink active:translate-y-0";

export function DemoBar() {
  return (
    <div className="bg-ink text-bg">
      <p className="mx-auto max-w-6xl px-5 py-2 text-center text-[13px] leading-snug">
        Демо-сайт для портфолио: компания вымышленная, цены и тексты — образец.{" "}
        <a
          href="https://www.fl.ru/users/baibakova2005/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2"
        >
          Разработка — Екатерина, FL.ru
        </a>
      </p>
    </div>
  );
}

export function Header({ brand, links, cta }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3">
        <a href={links.home ?? "#"} className="flex min-h-11 items-center">
          {brand}
        </a>

        <nav
          aria-label="Основное меню"
          className="hidden items-center gap-7 text-[15px] min-[900px]:flex"
        >
          {links.items.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.current ? "page" : undefined}
              className={`transition hover:text-ink ${l.current ? "font-semibold text-ink" : "text-muted"}`}
            >
              {l.label}
            </a>
          ))}
          {cta && (
            <a href={cta.href} className={`${btnPrimary} min-h-11 px-5 py-2`}>
              {cta.label}
            </a>
          )}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobilnoe-menyu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-ink transition hover:bg-soft min-[900px]:hidden"
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobilnoe-menyu"
        aria-label="Меню на телефоне"
        hidden={!open}
        className="h-[calc(100dvh-64px)] overflow-y-auto border-t border-line min-[900px]:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
          {links.items.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-4 text-lg text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {cta && (
          <div className="px-5 py-4">
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className={`${btnPrimary} w-full`}
            >
              {cta.label}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
  tone = "",
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-[clamp(64px,10vw,120px)] ${tone} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5">
        {(eyebrow || title) && (
          <div className="mb-[clamp(32px,5vw,56px)] max-w-[40rem]">
            {eyebrow && (
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-[clamp(1.9rem,1.2rem+2.6vw,3rem)] leading-[1.1] tracking-[-0.015em]">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-muted">
                {lead}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Faq({ items }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-lg transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 leading-relaxed text-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

const pole =
  "w-full rounded-[var(--radius-field)] border border-line-strong bg-surface px-4 py-3 text-base text-ink transition placeholder:text-muted/70 focus:border-accent focus:outline-2 focus:outline-offset-0 focus:outline-accent";

// fields: [{ name, label, type: text|tel|select|textarea|choice, required, options, placeholder, autoComplete }]
export function ZayavkaForm({ fields, button, note }) {
  const id = useId();
  const [status, setStatus] = useState("idle");

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.adres_dostavki) {
      setStatus("ok");
      return;
    }
    // Демо-сайт: приёмника нет, данные никуда не уходят и нигде не сохраняются.
    // На сайте клиента здесь отправка в почту или CRM на российском сервере (152-ФЗ).
    setStatus("demo");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const star = f.required ? (
          <span className="text-accent-text"> *</span>
        ) : null;
        if (f.type === "choice") {
          return (
            <fieldset key={f.name}>
              <legend className="mb-2 block text-sm font-semibold">
                {f.label}
                {star}
              </legend>
              <div className="flex flex-wrap gap-2">
                {f.options.map((o, i) => (
                  <label key={o} className="cursor-pointer">
                    <input
                      type="radio"
                      name={f.name}
                      value={o}
                      defaultChecked={i === 0}
                      className="peer sr-only"
                    />
                    <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-[15px] transition peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                      {o}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        }
        return (
          <div key={f.name}>
            <label htmlFor={fid} className="mb-2 block text-sm font-semibold">
              {f.label}
              {star}
            </label>
            {f.type === "select" ? (
              <select
                id={fid}
                name={f.name}
                required={f.required}
                className={pole}
                defaultValue=""
              >
                <option value="" disabled>
                  {f.placeholder ?? "Выберите"}
                </option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea
                id={fid}
                name={f.name}
                rows={3}
                placeholder={f.placeholder}
                className={`${pole} resize-y`}
              />
            ) : (
              <input
                id={fid}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                autoComplete={f.autoComplete}
                inputMode={f.type === "tel" ? "tel" : undefined}
                placeholder={f.placeholder}
                className={pole}
              />
            )}
          </div>
        );
      })}

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${id}-adres`}>Адрес доставки</label>
        <input
          id={`${id}-adres`}
          type="text"
          name="adres_dostavki"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Согласие: не предзаполнено, обязательно, ссылки вне label (иначе клик по ссылке снимает галочку). */}
      <div className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          id={`${id}-soglasie`}
          type="checkbox"
          name="soglasie"
          required
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-accent)]"
        />
        <p>
          <label htmlFor={`${id}-soglasie`} className="cursor-pointer">
            Даю согласие на обработку персональных данных.
          </label>{" "}
          <a
            href={`${BASE}consent/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-2"
          >
            Текст согласия
          </a>
          {" · "}
          <a
            href={`${BASE}privacy/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-2"
          >
            Политика
          </a>
        </p>
      </div>

      <div>
        <button type="submit" className={`${btnPrimary} w-full sm:w-auto`}>
          {button}
        </button>
        {note && <p className="mt-3 text-sm text-muted">{note}</p>}
      </div>

      <div role="status" aria-live="polite" className="text-[15px]">
        {status === "demo" && (
          <p className="rounded-[var(--radius-field)] border border-line-strong bg-soft px-4 py-3 text-ink">
            Это демо-сайт: заявка никуда не отправлена и не сохранена. На
            рабочем сайте здесь подключается почта или CRM.
          </p>
        )}
      </div>
    </form>
  );
}

export function Footer({ brand, about, contacts }) {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 text-[15px] md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          {brand}
          <p className="mt-4 leading-relaxed text-muted">{about}</p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Контакты</p>
          <ul className="space-y-2 text-muted">
            {contacts.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold">Документы</p>
          <ul className="space-y-2">
            <li>
              <a
                className="text-muted underline underline-offset-2 hover:text-ink"
                href={`${BASE}privacy/`}
              >
                Политика обработки данных
              </a>
            </li>
            <li>
              <a
                className="text-muted underline underline-offset-2 hover:text-ink"
                href={`${BASE}consent/`}
              >
                Согласие на обработку
              </a>
            </li>
            <li>
              <a
                className="text-muted underline underline-offset-2 hover:text-ink"
                href={`${BASE}terms/`}
              >
                Пользовательское соглашение
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[13px] text-muted">
          © 2026 · Демо-проект, реквизиты подставляются заказчиком
        </p>
      </div>
    </footer>
  );
}
