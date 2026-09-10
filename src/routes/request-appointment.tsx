import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, HeartPulse, Mail, Menu, Phone, User, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/request-appointment")({
  head: () => ({
    meta: [
      { title: "Request an Appointment | Harless Wellness" },
      {
        name: "description",
        content:
          "Request an appointment with Dr. Jack M. Harless at Harless Wellness in Centerville, Ohio.",
      },
      { property: "og:title", content: "Request an Appointment | Harless Wellness" },
      {
        property: "og:description",
        content:
          "Request an appointment with Dr. Jack M. Harless at Harless Wellness in Centerville, Ohio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RequestAppointment,
});

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Credentials", to: "/#credentials" },
  { label: "Approach", to: "/#approach" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  visitType: string;
  message: string;
}

function RequestAppointment() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    visitType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Appointment Request from ${formData.name || "Harless Wellness Website"}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPreferred Date/Time: ${formData.preferredDate}\nReason for Visit: ${formData.visitType}\n\nMessage:\n${formData.message}`,
    );

    window.location.href = `mailto:jackharlessdc@yahoo.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
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
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="section-padding">
          <div className="container-tight">
            <div className="mx-auto max-w-2xl">
              <Button asChild variant="ghost" size="sm" className="mb-6 -ml-3">
                <Link to="/" className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
              </Button>

              <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                  Request an Appointment
                </h1>
                <p className="mt-3 text-lg text-muted-foreground text-balance">
                  Fill out the form below and we will follow up to confirm your visit with Dr.
                  Harless.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">
                    Email ready to send
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Your email app should have opened with the appointment details. If it did not,
                    you can email us directly at{" "}
                    <a
                      href="mailto:jackharlessdc@yahoo.com"
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      jackharlessdc@yahoo.com
                    </a>
                    .
                  </p>
                  <Button asChild className="mt-6" variant="outline">
                    <Link to="/">Return home</Link>
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
                >
                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          <User className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                          Full name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Jane Doe"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          <Mail className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                          Email address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jane@example.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          <Phone className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                          Phone number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(937) 555-1234"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">
                          <Calendar className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                          Preferred date / time
                        </Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          placeholder="e.g., Tuesday afternoon"
                          value={formData.preferredDate}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredDate: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visitType">Reason for visit</Label>
                      <Select
                        value={formData.visitType}
                        onValueChange={(value) => setFormData({ ...formData, visitType: value })}
                      >
                        <SelectTrigger id="visitType" className="w-full">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-patient">New patient consultation</SelectItem>
                          <SelectItem value="chiropractic">Chiropractic adjustment</SelectItem>
                          <SelectItem value="physical-therapy">Physical therapy</SelectItem>
                          <SelectItem value="qigong-tai-chi">Qigong / Tai Chi</SelectItem>
                          <SelectItem value="wellness">Wellness education</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional details</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your symptoms, goals, or any questions you have."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Appointment Request
                    </Button>
                  </div>
                </form>
              )}

              <p className="mt-6 text-center text-sm text-muted-foreground">
                You can also reach us directly at{" "}
                <a
                  href="mailto:jackharlessdc@yahoo.com"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  jackharlessdc@yahoo.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

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
