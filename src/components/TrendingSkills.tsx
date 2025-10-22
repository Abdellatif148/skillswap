import { Card } from "@/components/ui/card";
import { ArrowUpRight, Code, Guitar, Video, Palette, Globe, Camera, Mic, Briefcase, Heart } from "lucide-react";

const trendingSkills = [
  {
    icon: Code,
    title: "Python",
    description: "Learn the world's most popular programming language.",
    teachers: 128,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Guitar,
    title: "Guitar",
    description: "Master the art of playing the guitar with experts.",
    teachers: 92,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Create stunning videos with professional guidance.",
    teachers: 78,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Design beautiful and intuitive user experiences.",
    teachers: 156,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: Globe,
    title: "Spanish",
    description: "Speak Spanish fluently with native speakers.",
    teachers: 203,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capture amazing moments with professional techniques.",
    teachers: 89,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

const TrendingSkills = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Trending Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular skills being taught and learned right now
          </p>
        </div>
        <div className="grid-skills max-w-7xl mx-auto">
          {trendingSkills.map((skill, index) => (
            <Card
              key={index}
              className={`card-interactive p-6 ${skill.bgColor} border-0 group animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-card group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className="w-7 h-7 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {skill.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {skill.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {skill.teachers}+ teachers
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-400 fill-current" />
                    <span className="text-sm font-medium text-muted-foreground">4.9</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg font-medium rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            View All Skills
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSkills;