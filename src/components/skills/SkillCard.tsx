import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit2, Trash2, Star } from "lucide-react";

interface SkillCardProps {
  skill: {
    id: string;
    skill_name: string;
    skill_type: string;
    skill_level: string;
  };
  onEdit?: (skillId: string) => void;
  onDelete?: (skillId: string) => void;
  showActions?: boolean;
  progress?: number;
  rating?: number;
  sessionsCount?: number;
}

export const SkillCard = ({ 
  skill, 
  onEdit, 
  onDelete, 
  showActions = true,
  progress = 0,
  rating,
  sessionsCount
}: SkillCardProps) => {
  const isTeaching = skill.skill_type === "teach";

  return (
    <Card className="p-4 bg-gradient-card hover:shadow-soft transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground">{skill.skill_name}</h3>
          <Badge 
            variant={isTeaching ? "default" : "secondary"} 
            className="mt-1"
          >
            {skill.skill_level}
          </Badge>
        </div>
        {showActions && (
          <div className="flex gap-2">
            {onEdit && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8"
                onClick={() => onEdit(skill.id)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => onDelete(skill.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {progress > 0 && (
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {(rating || sessionsCount) && (
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          {sessionsCount && (
            <span>{sessionsCount} sessions</span>
          )}
          {rating && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {rating}
            </span>
          )}
        </div>
      )}

      <Button 
        className={`w-full ${isTeaching ? 'bg-primary hover:bg-primary-dark' : 'bg-secondary hover:bg-secondary/90'}`}
      >
        Find Match
      </Button>
    </Card>
  );
};