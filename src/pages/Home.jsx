import { useState } from "react";
import Layout, { BASE } from "../Layout.jsx";
import { Section, btnPrimary, btnGhost } from "../ui.jsx";
import Plan from "../Plan.jsx";
import { TARIFY, RABOTY, rub, fmt } from "../data.js";

const DOP = [
  { id: "demontazh", label: "Демонтаж старой отделки", perM2: 900 },
  { id: "elektrika", label: "Полная замена электрики", perM2: 1200 },
  { id: "potolki", label: "Натяжные потолки", perM2: 850 },
];

function Kalkulyator() {
  const [area, setArea] = useState(50);
  const [tarif, setTarif] = useState("kap");
  const [dop, setDop] = useState(["demontazh"]);
  const t = TARIFY.find((x) => x.id === tarif);
  const perM2 =
    t.price +
    DOP.filter((d) => dop.includes(d.id)).reduce((s, d) => s + d.perM2, 0);
  const total = perM2 * area;
  const weeks = Math.max(2, Math.round((area / 10) * t.weeksPer10m));

  const toggle = (id) =>
    setDop((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  return (
    <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)] lg:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col gap-8 p-[clamp(20px,4vw,40px)]">
        <div>
          <label
            htmlFor="ploshchad"
            className="flex items-baseline justify-between text-sm font-semibold"
          >
            Площадь квартиры
            <span className="text-2xl font-bold tabular-nums">{area} м²</span>
          </label>
          <input
            id="ploshchad"
            type="range"
            min="20"
            max="150"
            step="1"
            value={area}
            onChange={(e) => setArea(+e.target.value)}
            className="mt-4 h-2 w-full cursor-pointer"
          />
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>20 м²</span>
            <span>150 м²</span>
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Вид ремонта</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {TARIFY.map((x) => (
              <label key={x.id} className="cursor-pointer">
                <input
                  type="radio"
                  name="tarif"
                  value={x.id}
                  checked={tarif === x.id}
                  onChange={() => setTarif(x.id)}
                  className="peer sr-only"
                />
                <span className="flex h-full flex-col rounded-[var(--radius-field)] border border-line-strong px-4 py-3 transition peer-checked:border-accent peer-checked:bg-soft peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                  <span className="font-semibold">{x.name}</span>
                  <span className="text-sm text-muted">
                    от {fmt(x.price)}/м²
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Дополнительно</legend>
          <div className="flex flex-col gap-2">
            {DOP.map((d) => (
              <label
                key={d.id}
                className="flex min-h-11 cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={dop.includes(d.id)}
                  onChange={() => toggle(d.id)}
                  className="size-5 shrink-0 accent-[var(--color-accent)]"
                />
                <span className="flex-1">{d.label}</span>
                <span className="text-sm text-muted tabular-nums">
                  +{fmt(d.perM2)}/м²
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-between gap-6 bg-dark p-[clamp(20px,4vw,40px)] text-white">
        <div>
          <p className="text-sm text-white/70">
            Ориентировочная стоимость работ
          </p>
          <p
            className="mt-2 text-[clamp(2.2rem,1.6rem+2vw,3.2rem)] font-bold leading-none tabular-nums"
            aria-live="polite"
          >
            {rub(total * 0.95)} – {rub(total * 1.08)}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 text-sm">
            <div>
              <dt className="text-white/70">За м² с опциями</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums">
                {fmt(perM2)}
              </dd>
            </div>
            <div>
              <dt className="text-white/70">Срок</dt>
              <dd className="mt-1 text-lg font-semibold">около {weeks} нед.</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            Без стоимости материалов. Точную смету составим после бесплатного
            замера и закрепим в договоре.
          </p>
        </div>
        <a href={`${BASE}kontakty/#zayavka`} className={`${btnPrimary} w-full`}>
          Получить точную смету
        </a>
      </div>
    </div>
  );
}

function HeroArt() {
  return (
    <svg
      viewBox="0 0 460 400"
      className="h-auto w-full"
      role="img"
      aria-labelledby="h-art"
    >
      <title id="h-art">План квартиры с отмеченными зонами работ</title>
      <rect x="0" y="0" width="460" height="400" rx="12" fill="#ffffff" />
      <g stroke="#e2ded4" strokeWidth="1">
        {Array.from({ length: 22 }, (_, i) => (
          <path key={`v${i}`} d={`M${20 + i * 20} 20V380`} />
        ))}
        {Array.from({ length: 19 }, (_, i) => (
          <path key={`h${i}`} d={`M20 ${20 + i * 20}H440`} />
        ))}
      </g>
      <rect
        x="60"
        y="60"
        width="160"
        height="140"
        fill="#c2410c"
        opacity="0.14"
      />
      <rect
        x="260"
        y="220"
        width="140"
        height="120"
        fill="#c2410c"
        opacity="0.08"
      />
      <g fill="none" stroke="#1b1a17" strokeWidth="6" strokeLinecap="square">
        <path d="M60 60h340v280H60z" />
        <path d="M220 60v100" />
        <path d="M60 200h120" />
        <path d="M260 200h140" />
        <path d="M260 200v80" />
      </g>
      <path
        d="M180 200a40 40 0 0 1 40-40"
        fill="none"
        stroke="#c2410c"
        strokeWidth="2.5"
      />
      <g fontFamily="Onest Variable, sans-serif" fontSize="14" fill="#1b1a17">
        <text x="76" y="92" fontWeight="700">
          Кухня 14 м²
        </text>
        <text x="276" y="252" fontWeight="700">
          Спальня 12 м²
        </text>
        <text x="76" y="236">
          Санузел 4 м²
        </text>
      </g>
      <g fontFamily="Onest Variable, sans-serif" fontSize="13" fill="#5e5a52">
        <path d="M60 366h340" stroke="#5e5a52" strokeWidth="1.5" />
        <path d="M60 360v12M400 360v12" stroke="#5e5a52" strokeWidth="1.5" />
        <text x="210" y="360" textAnchor="middle">
          8 400 мм
        </text>
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <Layout page="home">
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-[clamp(48px,8vw,96px)] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-soft px-4 py-1.5 text-sm font-semibold text-accent-text">
              Ремонт квартир в Москве и ближнем Подмосковье
            </p>
            <h1 className="text-[clamp(2.4rem,1.3rem+4vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              Ремонт под ключ по смете, которая не растёт в процессе
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-relaxed text-muted">
              Считаем стоимость после замера и фиксируем её в договоре. Платите
              по этапам — только за уже принятую работу.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#kalkulyator" className={btnPrimary}>
                Рассчитать стоимость
              </a>
              <a href={`${BASE}raboty/`} className={btnGhost}>
                Посмотреть работы
              </a>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <div className="bg-dark text-white">
        <ul className="mx-auto grid max-w-6xl gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Смета в договоре", "цена работ не меняется"],
            ["Оплата по этапам", "5 этапов, без 100% предоплаты"],
            ["Гарантия 3 года", "на все виды работ"],
            ["Фотоотчёт", "каждый рабочий день в мессенджер"],
          ].map(([h, t]) => (
            <li key={h} className="bg-dark px-5 py-6">
              <p className="text-lg font-bold">{h}</p>
              <p className="mt-1 text-sm text-white/70">{t}</p>
            </li>
          ))}
        </ul>
      </div>

      <Section
        id="kalkulyator"
        eyebrow="Калькулятор"
        title="Сколько стоит ремонт вашей квартиры"
        lead="Передвиньте ползунок и выберите вид ремонта. Расчёт ориентировочный, точная цифра — после замера."
      >
        <Kalkulyator />
      </Section>

      <Section
        tone="bg-surface border-y border-line"
        eyebrow="Как работаем"
        title="Пять этапов, и за каждый вы платите после приёмки"
      >
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-5">
          {[
            [
              "Замер и смета",
              "Бесплатно. Замерщик приезжает в удобное время, смета — через 2 дня.",
            ],
            ["Договор", "Фиксируем стоимость работ, сроки и график оплаты."],
            [
              "Черновые работы",
              "Демонтаж, электрика, сантехника, стяжка. Оплата после приёмки.",
            ],
            [
              "Чистовая отделка",
              "Стены, полы, плитка, двери. Оплата после приёмки.",
            ],
            ["Сдача", "Уборка, акт, гарантийный талон на 3 года."],
          ].map(([h, t], i) => (
            <li key={h} className="bg-surface p-6">
              <span className="text-sm font-bold text-accent-text">
                Этап {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-bold">{h}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Работы" title="Недавние объекты">
        <div className="grid gap-5 md:grid-cols-3">
          {RABOTY.slice(0, 3).map((r) => (
            <article
              key={r.id}
              className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
            >
              <Plan kind={r.plan} label={`Схема планировки: ${r.title}`} />
              <div className="p-5">
                <h3 className="text-lg font-bold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {r.area} м² · {r.weeks} недель · {r.budget}
                </p>
              </div>
            </article>
          ))}
        </div>
        <a href={`${BASE}raboty/`} className={`${btnGhost} mt-8`}>
          Все работы
        </a>
      </Section>

      <section className="bg-accent text-on-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="text-[clamp(1.8rem,1.2rem+2vw,2.6rem)] font-bold leading-tight">
              Замер и смета — бесплатно
            </h2>
            <p className="mt-2 text-white/90">
              Приедем в течение 2 дней, смета через 2 дня после замера.
            </p>
          </div>
          <a
            href={`${BASE}kontakty/#zayavka`}
            className="inline-flex min-h-12 items-center rounded-[var(--radius-btn)] bg-white px-7 font-semibold text-ink transition hover:-translate-y-0.5"
          >
            Вызвать замерщика
          </a>
        </div>
      </section>
    </Layout>
  );
}
