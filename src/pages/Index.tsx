import { useState, useMemo } from "react";
import { CreateNoteDialog } from "@/components/CreateNoteDialog";
import { NoteCard, Note, NoteType } from "@/components/NoteCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Lightbulb, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data para demonstração
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Estudar React Hooks",
    content: "Revisar useState, useEffect e custom hooks. Praticar com projetos pequenos.",
    type: "note",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    tags: ["react", "javascript", "estudos"],
  },
  {
    id: "2",
    title: "Reunião com cliente",
    content: "Apresentar proposta do novo sistema. Discutir timeline e orçamento.",
    type: "reminder",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    dueDate: new Date("2024-01-20"),
    tags: ["trabalho", "cliente"],
  },
  {
    id: "3",
    title: "App de Receitas",
    content: "Criar aplicativo para organizar receitas favoritas. Features: busca, categorias, favoritos, lista de compras.",
    type: "project",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-16"),
    tags: ["app", "receitas", "mobile"],
  },
];

const Index = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NoteType | "all">("all");
  const { toast } = useToast();

  const handleCreateNote = (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotes(prev => [newNote, ...prev]);
    toast({
      title: "Anotação criada!",
      description: "Sua anotação foi salva com sucesso.",
    });
  };

  const handleEditNote = (note: Note) => {
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade de edição será implementada em breve.",
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast({
      title: "Anotação excluída",
      description: "Sua anotação foi removida com sucesso.",
      variant: "destructive",
    });
  };

  const filteredNotes = useMemo(() => {
    let filtered = notes;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(note => note.type === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [notes, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = {
      all: notes.length,
      note: notes.filter(n => n.type === "note").length,
      reminder: notes.filter(n => n.type === "reminder").length,
      project: notes.filter(n => n.type === "project").length,
    };
    return counts;
  }, [notes]);

  const stats = useMemo(() => {
    const today = new Date();
    const overdueReminders = notes.filter(note => 
      note.type === "reminder" && 
      note.dueDate && 
      note.dueDate < today
    ).length;

    return {
      total: notes.length,
      reminders: notes.filter(n => n.type === "reminder").length,
      projects: notes.filter(n => n.type === "project").length,
      overdue: overdueReminders,
    };
  }, [notes]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Minhas Anotações
          </h1>
          <p className="text-muted-foreground text-lg">
            Organize suas ideias, lembretes e projetos em um só lugar
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <p className="text-xs text-muted-foreground">anotações salvas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lembretes</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.reminders}</div>
              {stats.overdue > 0 && (
                <Badge variant="destructive" className="text-xs mt-1">
                  {stats.overdue} atrasado{stats.overdue > 1 ? 's' : ''}
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos</CardTitle>
              <Lightbulb className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.projects}</div>
              <p className="text-xs text-muted-foreground">ideias capturadas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtividade</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">+24%</div>
              <p className="text-xs text-muted-foreground">esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar por título, conteúdo ou tags..."
            />
          </div>
          <div className="flex gap-4">
            <CreateNoteDialog onCreateNote={handleCreateNote} />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            counts={categoryCounts}
          />
        </div>

        {/* Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-gradient-card border-0 shadow-soft text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                {searchQuery ? (
                  <>
                    <h3 className="text-lg font-medium mb-2">Nenhuma anotação encontrada</h3>
                    <p>Tente buscar por outros termos ou limpe o filtro de busca.</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-2">Nenhuma anotação ainda</h3>
                    <p>Crie sua primeira anotação para começar a organizar suas ideias!</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
