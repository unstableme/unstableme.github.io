import { useEffect, useState } from "react";
import {
  Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, Lock,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "@/hooks/use-toast";
import { useMode } from "@/context/ThemeContext";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { profile, modeCopy } from "@/data/content";
import { cn } from "@/lib/utils";

function MediumIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z" />
    </svg>
  );
}

export function Contact() {
  const { mode } = useMode();
  const isBat = mode === "batman";
  const copy = modeCopy[mode];
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init("");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: "unstableme02@gmail.com",
      };
      await emailjs.send("service_", "template_", templateParams, "");
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-background border border-border text-foreground outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors";

  const socials = [
    { href: profile.social.github, label: "GitHub", icon: <Github className="h-5 w-5" /> },
    { href: profile.social.linkedin, label: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
    { href: profile.social.twitter, label: "Twitter", icon: <Twitter className="h-5 w-5" /> },
    { href: profile.social.instagram, label: "Instagram", icon: <Instagram className="h-5 w-5" /> },
    { href: profile.social.medium, label: "Medium", icon: <MediumIcon /> },
  ];

  return (
    <section id="contact" className="section-container py-24 md:py-32">
      <SectionHeader
        sectionId="contact"
        label={copy.contact.label}
        title={copy.contact.title}
        status="Channel: Encrypted"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl">
        <Reveal>
          <div className="mode-card p-6 md:p-8 h-full">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              {isBat && <Lock className="h-4 w-4 text-primary" />}
              {isBat ? "Open a secure line" : "Get in touch"}
            </h3>

            <div className="space-y-5">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <div className="font-medium text-foreground mb-0.5">Email</div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <div className="font-medium text-foreground mb-0.5">Phone</div>
                  <a
                    href={profile.phoneHref}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {profile.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <div>
                  <div className="font-medium text-foreground mb-0.5">Location</div>
                  <div className="text-sm text-muted-foreground">{profile.location}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-base font-medium text-foreground mb-4">
                {isBat ? "Known aliases" : "Connect on social media"}
              </h4>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mode-card p-6 md:p-8 h-full">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {isBat ? "Transmit a message" : "Send a message"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={{ borderRadius: "var(--radius)" }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  style={{ borderRadius: "var(--radius)" }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cn(inputClass, "resize-none")}
                  style={{ borderRadius: "var(--radius)" }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn("mode-btn-primary w-full", isSubmitting && "opacity-70 cursor-not-allowed")}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {isBat ? "Transmit" : "Send message"}
                  </>
                )}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
