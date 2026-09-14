import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  HeartPulse,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Jack M. Harless | Chiropractic Care in Centerville" },
      {
        name: "description",
        content:
          "Dr. Jack M. Harless, BS, DC, is a third-generation chiropractor and treating physician at Harless Wellness in Centerville, Ohio.",
      },
      { property: "og:title", content: "Dr. Jack M. Harless | Chiropractic Care in Centerville" },
      {
        property: "og:description",
        content:
          "Chiropractic care, physical therapy, rehabilitative Qigong & Tai Chi, and wellness education at Harless Wellness.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Harless Wellness",
  medicalSpecialty: "Chiropractic",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Centerville",
    addressRegion: "OH",
    addressCountry: "US",
  },
  employee: {
    "@type": "Physician",
    name: "Dr. Jack M. Harless",
    jobTitle: "Treating Physician",
    alumniOf: ["Logan University", "Logan College of Chiropractic"],
    knowsAbout: ["Chiropractic", "Physical Therapy", "Qigong", "Tai Chi", "Wellness Education"],
  },
};

const navLinks = [
  { label: "About", to: "#about" },
  { label: "Credentials", to: "#credentials" },
  { label: "Approach", to: "#approach" },
  { label: "Request Appointment", to: "/request-appointment" },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="container-tight flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Harless Wellness
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.to.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.to}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
            <Button asChild size="sm" className="ml-3">
              <Link to="/request-appointment">Schedule a Visit</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border/60 md:hidden">
            <nav className="container-tight flex flex-col gap-1 py-3">
              {navLinks.map((link) =>
                link.to.startsWith("#") ? (
                  <a
                    key={link.label}
                    href={link.to}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Button asChild className="mt-2 w-full">
                <Link to="/request-appointment" onClick={() => setMobileMenuOpen(false)}>
                  Schedule a Visit
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding overflow-hidden">
          <div className="container-tight">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <Badge variant="secondary" className="mb-5">
                <Stethoscope className="mr-1.5 h-3.5 w-3.5" />
                Treating Physician
              </Badge>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Dr. Jack M. Harless
              </h1>
              <p className="mt-3 font-heading text-lg font-medium text-primary sm:text-xl">
                BS, DC
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-balance">
                Third-generation chiropractor helping Centerville families live with greater
                function, health, and healing through chiropractic care and wellness education.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-w-[10rem]">
                  <Link to="/request-appointment">
                    <Calendar className="h-4 w-4" />
                    Schedule a Visit
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[10rem]">
                  <a href="#credentials">View Credentials</a>
                </Button>
              </div>

              <div className="mt-12 w-full max-w-xs">
                <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-full border-4 border-background bg-secondary shadow-2xl shadow-primary/10 sm:w-72">
                  <img
                    src="/drjackpic.jpg"
                    alt="Dr. Jack M. Harless, treating physician at Harless Wellness"
                    className="h-full w-full object-cover"
                    width={576}
                    height={576}
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section-padding border-t border-border/60 bg-secondary/40">
          <div className="container-tight">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                About Dr. Harless
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                A lifetime of wellness, rooted in Centerville
              </h2>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl items-center gap-10 lg:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                <img
                  src="/chiropractic-care.jpg"
                  alt="Chiropractor performing a gentle spinal adjustment on a patient"
                  className="h-full w-full object-cover"
                  width={1280}
                  height={854}
                  loading="lazy"
                />
              </div>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Dr. Jack M. Harless is a 1993 graduate of Centerville High School and currently
                  resides there with his wife, Julie, and their four children: Olivia, Anna, Elias,
                  and Emmry. As a third-generation chiropractor, he grew up with vitalistic and
                  wellness concepts and is passionate about helping others implement the wellness
                  lifestyle.
                </p>
                <p>
                  He graduated from Logan University with a BS in Life Sciences and earned his
                  Doctorate of Chiropractic from Logan College of Chiropractic in St. Louis,
                  Missouri. Dr. Harless also holds a license to practice physical therapy from the
                  State Board of Ohio.
                </p>
                <p>
                  In his free time, you can find Dr. Harless coaching for Centerville High School
                  Varsity Lacrosse.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Credentials */}
        <section id="credentials" className="section-padding">
          <div className="container-tight">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                <Award className="mr-1.5 h-3.5 w-3.5" />
                Education & Certifications
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Trained, licensed, and certified
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-balance">
                Dr. Harless brings advanced training in chiropractic care, physical therapy, and
                movement-based healing modalities.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BookOpen className="mb-2 h-6 w-6 text-accent" aria-hidden="true" />
                  <CardTitle className="font-heading text-lg">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      BS in Life Sciences, Logan University
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Doctorate of Chiropractic, Logan College of Chiropractic
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Stethoscope className="mb-2 h-6 w-6 text-accent" aria-hidden="true" />
                  <CardTitle className="font-heading text-lg">Licensure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Licensed to practice physical therapy by the State Board of Ohio, expanding his
                    ability to support recovery and functional movement.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="mb-2 h-6 w-6 text-accent" aria-hidden="true" />
                  <CardTitle className="font-heading text-lg">Qigong & Tai Chi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Level 1 Rehabilitative Qigong & Tai Chi
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Rehabilitative Qigong for Pulmonary Health
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      Certified Healer Within Medical Qigong Practice Leader
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-border shadow-lg">
              <img
                src="/qigong-taichi.jpg"
                alt="Group practicing rehabilitative Qigong and Tai Chi movements in a sunlit studio"
                className="h-full w-full object-cover"
                width={1280}
                height={854}
                loading="lazy"
              />
            </div>

          </div>
        </section>

        {/* Approach / Services */}
        <section
          id="approach"
          className="section-padding border-t border-border/60 bg-secondary/40"
        >
          <div className="container-tight">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Clinical Approach
              </Badge>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Care designed for lasting function and vitality
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-balance">
                Dr. Harless combines hands-on chiropractic care with rehabilitative movement and
                wellness education to help patients reach new levels of health.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Chiropractic Care</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dynamic adjusting processes that facilitate greater levels of function,
                    alignment, and nervous system health.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Physical Therapy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Licensed physical therapy support to restore mobility, reduce pain, and improve
                    strength after injury or chronic conditions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    Rehabilitative Qigong & Tai Chi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gentle, breath-centered movement practices that support rehabilitation,
                    pulmonary health, and stress resilience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">Wellness Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Over 300 hours of wellness lectures grounded in the Epstein model of health,
                    Reorganizational Healing, and quality-of-life science.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <p className="font-heading text-4xl font-bold text-primary">23+</p>
                <p className="mt-1 text-sm text-muted-foreground">Years in health & wellness</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <p className="font-heading text-4xl font-bold text-primary">300+</p>
                <p className="mt-1 text-sm text-muted-foreground">Hours of wellness lectures</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <p className="font-heading text-4xl font-bold text-primary">3rd</p>
                <p className="mt-1 text-sm text-muted-foreground">Generation chiropractor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="section-padding">
          <div className="container-tight">
            <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground shadow-xl shadow-primary/20 sm:p-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                Ready to take the next step in your wellness journey?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/90 text-balance">
                Contact Harless Wellness to schedule an appointment with Dr. Jack M. Harless.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="min-w-[12rem]">
                  <Link to="/request-appointment">
                    <Calendar className="h-4 w-4" />
                    Request an Appointment
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-primary-foreground/80 sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Centerville, Ohio
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Harless Wellness
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />

      <Separator />

      {/* Footer */}
      <footer className="bg-secondary/40 py-10">
        <div className="container-tight">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="font-heading font-semibold tracking-tight text-foreground">
                Harless Wellness
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Dr. Jack M. Harless. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
