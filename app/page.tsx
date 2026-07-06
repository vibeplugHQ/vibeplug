import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { Marketplace } from "@/components/marketplace";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { Stats } from "@/components/stats";
import { Pricing } from "@/components/pricing";
import { CTA } from "@/components/cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LogoMarquee />
        <Marketplace />
        <HowItWorks />
        <Features />
        <Stats />
        <Pricing />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
