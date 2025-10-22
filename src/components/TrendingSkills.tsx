import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Star, ArrowRight } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { skillsLibraryService, SkillLibraryItem } from "@/lib/skillsLibrary";

const TrendingSkills = () => {
  const navigate = useNavigate();
  const [trendingSkills, setTrendingSkills] = useState<SkillLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrendingSkills();
  }, []);

  const loadTrendingSkills = async () => {
    try {
      const skills = await skillsLibraryService.getPopularSkills(6);
      setTrendingSkills(skills);
    } catch (error) {
      console.error('Error loading trending skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSelect = (skill: SkillLibraryItem) => {
    localStorage.setItem('selectedSkill', JSON.stringify(skill));
    navigate('/auth');
  };

  const getColorClasses = (index: number) => {
    const colors = [
      { color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
      { color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50" },
      { color: "from-green-500 to-green-600", bgColor: "bg-green-50" },
      { color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50" },
      { color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50" },
      { color: "from-indigo-500 to-indigo-600", bgColor: "bg-indigo-50" },
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <LoadingSpinner size="lg" text="Loading trending skills..." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-soft">
            <TrendingUp className="w-5 h-5 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">Most Popular Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Trending Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most sought-after skills in our community and join thousands of learners.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {trendingSkills.map((skill, index) => (
            const colorClasses = getColorClasses(index);
            <Card 
              key={skill.id}
              className={`card-modern p-6 ${colorClasses.bgColor} border-0 group animate-slide-up hover:scale-105 transition-all duration-300 cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSkillSelect(skill)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {skill.category?.name}
                    </Badge>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-secondary">
                    <TrendingUp className="w-4 h-4" />
                    Popular
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {Math.floor(skill.popularity_score * 10)} learners
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-muted-foreground">4.{Math.floor(Math.random() * 3) + 6}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkillSelect(skill);
                    }}
                  >
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-medium rounded-2xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          >
            View All Skills
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSkills;