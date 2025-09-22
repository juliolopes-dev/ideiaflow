import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FolderPlus } from "lucide-react";
import { Folder } from "@/types";

interface CreateFolderDialogProps {
  onCreateFolder: (folder: Omit<Folder, "id" | "createdAt" | "updatedAt">) => void;
  trigger?: React.ReactNode;
}

const folderColors = [
  "245 75% 60%", // Primary blue
  "260 80% 65%", // Accent purple  
  "142 76% 36%", // Green
  "25 95% 53%",  // Orange
  "348 83% 47%", // Red
  "200 98% 39%", // Cyan
  "48 96% 53%",  // Yellow
  "280 100% 70%", // Magenta
];

export function CreateFolderDialog({ onCreateFolder, trigger }: CreateFolderDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(folderColors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    onCreateFolder({
      name: name.trim(),
      description: description.trim() || undefined,
      color: selectedColor,
    });

    // Reset form
    setName("");
    setDescription("");
    setSelectedColor(folderColors[0]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            Nova Pasta
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[400px] bg-gradient-card border-0 shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Criar Nova Pasta
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">Nome da Pasta</Label>
            <Input
              id="folderName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Projeto Website, Estudos React..."
              className="border-input/50 focus:border-primary transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="folderDescription">Descrição (opcional)</Label>
            <Textarea
              id="folderDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição do projeto ou pasta..."
              className="min-h-[80px] border-input/50 focus:border-primary transition-colors resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Cor da Pasta</Label>
            <div className="flex flex-wrap gap-2">
              {folderColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? "border-foreground scale-110" 
                      : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: `hsl(${color})` }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Criar Pasta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}