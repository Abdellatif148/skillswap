import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="What do you want to learn or teach?"
              className="w-full pl-12 pr-32 py-6 text-lg rounded-full shadow-soft"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 py-2">
              Search
            </Button>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>Filters:</span>
            <div className="flex gap-4">
              <button className="hover:text-primary transition-colors">Skill type</button>
              <button className="hover:text-primary transition-colors">Experience level</button>
              <button className="hover:text-primary transition-colors">Availability</button>
              <button className="hover:text-primary transition-colors">Language</button>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              All Filters
            </Button>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            Trending: <a href="#" className="text-primary hover:underline">Python</a>, <a href="#" className="text-primary hover:underline">Guitar</a>, <a href="#" className="text-primary hover:underline">Video Editing</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;