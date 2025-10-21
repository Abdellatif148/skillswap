import { UserPlus, Search, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Add your skills",
    description: "List the skills you can teach and what you want to learn.",
  },
  {
    icon: Search,
    title: "Get matched",
    description: "Our AI finds perfect skill partners based on your interests.",
  },
  {
    icon: BookOpen,
    title: "Learn & teach",
    description: "Connect with your partner and start the skill exchange.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start your learning journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 bg-card hover:shadow-soft transition-all duration-300 border-border hover:border-primary/20"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;