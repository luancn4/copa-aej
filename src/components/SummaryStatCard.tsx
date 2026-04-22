type SummaryStatCardProps = {
  label: string;
  value: number;
  color: "green" | "red" | "orange";
  className?: string;
};

const toneMap = {
  green: "text-[#27AE60]",
  red: "text-[#EB5757]",
  orange: "text-[#F2994A]",
};

export function SummaryStatCard({
  label,
  value,
  color,
  className = "",
}: SummaryStatCardProps) {
  return (
    <div className={`card-surface flex h-20 min-w-40 flex-col justify-center p-4 ${className}`.trim()}>
      <span className="text-xs font-medium text-[#6B7280]">{label}</span>
      <span className={`text-[28px] font-bold leading-none ${toneMap[color]}`}>
        {value}
      </span>
    </div>
  );
}
