import { Globe } from "@/components/ui/globe";
import OrbitingBadges from "@/components/OrbitingBadges";

const GlobeWithAwardBadges = () => (
  <div className="relative w-full max-w-[6000px] aspect-square mx-auto">
    <Globe />
    <OrbitingBadges />
  </div>
);

export default GlobeWithAwardBadges;
