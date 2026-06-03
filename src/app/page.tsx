"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Loader from "@/components/Loader";
import Overlays from "@/components/experience/Overlays";
import ProgressBar from "@/components/experience/ProgressBar";
import RoomLabel from "@/components/experience/RoomLabel";
import ExperienceGallery from "@/components/experience/ExperienceGallery";
import TopNav from "@/components/nav/TopNav";
import SectionDots from "@/components/nav/SectionDots";
import AboutSection from "@/components/sections/AboutSection";
import FoundersSection from "@/components/sections/FoundersSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import InstagramSection from "@/components/sections/InstagramSection";
import StatsSection from "@/components/sections/StatsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/sections/SiteFooter";
import ServiceModal from "@/components/ui/ServiceModal";

import { useLoaderDone } from "@/hooks/useLoaderDone";
import { useExperienceScroll } from "@/hooks/useExperienceScroll";
import { SECTIONS } from "@/lib/experience";

const HouseScene = dynamic(() => import("@/components/HouseScene"), {
  ssr: false,
});

export default function HomePage() {
  const loaderDone = useLoaderDone();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const {
    wrapperRef,
    trackRef,
    progressBarRef,
    progressRef,
    activeSection,
    isDesktop,
    scrollToSection,
  } = useExperienceScroll({
    sectionCount: SECTIONS.length,
    enabled: loaderDone,
  });

  return (
    <>
      <Loader />

      {/* 3D architectural walkthrough background */}
      <HouseScene progressRef={progressRef} />

      {/* Cinematic gradients, vignette, blueprint grid */}
      <Overlays />

      {/* Fixed chrome */}
      <TopNav
        sections={SECTIONS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <SectionDots
        sections={SECTIONS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <RoomLabel room={SECTIONS[activeSection]?.room} />
      <ProgressBar barRef={progressBarRef} />

      {/* Horizontal (desktop) / vertical (mobile) room walkthrough */}
      <ExperienceGallery
        wrapperRef={wrapperRef}
        trackRef={trackRef}
        isDesktop={isDesktop}
        onOpenService={setSelectedService}
      />

      {/* Vertical continuation */}
      <AboutSection />
      <FoundersSection />
      <ProjectsSection />
      <ProcessSection />
      <InstagramSection />
      <StatsSection />
      <ServicesSection onOpenService={setSelectedService} />
      <ContactSection />
      <SiteFooter />

      <ServiceModal
        index={selectedService}
        onClose={() => setSelectedService(null)}
        onSelect={setSelectedService}
      />
    </>
  );
}
