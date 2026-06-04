import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Github, Linkedin, Mail, Send } from "lucide-react";
import { z } from "zod";
import { Reveal, SectionHeading } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters)")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  company: z.string().trim().max(100, "Company must be under 100 characters").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
});

type FieldErrors = Partial<Record<"name" | "email" | "company" | "message", string>>;
type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      message: String(fd.get("message") || ""),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      // Focus first invalid field for a11y
      const firstKey = Object.keys(next)[0];
      if (firstKey) {
        const el = form.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        el?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/kasaraneni.venumadhav@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...parsed.data,
            _subject: `Portfolio inquiry from ${parsed.data.name}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );
      if (!res.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setServerError(
        "Couldn't send right now. Please email kasaraneni.venumadhav@gmail.com directly.",
      );
    }
  };

  const sending = status === "sending";
  const sent = status === "success";

  return (
    <section id="contact" className="relative z-10 px-6 py-32 sm:py-40">
      {/* Map-like background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary"
              />
            </pattern>
            <radialGradient id="fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="m"><rect width="100%" height="100%" fill="url(#fade)" /></mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#map)" mask="url(#m)" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build <span className="text-gradient">something</span>
            </>
          }
          description="Open to internships, research collaborations & freelance — drop a short note."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="h-full rounded-3xl glass-strong p-8">
              <h3 className="text-2xl font-semibold text-foreground">Say hello</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Open to internships, research collaborations & freelance work — remote-friendly.
              </p>

              <a
                href="mailto:kasaraneni.venumadhav@gmail.com"
                className="mt-8 flex items-center gap-3 rounded-2xl glass p-4 transition-all hover:-translate-y-0.5 hover:glow-ring"
                data-magnetic
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                  <Mail className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm font-medium">kasaraneni.venumadhav@gmail.com</div>
                </div>
              </a>

              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Follow along
                </div>
                <div className="mt-4 flex gap-3">
                  {[
                    { Icon: Github, href: "https://github.com/venumadhav-88", label: "GitHub" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/venumadhavkasaraneni", label: "LinkedIn" },
                    { Icon: Mail, href: "mailto:kasaraneni.venumadhav@gmail.com", label: "Email" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      data-magnetic
                      className="group flex h-11 w-11 items-center justify-center rounded-xl glass transition-all hover:bg-primary/20 hover:text-foreground"
                    >
                      <Icon className="h-4 w-4 transition-transform group-hover:-rotate-6 group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-border/60 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available · responding within 24h
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl glass-strong p-8">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={submit}
                    noValidate
                    aria-label="Contact form"
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Your name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Jane Cooper"
                        error={errors.name}
                        onChange={() =>
                          errors.name && setErrors((p) => ({ ...p, name: undefined }))
                        }
                      />
                      <Field
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="jane@studio.com"
                        error={errors.email}
                        onChange={() =>
                          errors.email && setErrors((p) => ({ ...p, email: undefined }))
                        }
                      />
                    </div>
                    <Field
                      label="Company"
                      type="text"
                      name="company"
                      autoComplete="organization"
                      placeholder="Optional"
                      error={errors.company}
                      required={false}
                      onChange={() =>
                        errors.company && setErrors((p) => ({ ...p, company: undefined }))
                      }
                    />
                    <TextareaField
                      label="Project brief"
                      name="message"
                      placeholder="Tell me a little about what you're building, timing, and what success looks like…"
                      error={errors.message}
                      onChange={() =>
                        errors.message && setErrors((p) => ({ ...p, message: undefined }))
                      }
                    />

                    {/* Live region for server errors */}
                    <div aria-live="polite" aria-atomic="true">
                      <AnimatePresence>
                        {serverError && (
                          <motion.div
                            key="server-error"
                            initial={{ opacity: 0, y: -6, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -6, height: 0 }}
                            transition={{ duration: 0.25 }}
                            role="alert"
                            className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300"
                          >
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{serverError}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <MagneticButton as="div" className="w-full">
                      <button
                        type="submit"
                        disabled={sending}
                        aria-busy={sending}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-70"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {sending ? (
                            <>
                              <span
                                className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                                aria-hidden="true"
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
                              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </span>
                        <span className="absolute inset-0 -z-0 translate-y-full bg-foreground transition-transform duration-500 group-hover:translate-y-0" />
                      </button>
                    </MagneticButton>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    role="status"
                    aria-live="polite"
                    className="flex h-full min-h-[340px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-500/40"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold">Message sent</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 rounded-full glass px-4 py-2 text-xs hover:bg-white/10"
                    >
                      Send another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required = true,
  ...rest
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <motion.div
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
      >
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          aria-required={required}
          {...rest}
          className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30"
              : "border-border focus:border-primary focus:ring-primary/30"
          }`}
        />
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            key={errId}
            id={errId}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400"
          >
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextareaField({
  label,
  error,
  ...rest
}: { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <motion.div
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
      >
        <textarea
          id={id}
          rows={5}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          aria-required="true"
          {...rest}
          className={`w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/30"
              : "border-border focus:border-primary focus:ring-primary/30"
          }`}
        />
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            key={errId}
            id={errId}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400"
          >
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
