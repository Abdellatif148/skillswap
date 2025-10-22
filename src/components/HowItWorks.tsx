import { UserPlus, Search, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Add your skills",
    description: "List the skills you can teach and what you want to learn.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Search,
    title: "Get matched",
    description: "Our AI finds perfect skill partners based on your interests.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: BookOpen,
    title: "Learn & teach",
    description: "Connect with your partner and start the skill exchange.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to start your learning journey and connect with amazing people.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className={`card-modern p-8 ${step.bgColor} border-0 text-center group animate-slide-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="space-y-6">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-card mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-card text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-card">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Ready to get started?</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;