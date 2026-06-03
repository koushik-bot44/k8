import StatsCounter from "@/components/StatsCounter";
import { studioInfo } from "@/lib/team";

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="relative px-6 py-20 md:px-12 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #080808 0%, rgba(209,107,40,0.04) 50%, #080808 100%)",
        zIndex: 10,
      }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="ornament-line mb-14 w-full" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <StatsCounter
            end={studioInfo.stats.projects}
            suffix="+"
            label="Projects Completed"
          />
          <StatsCounter
            end={studioInfo.stats.yearsExperience}
            suffix="+"
            label="Years of Practice"
          />
          <StatsCounter end={studioInfo.stats.teamSize} label="Team Members" />
          <StatsCounter
            end={studioInfo.stats.followers}
            suffix="+"
            label="Community"
          />
        </div>
        <div className="ornament-line mt-14 w-full" />
      </div>
    </section>
  );
}
