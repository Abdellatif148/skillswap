import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Terms = () => {
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
          <h1 className="text-4xl font-bold mb-2">SkillSwap – Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Effective Date: October 21, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground/80">
              By accessing or using SkillSwap (the "Platform"), you agree to follow these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-foreground/80">
              SkillSwap provides a web platform to connect users for skill exchange, using a credit-based system instead of monetary transactions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Users must provide accurate information and not impersonate others.</li>
              <li>Users agree to respect other members and not engage in harassment or illegal activity.</li>
              <li>Users are responsible for the content they share.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Skill Credits & Transactions</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Skill credits are earned by teaching and spent by learning.</li>
              <li>Credits have no monetary value and are non-transferable outside the platform.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
            <p className="text-foreground/80">
              SkillSwap may suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
            <p className="text-foreground/80">
              SkillSwap provides the platform "as is" and does not guarantee skill quality. Users participate at their own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="text-foreground/80">
              SkillSwap may update these terms; users will be notified through the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
            <p className="text-foreground/80">
              Questions about these Terms? Email:{" "}
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

export default Terms;
