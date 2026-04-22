import Link from "next/link";

type AppLogoProps = {
  compact?: boolean;
};

export function AppLogo({ compact = false }: AppLogoProps) {
  const markSize = compact ? "h-10 w-10 text-sm" : "h-20 w-20 text-2xl";
  const titleClass = compact ? "text-xl font-bold text-white" : "text-4xl font-bold text-white";
  const subtitleClass = compact
    ? "text-xs font-medium uppercase tracking-[0.3em] text-[#F2C94C]"
    : "text-sm font-medium uppercase tracking-[0.4em] text-[#F2C94C]";

  return (
    <Link href="/albums" className="inline-flex items-center gap-3">
      <div
        className={`flex ${markSize} items-center justify-center rounded-2xl border border-white/15 bg-white/10 font-bold text-white shadow-[0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-sm`}
      >
        AEJ
      </div>
      <div className="flex flex-col">
        <span className={titleClass}>COPA AEJ</span>
        <span className={subtitleClass}>Album Tracker</span>
      </div>
    </Link>
  );
}
