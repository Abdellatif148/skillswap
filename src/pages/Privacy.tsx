import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">SkillSwap – Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Effective Date: October 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Personal info: name, email, profile photo, skills, bio</li>
              <li>Usage info: activity logs, matches, messages (for functionality only)</li>
              <li>Device & browser info</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>To provide and improve SkillSwap services</li>
              <li>To match users for skill exchange</li>
              <li>To communicate updates, offers, or notifications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>SkillSwap does not sell your data.</li>
              <li>Data may be shared with third-party providers for hosting, analytics, and chat/video services.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>We implement reasonable security measures to protect your data.</li>
              <li>Users are responsible for keeping passwords safe.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. User Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Access, update, or delete your personal data via profile settings</li>
              <li>Opt-out of marketing emails anytime</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies & Tracking</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>We use cookies for functionality and analytics only</li>
              <li>No personal data is sold to advertisers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
            <p className="text-foreground/80">
              For privacy questions:{" "}
              <a href="mailto:followuplysc@gmail.com" className="text-primary hover:underline">
                followuplysc@gmail.com
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Privacy;
