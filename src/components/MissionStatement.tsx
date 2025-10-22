import { Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const MissionStatement = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 lg:p-12 shadow-soft border-border bg-card">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-soft">
                <Globe className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our mission is to democratize learning by enabling peer-to-peer skill exchange.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MissionStatement;
