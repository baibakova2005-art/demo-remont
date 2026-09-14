import { useState } from "react";
import Layout, { BASE, PageHead } from "../Layout.jsx";
import { Section, btnPrimary } from "../ui.jsx";
import Plan from "../Plan.jsx";
import { TARIFY, RABOTY } from "../data.js";

const FILTRY = [
  { id: "all", name: "Все" },
  ...TARIFY.map((t) => ({ id: t.id, name: t.name })),
];

export default function Raboty() {
  const [f, setF] = useState("all");
  const list = f === "all" ? RABOTY : RABOTY.filter((r) => r.type === f);

  return (
    <Layout page="raboty">
      <PageHead
        eyebrow="Работы"
        title="Завершённые объекты: площадь, срок и бюджет"
        lead="Для демо вместо фотографий — схемы планировок. На сайте клиента здесь фото «до» и «после» с каждого объекта."
      />

      <Section>
        <div
          role="group"
          aria-label="Фильтр по виду ремонта"
          className="mb-8 flex flex-wrap gap-2"
        >
          {FILTRY.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={f === x.id}
              onClick={() => setF(x.id)}
              className={`min-h-11 rounded-full border px-5 text-[15px] font-semibold transition ${f === x.id ? "border-ink bg-ink text-bg" : "border-line-strong bg-surface text-ink hover:border-ink"}`}
            >
              {x.name}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Показано объектов: {list.length}
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <article
              key={r.id}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface"
            >
              <Plan kind={r.plan} label={`Схема планировки: ${r.title}`} />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold text-accent-text">
                  {TARIFY.find((t) => t.id === r.type).name} ремонт
                </p>
                <h2 className="mt-1 text-xl font-bold">{r.title}</h2>
                <p className="mt-1 text-sm text-muted">м. {r.place}</p>
                <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-5 text-sm">
                  <div>
                    <dt className="text-muted">Площадь</dt>
                    <dd className="mt-1 font-bold">{r.area} м²</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Срок</dt>
                    <dd className="mt-1 font-bold">{r.weeks} нед.</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Работы</dt>
                    <dd className="mt-1 font-bold whitespace-nowrap">
                      {r.budget.replace(" 000 ₽", " тыс.")}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[46ch] text-lg">
            Похожая квартира? Назовите площадь и адрес — скажем, во сколько
            обойдётся ремонт.
          </p>
          <a href={`${BASE}kontakty/#zayavka`} className={btnPrimary}>
            Узнать стоимость
          </a>
        </div>
      </Section>
    </Layout>
  );
}
