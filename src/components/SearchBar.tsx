import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, TrendingUp, Loader as Loader2 } from "lucide-react";
import { skillsLibraryService, SkillLibraryItem } from "@/lib/skillsLibrary";
import { useToast } from "@/hooks/use-toast";

const SearchBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SkillLibraryItem[]>([]);
  const [popularSkills, setPopularSkills] = useState<SkillLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadPopularSkills();
  }, []);

  const loadPopularSkills = async () => {
    try {
      const skills = await skillsLibraryService.getPopularSkills(6);
      setPopularSkills(skills);
    } catch (error) {
      console.error('Error loading popular skills:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const results = await skillsLibraryService.searchSkills(query, undefined, 8);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching skills:', error);
      toast({
        title: "Search Error",
        description: "Failed to search skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSelect = (skill: SkillLibraryItem) => {
    // Store selected skill in localStorage for the auth page
    localStorage.setItem('selectedSkill', JSON.stringify(skill));
    navigate('/auth');
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      localStorage.setItem('searchQuery', searchQuery);
      navigate('/auth');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="search-modern mb-8 relative">
            <Input
              type="text"
              placeholder="What do you want to learn or teach?"
              className="search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/60" />
            <Button 
              className="absolute right-3 top-1/2 -translate-y-1/2 btn-gradient-hover rounded-2xl px-8 py-3 font-semibold"
              onClick={handleSearchSubmit}
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
            </Button>
            
            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border shadow-hover z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Search Results</h3>
                    <div className="space-y-2">
                      {searchResults.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => handleSkillSelect(skill)}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{skill.name}</div>
                            <div className="text-sm text-muted-foreground">{skill.description}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {skill.difficulty_level}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {skill.category?.icon}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No skills found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button variant="outline" size="sm" className="rounded-full border-primary/20 hover:border-primary/40 hover:bg-primary/5">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              All Filters
            </Button>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
                Skill Type
              </button>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
                Experience Level
              </button>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
                Availability
              </button>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-200">
                Language
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-medium">Trending:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSkills.map((skill) => (
                <button
                  key={skill.id}
                  className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-all duration-200 hover-scale"
                  onClick={() => handleSkillSelect(skill)}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;