import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { skillsLibraryService, SkillLibraryItem } from "@/lib/skillsLibrary";
import { useState, useEffect } from "react";

export interface SkillFormData {
  name: string;
  level: string;
  type: "teach" | "learn";
}

interface SkillFormProps {
  onAddSkill: (skill: SkillFormData) => void;
  skills: SkillFormData[];
  onRemoveSkill: (index: number) => void;
  disabled?: boolean;
}

export const SkillForm = ({ onAddSkill, skills, onRemoveSkill, disabled = false }: SkillFormProps) => {
  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLevel, setCurrentLevel] = useState("beginner");
  const [currentType, setCurrentType] = useState<"teach" | "learn">("teach");
  const [skillSuggestions, setSkillSuggestions] = useState<SkillLibraryItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (currentSkill.length > 2) {
      searchSkills(currentSkill);
    } else {
      setSkillSuggestions([]);
      setShowSuggestions(false);
    }
  }, [currentSkill]);

  const searchSkills = async (query: string) => {
    try {
      const results = await skillsLibraryService.searchSkills(query, undefined, 5);
      setSkillSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch (error) {
      console.error('Error searching skills:', error);
    }
  };

  const handleSkillSelect = (skill: SkillLibraryItem) => {
    setCurrentSkill(skill.name);
    setCurrentLevel(skill.difficulty_level);
    setShowSuggestions(false);
  };
  const handleAddSkill = () => {
    if (!currentSkill.trim()) return;

    onAddSkill({
      name: currentSkill.trim(),
      level: currentLevel,
      type: currentType,
    });

    setCurrentSkill("");
    setCurrentLevel("beginner");
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Your Skills</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Add skills you can teach or want to learn
        </p>
      </div>

      {/* Skills Display */}
      <Card className="p-4 min-h-[60px]">
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">
            No skills added yet
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant={skill.type === "teach" ? "default" : "secondary"}
                className="gap-1 pr-1"
              >
                {skill.name} ({skill.level}) - {skill.type}
                <button
                  type="button"
                  onClick={() => onRemoveSkill(index)}
                  className="ml-1 hover:bg-background/20 rounded-full p-0.5"
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </Card>

      {/* Add Skill Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-2 relative">
          <Input
            placeholder="Skill name (e.g., Web Design)"
            value={currentSkill}
            onChange={(e) => {
              setCurrentSkill(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            onFocus={() => currentSkill.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          {/* Skill Suggestions Dropdown */}
          {showSuggestions && skillSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-border shadow-lg z-50 max-h-48 overflow-y-auto">
              {skillSuggestions.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 hover:bg-muted cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => handleSkillSelect(skill)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{skill.name}</div>
                      <div className="text-xs text-muted-foreground">{skill.category?.name}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {skill.difficulty_level}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Select
          value={currentLevel}
          onValueChange={setCurrentLevel}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={currentType}
          onValueChange={(value: "teach" | "learn") => setCurrentType(value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="teach">Can Teach</SelectItem>
            <SelectItem value="learn">Want to Learn</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button
        type="button"
        onClick={handleAddSkill}
        variant="outline"
        className="w-full"
        disabled={disabled || !currentSkill.trim()}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Skill
      </Button>
    </div>
  );
};