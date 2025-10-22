import { Card } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import team1 from "@/assets/team1.jpg";
import team2 from "@/assets/team2.jpg";
import team3 from "@/assets/team3.jpg";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Passionate about democratizing education and fostering a global learning community.",
    image: team1,
  },
  {
    name: "Maria Garcia",
    role: "Head of Product",
    bio: "Designs intuitive and engaging experiences to help our users achieve their learning goals.",
    image: team2,
  },
  {
    name: "Sam Chen",
    role: "Lead Engineer",
    bio: "Builds the robust technology that powers our skill-swapping platform.",
    image: team3,
  },
];

const Team = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind SkillSwap.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="p-6 bg-card text-center hover:shadow-soft transition-all duration-300 border-border hover:border-primary/20 group"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground mb-4">
                {member.bio}
              </p>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mx-auto" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
