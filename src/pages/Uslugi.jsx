import Layout, { BASE, PageHead } from "../Layout.jsx";
import { Section, Faq, btnPrimary } from "../ui.jsx";
import { TARIFY, fmt } from "../data.js";

const DOP = [
  ["Демонтаж старой отделки", "от 900 ₽/м²"],
  ["Полная замена электрики", "от 1 200 ₽/м²"],
  ["Натяжные потолки", "от 850 ₽/м²"],
  ["Укладка плитки", "от 1 900 ₽/м²"],
  ["Установка сантехники", "от 2 500 ₽/точка"],
  ["Вывоз мусора", "от 7 000 ₽/машина"],
];

export default function Uslugi() {
  return (
    <Layout page="uslugi">
      <PageHead
        eyebrow="Услуги и цены"
        title="Три вида ремонта и цена за квадратный метр"
        lead="Цены — за работы, без материалов. Материалы закупаем по вашему выбору или по нашему списку с чеками."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          {TARIFY.map((t) => (
            <article
              key={t.id}
              className={`flex flex-col rounded-[var(--radius-card)] border bg-surface p-7 ${t.hit ? "border-accent shadow-[var(--shadow-card)]" : "border-line"}`}
            >
              {t.hit && (
                <p className="mb-3 w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold text-on-accent">
                  Заказывают чаще всего
                </p>
              )}
              <h2 className="text-2xl font-bold">{t.name}</h2>
              <p className="mt-1 text-[15px] text-muted">{t.for}</p>
              <p className="mt-6 text-4xl font-bold tabular-nums">
                от {fmt(t.price)}
                <span className="text-lg font-semibold text-muted">/м²</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {t.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-0.5 size-5 shrink-0 text-accent-text"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10.5l4 4 8-9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="bg-surface border-y border-line"
        eyebrow="Отдельные работы"
        title="Можно заказать без ремонта под ключ"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink text-sm">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Работа
                </th>
                <th scope="col" className="py-3 font-semibold">
                  Стоимость
                </th>
              </tr>
            </thead>
            <tbody>
              {DOP.map(([w, p]) => (
                <tr key={w} className="border-b border-line">
                  <td className="py-4 pr-4">{w}</td>
                  <td className="py-4 font-semibold whitespace-nowrap tabular-nums">
                    {p}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Вопросы о цене" title="Почему смета не вырастет">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Faq
            items={[
              {
                q: "Что если при демонтаже найдутся скрытые проблемы?",
                a: "Такие риски мы описываем в смете заранее отдельной строкой с ценой. Если проблема не найдётся, вы эти деньги не платите.",
              },
              {
                q: "Можно ли покупать материалы самостоятельно?",
                a: "Да. Мы дадим список с количеством, чтобы не переплачивать за лишнее и не ждать докупки.",
              },
              {
                q: "Как проходит оплата?",
                a: "Пять платежей по этапам. Каждый этап вы принимаете по чек-листу и только потом оплачиваете.",
              },
            ]}
          />
          <div className="rounded-[var(--radius-card)] bg-dark p-8 text-white">
            <h3 className="text-2xl font-bold">Посчитаем вашу квартиру</h3>
            <p className="mt-3 text-white/75">
              Замерщик приедет бесплатно и составит смету за 2 дня.
            </p>
            <a
              href={`${BASE}kontakty/#zayavka`}
              className={`${btnPrimary} mt-6 w-full`}
            >
              Вызвать замерщика
            </a>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
