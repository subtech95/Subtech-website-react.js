const RED = "#C8102E";

type Stat = { num: string; suffix?: string; label: string };

const DEFAULT_STATS: Stat[] = [
  { num: "25", suffix: "+", label: "Years of Field Experience" },
  { num: "10", suffix: "k+", label: "Panels Installed Pan-India" },
  { num: "50", suffix: "+", label: "Industrial & Govt Clients" },
];

export default function BlogStatsBar({
  totalPosts,
}: {
  totalPosts: number;
}) {
  const stats: Stat[] = [
    ...DEFAULT_STATS,
    { num: String(totalPosts), suffix: "+", label: "In-Depth Articles" },
  ];

  return (
    <div className="bg-white border-b border-[#f5f5f5] py-8">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center px-6 relative ${
                i < stats.length - 1
                  ? "md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-10 md:after:w-px md:after:bg-[#d4d4d4]"
                  : ""
              }`}
            >
              <div className="text-[30px] font-bold text-[#111] leading-none mb-1.5">
                {s.num}
                {s.suffix && <span style={{ color: RED }}>{s.suffix}</span>}
              </div>
              <div className="text-[13px] text-[#6b6b6b]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
