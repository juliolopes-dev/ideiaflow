import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Lightbulb, Grid3X3 } from "lucide-react";
import { NoteType } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: NoteType | "all";
  onCategoryChange: (category: NoteType | "all") => void;
  counts: Record<NoteType | "all", number>;
}

const categories = [
  { id: "all" as const, label: "Todas", icon: Grid3X3 },
  { id: "note" as const, label: "Anotações", icon: FileText },
  { id: "reminder" as const, label: "Lembretes", icon: Clock },
  { id: "project" as const, label: "Projetos", icon: Lightbulb },
];

export function CategoryFilter({ selectedCategory, onCategoryChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        const count = counts[category.id] || 0;

        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "relative transition-all duration-200",
              isSelected 
                ? "bg-gradient-primary shadow-medium" 
                : "hover:bg-secondary/80 hover:shadow-soft"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {category.label}
            {count > 0 && (
              <Badge 
                variant="secondary" 
                className={cn(
                  "ml-2 px-1.5 py-0.5 text-xs min-w-[1.25rem] h-5",
                  isSelected 
                    ? "bg-white/20 text-white border-0" 
                    : "bg-primary/10 text-primary border-0"
                )}
              >
                {count}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}