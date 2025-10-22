import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, TrendingUp } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="search-modern mb-8">
            <Input
              type="text"
              placeholder="What do you want to learn or teach?"
              className="search-input"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary/60" />
            <Button className="absolute right-3 top-1/2 -translate-y-1/2 btn-gradient-hover rounded-2xl px-8 py-3 font-semibold">
              Search
            </Button>
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
              {["Python", "Guitar", "Video Editing", "Design", "Spanish", "Photography"].map((skill) => (
                <button
                  key={skill}
                  className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-full transition-all duration-200 hover-scale"
                >
                  {skill}
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