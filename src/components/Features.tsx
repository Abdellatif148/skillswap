import { Brain, Shield, TrendingUp, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Smart algorithms connect you with ideal skill partners based on compatibility",
    gradient: "from-primary to-primary-light",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Verified profiles and community ratings ensure quality exchanges",
    gradient: "from-secondary to-secondary-light",
  },
  {
    icon: TrendingUp,
    title: "Track Your Growth",
    description: "Monitor your progress and celebrate your learning milestones",
    gradient: "from-primary-dark to-primary",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Learn from people worldwide and expand your cultural horizons",
    gradient: "from-secondary-light to-secondary",
  },
];

const Features = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose SkillSwap?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to exchange knowledge and grow your skills
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group p-8 bg-gradient-card hover:shadow-soft transition-all duration-300 border-border"
            >
              <div className="flex gap-6">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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

export default Features;