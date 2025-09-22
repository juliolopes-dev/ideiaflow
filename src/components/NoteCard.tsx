import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, Clock, Lightbulb, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Note, NoteType } from "@/types";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const typeConfig = {
  note: {
    icon: FileText,
    label: "Anotação",
    variant: "secondary" as const,
  },
  reminder: {
    icon: Clock,
    label: "Lembrete",
    variant: "outline" as const,
  },
  project: {
    icon: Lightbulb,
    label: "Projeto",
    variant: "default" as const,
  },
};

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const config = typeConfig[note.type];
  const Icon = config.icon;
  const isOverdue = note.dueDate && new Date() > note.dueDate;

  return (
    <Card className={cn(
      "group relative overflow-hidden bg-gradient-card border-0 shadow-soft",
      "hover:shadow-medium transition-all duration-300 hover:-translate-y-1",
      isOverdue && "ring-2 ring-destructive/20"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <Badge variant={config.variant} className="text-xs">
              {config.label}
            </Badge>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-primary/10"
              onClick={() => onEdit(note)}
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDelete(note.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
          {note.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {note.content}
        </p>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-0"
              >
                {tag}
              </Badge>
            ))}
            {note.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                +{note.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {note.updatedAt.toLocaleDateString('pt-BR')}
          </span>
          {note.dueDate && (
            <span className={cn(
              "font-medium",
              isOverdue ? "text-destructive" : "text-accent"
            )}>
              {isOverdue ? "Atrasado" : "Vence em"} {note.dueDate.toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}