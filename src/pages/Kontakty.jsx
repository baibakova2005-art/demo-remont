import Layout, { PageHead } from "../Layout.jsx";
import { Section, ZayavkaForm } from "../ui.jsx";

function MapArt() {
  return (
    <svg
      viewBox="0 0 400 260"
      className="h-auto w-full"
      role="img"
      aria-labelledby="map-t"
    >
      <title id="map-t">Схема зоны выезда: Москва и ближнее Подмосковье</title>
      <rect width="400" height="260" fill="#f4f2ed" />
      <circle cx="200" cy="130" r="118" fill="#c2410c" opacity="0.08" />
      <circle
        cx="200"
        cy="130"
        r="80"
        fill="none"
        stroke="#1b1a17"
        strokeWidth="3"
      />
      <circle
        cx="200"
        cy="130"
        r="44"
        fill="none"
        stroke="#bdb6a8"
        strokeWidth="2"
      />
      <circle
        cx="200"
        cy="130"
        r="118"
        fill="none"
        stroke="#c2410c"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <circle cx="200" cy="130" r="7" fill="#c2410c" />
      <g fontFamily="Onest Variable, sans-serif" fontSize="13" fill="#1b1a17">
        <text x="200" y="40" textAnchor="middle" fontWeight="700">
          МКАД
        </text>
        <text x="330" y="236" textAnchor="middle">
          до 15 км за МКАД
        </text>
      </g>
    </svg>
  );
}

export default function Kontakty() {
  return (
    <Layout page="kontakty">
      <PageHead
        eyebrow="Контакты"
        title="Вызовите замерщика — это бесплатно"
        lead="Приедем в течение двух дней в удобное время, в том числе в выходные."
      />

      <Section id="zayavka">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <dl className="grid gap-6 sm:grid-cols-2">
              {[
                ["Телефон", "+7 900 000-00-00 (демо)"],
                ["Часы работы", "Ежедневно, 9:00–20:00"],
                ["Зона выезда", "Москва и до 15 км за МКАД"],
                ["Офис", "Адрес в демо не указан"],
              ].map(([k, v]) => (
                <div key={k} className="border-t-2 border-ink pt-4">
                  <dt className="text-sm font-semibold">{k}</dt>
                  <dd className="mt-1 text-lg">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line">
              <MapArt />
            </div>
          </div>

          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-[clamp(20px,4vw,40px)] shadow-[var(--shadow-card)]">
            <h2 className="text-2xl font-bold">Заявка на замер</h2>
            <p className="mb-7 mt-2 text-muted">
              Перезвоним в течение часа и согласуем время.
            </p>
            <ZayavkaForm
              button="Вызвать замерщика"
              note="Замер ни к чему не обязывает"
              fields={[
                {
                  name: "imya",
                  label: "Имя",
                  required: true,
                  autoComplete: "name",
                  placeholder: "Как к вам обращаться",
                },
                {
                  name: "telefon",
                  label: "Телефон",
                  type: "tel",
                  required: true,
                  autoComplete: "tel",
                  placeholder: "+7 900 000-00-00",
                },
                {
                  name: "tip",
                  label: "Вид ремонта",
                  type: "select",
                  options: [
                    "Косметический",
                    "Капитальный",
                    "По дизайн-проекту",
                    "Пока не знаю",
                  ],
                  placeholder: "Выберите",
                },
                {
                  name: "ploshchad",
                  label: "Площадь, м²",
                  type: "text",
                  placeholder: "Например, 54",
                },
              ]}
            />
          </div>
        </div>
      </Section>
    </Layout>
  );
}
