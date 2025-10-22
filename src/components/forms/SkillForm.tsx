import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const handleAddSkill = () => {
    if (!currentSkill.trim()) return;

    onAddSkill({
      name: currentSkill.trim(),
      level: currentLevel,
      type: currentType,
    });

    setCurrentSkill("");
    setCurrentLevel("beginner");
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
        <div className="md:col-span-2">
          <Input
            placeholder="Skill name (e.g., Web Design)"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
          />
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