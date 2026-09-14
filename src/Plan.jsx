// Схематичные планировки вместо фотографий: одна толщина линий, прямые углы.
const PLANS = {
  studio: ["M20 20h260v160H20z", "M180 20v70", "M20 110h100", "M180 130h100"],
  one: [
    "M20 20h260v160H20z",
    "M150 20v100",
    "M20 120h180",
    "M200 120v60",
    "M150 70h130",
  ],
  two: [
    "M20 20h260v160H20z",
    "M120 20v110",
    "M200 20v90",
    "M20 130h140",
    "M200 110h80",
    "M160 130v50",
  ],
  three: [
    "M20 20h260v160H20z",
    "M100 20v90",
    "M190 20v90",
    "M20 110h260",
    "M140 110v70",
    "M220 110v70",
  ],
};

export default function Plan({ kind = "two", label }) {
  return (
    <svg
      viewBox="0 0 300 200"
      className="h-auto w-full"
      role="img"
      aria-label={label}
    >
      <rect x="0" y="0" width="300" height="200" fill="#f4f2ed" />
      <g fill="none" stroke="#1b1a17" strokeWidth="4" strokeLinecap="square">
        {PLANS[kind].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <rect
        x="24"
        y="24"
        width="60"
        height="40"
        fill="#c2410c"
        opacity="0.18"
      />
      <path
        d="M200 180v-22a22 22 0 0 1 22 22"
        fill="none"
        stroke="#c2410c"
        strokeWidth="2"
      />
    </svg>
  );
}
