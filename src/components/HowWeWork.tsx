import { Bot, BadgeCheck, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm connects you with the perfect partner based on your skills, goals, and availability.",
  },
  {
    icon: Coins,
    title: "Credit-Based Barter System",
    description: "Use credits as a medium of exchange, ensuring fair and transparent skill swaps without any money involved.",
  },
  {
    icon: BadgeCheck,
    title: "Verified and Trusted Users",
    description: "We verify user profiles and encourage community reviews to build a safe and trustworthy learning environment.",
  },
];

const HowWeWork = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            How We Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform is built on three core principles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card hover:shadow-soft transition-all duration-300 border-border hover:border-primary/20"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
