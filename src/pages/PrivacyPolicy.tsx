import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const TOC_ITEMS = [
  { id: "summary", label: "Summary of Key Points" },
  { id: "information-collected", label: "What Information We Collect" },
  { id: "how-we-process", label: "How We Process Your Information" },
  { id: "legal-bases", label: "Legal Bases for Processing" },
  { id: "sharing", label: "When We Share Information" },
  { id: "cookies", label: "Cookies and Tracking" },
  { id: "ai-products", label: "AI-Based Products" },
  { id: "social-logins", label: "Social Login Information" },
  { id: "international", label: "International Data Transfers" },
  { id: "retention", label: "How Long Do We Keep Your Information?" },
  { id: "security", label: "How Do We Keep Your Information Safe?" },
  { id: "minors", label: "Information from Minors" },
  { id: "rights", label: "What Are Your Privacy Rights?" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <>
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span>Privacy Policy</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated January 11, 2026</p>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="flex gap-8 max-w-6xl mx-auto px-4 py-12">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="sticky top-20 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Contents</p>
            <ul className="space-y-1">
              {TOC_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <article className="flex-1 max-w-3xl">
          {/* Summary */}
          <section id="summary" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">Summary of Key Points</h2>
            <p className="text-foreground/90 mb-4">
              This summary provides key points from our Privacy Notice. You can find out more details about any of
              these topics by reviewing the full policy sections below.
            </p>
            <ul className="space-y-3 text-foreground/80">
              {[
                {
                  title: "Personal Information Processing:",
                  body: "We process personal information depending on how you interact with us, including names, email addresses, contact preferences, and user-generated content.",
                },
                {
                  title: "Third-Party Services:",
                  body: "We may receive information from authentication providers like Google and payment processors like Stripe.",
                },
                {
                  title: "Information Security:",
                  body: "We implement technical and organizational security measures to protect your data, though no system is 100% secure.",
                },
                {
                  title: "Your Rights:",
                  body: "Depending on your location, you may have the right to access, correct, or delete your personal information.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary font-semibold shrink-0">•</span>
                  <span>
                    <strong>{item.title}</strong> {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Information Collected */}
          <section id="information-collected" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">1. What Information Do We Collect?</h2>

            <h3 className="text-lg font-semibold text-foreground mb-4 mt-6">Personal Information You Provide</h3>
            <p className="text-foreground/80 mb-4">
              We collect personal information that you voluntarily provide when you register, express interest in our
              products, participate in activities, or contact us. This may include:
            </p>
            <ul className="space-y-2 text-foreground/80 mb-6">
              {[
                "Names",
                "Email addresses",
                "Contact preferences",
                "Usernames",
                "User-generated content (chat messages, prompts, and responses)",
                "Payment information (processed by Stripe)",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-4 mt-6">Information Automatically Collected</h3>
            <p className="text-foreground/80 mb-4">
              We automatically collect certain information when you visit or use our Services, including:
            </p>
            <ul className="space-y-2 text-foreground/80">
              {[
                "IP addresses",
                "Browser and device characteristics",
                "Operating system",
                "Language preferences",
                "Log and usage data",
                "Location information (inferred from IP address)",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How We Process */}
          <section id="how-we-process" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">2. How Do We Process Your Information?</h2>
            <p className="text-foreground/80 mb-6">We process your information for various purposes, including:</p>
            <ul className="space-y-3 text-foreground/80">
              {[
                "Facilitating account creation and authentication",
                "Delivering and facilitating service delivery",
                "Responding to user inquiries and offering support",
                "Sending administrative information about products and services",
                "Fulfilling and managing orders and payments",
                "Protecting our Services from fraud and security threats",
                "Identifying usage trends to improve Services",
                "Service reliability, security, and improvement",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-semibold text-primary shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Legal Bases */}
          <section id="legal-bases" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">3. Legal Bases for Processing</h2>
            <p className="text-foreground/80 mb-4">
              We process your personal information based on valid legal grounds, including:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Consent",
                  desc: "We may process your information with your permission, which you can withdraw at any time.",
                },
                {
                  title: "Performance of a Contract",
                  desc: "We process information necessary to fulfill our contractual obligations to you.",
                },
                {
                  title: "Legitimate Interests",
                  desc: "We process information to achieve legitimate business interests that do not outweigh your rights.",
                },
                {
                  title: "Legal Obligations",
                  desc: "We process information to comply with legal obligations and regulatory requirements.",
                },
                {
                  title: "Vital Interests",
                  desc: "We process information when necessary to protect your vital interests or the interests of others.",
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-card border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-foreground/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sharing */}
          <section id="sharing" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">4. When Do We Share Information?</h2>
            <p className="text-foreground/80">
              We may share information with trusted partners, service providers, and as required by law. We do not sell
              your personal information.
            </p>
          </section>

          {/* Cookies */}
          <section id="cookies" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              5. Do We Use Cookies and Tracking Technologies?
            </h2>
            <p className="text-foreground/80">
              We use cookies and similar technologies for authentication, security, and analytics (through PostHog). We
              do not use cookies for third-party targeted advertising. For detailed information, please see our{" "}
              <Link to="/cookies" className="text-primary hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          {/* AI Products */}
          <section id="ai-products" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">6. Do We Offer AI-Based Products?</h2>
            <p className="text-foreground/80 mb-4">
              Yes, we offer products, features, and tools powered by artificial intelligence, machine learning, and
              similar technologies. We partner with AI Service Providers including OpenAI, Anthropic, Google Cloud AI,
              Groq, and Hugging Face.
            </p>
            <div className="p-4 bg-accent/20 border border-accent rounded-lg text-foreground/90">
              <h4 className="font-semibold mb-2">How to Opt Out</h4>
              <p className="text-sm">
                You can stop using AI features, avoid submitting personal information in prompts, delete chats in the
                product UI, or contact us to request account deletion.
              </p>
            </div>
          </section>

          {/* Social Logins */}
          <section id="social-logins" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">7. Social Login Information</h2>
            <p className="text-foreground/80">
              We may offer social login options for your convenience. When you use social login, the provider shares
              certain information with us based on your privacy settings with that service.
            </p>
          </section>

          {/* International */}
          <section id="international" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">8. International Data Transfers</h2>
            <p className="text-foreground/80">
              Your information may be transferred to, stored in, and processed in countries other than your country of
              residence. These countries may have data protection laws that differ from your home country.
            </p>
          </section>

          {/* Retention */}
          <section id="retention" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">9. How Long Do We Keep Your Information?</h2>
            <p className="text-foreground/80">
              We retain your personal information for as long as necessary to provide our Services and fulfill the
              purposes outlined in this policy. You can request deletion of your data at any time.
            </p>
          </section>

          {/* Security */}
          <section id="security" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">10. How Do We Keep Your Information Safe?</h2>
            <p className="text-foreground/80 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal
              information. However, no electronic transmission is 100% secure. We recommend accessing our Services only
              through secure environments.
            </p>
            <div className="p-4 bg-accent/20 border border-accent rounded-lg text-foreground/90">
              <p className="text-sm">
                We cannot guarantee that unauthorized parties will not be able to defeat our security measures. You use
                our Services at your own risk.
              </p>
            </div>
          </section>

          {/* Minors */}
          <section id="minors" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">11. Information from Minors</h2>
            <p className="text-foreground/80">
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal
              information from minors. If we become aware of such collection, we will delete the information promptly.
            </p>
          </section>

          {/* Rights */}
          <section id="rights" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">12. What Are Your Privacy Rights?</h2>
            <p className="text-foreground/80 mb-4">Depending on your location, you may have certain rights including:</p>
            <ul className="space-y-2 text-foreground/80">
              {[
                "Right to access and obtain a copy of your personal information",
                "Right to request rectification or erasure",
                "Right to restrict processing of your information",
                "Right to data portability (where applicable)",
                "Right not to be subject to automated decision-making",
                "Right to withdraw your consent",
                "Right to complain to data protection authorities (in EEA/UK)",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">13. Contact Us</h2>
            <p className="text-foreground/80 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="p-6 bg-card border border-border rounded-lg space-y-2">
              <p className="text-foreground">
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:info@genzoic.com" className="text-primary hover:underline">
                  info@genzoic.com
                </a>
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Company:</span> Genzoic Inc.
              </p>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
