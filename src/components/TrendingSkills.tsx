import { Card } from "@/components/ui/card";
import { ArrowUpRight, Code, Guitar, Video } from "lucide-react";

const trendingSkills = [
  {
    icon: Code,
    title: "Python",
    description: "Learn the world's most popular programming language.",
    teachers: 128,
  },
  {
    icon: Guitar,
    title: "Guitar",
    description: "Master the art of playing the guitar with experts.",
    teachers: 92,
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Create stunning videos with professional guidance.",
    teachers: 78,
  },
];

const TrendingSkills = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trending Skills
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingSkills.map((skill, index) => (
            <Card
              key={index}
              className="p-6 bg-card hover:shadow-soft transition-all duration-300 border-border hover:border-primary/20 group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                    <skill.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {skill.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {skill.teachers} active teachers
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSkills;