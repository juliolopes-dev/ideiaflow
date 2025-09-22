import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CreateNoteDialog } from "@/components/CreateNoteDialog";
import { EditNoteDialog } from "@/components/EditNoteDialog";
import { NoteCard } from "@/components/NoteCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Lightbulb, TrendingUp, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Note, NoteType, Folder } from "@/types";

// Mock data para demonstração
const mockFolders: Folder[] = [
  {
    id: "1",
    name: "Projeto Website",
    description: "Desenvolvimento do novo site da empresa",
    color: "245 75% 60%",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2", 
    name: "Estudos React",
    description: "Aprendizado e prática com React",
    color: "142 76% 36%",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-12"),
  },
];

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Definir arquitetura do sistema",
    content: "Revisar useState, useEffect e custom hooks. Praticar com projetos pequenos.",
    type: "note",
    folderId: "1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    tags: ["arquitetura", "sistema", "planejamento"],
  },
  {
    id: "2",
    title: "Reunião com cliente",
    content: "Apresentar proposta do novo sistema. Discutir timeline e orçamento.",
    type: "reminder",
    folderId: "1",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    dueDate: new Date("2024-01-20"),
    tags: ["trabalho", "cliente"],
  },
  {
    id: "3",
    title: "Estudar Hooks Avançados",
    content: "useReducer, useContext, useMemo, useCallback. Criar exemplos práticos.",
    type: "note",
    folderId: "2",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-16"),
    tags: ["react", "hooks", "estudos"],
  },
  {
    id: "4",
    title: "App de Receitas",
    content: "Criar aplicativo para organizar receitas favoritas. Features: busca, categorias, favoritos, lista de compras.",
    type: "project",
    folderId: "2",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-16"),
    tags: ["app", "receitas", "mobile"],
  },
];

const Index = () => {
  const [folders, setFolders] = useLocalStorage<Folder[]>("ideiaflow-folders", mockFolders);
  const [notes, setNotes] = useLocalStorage<Note[]>("ideiaflow-notes", mockNotes);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<NoteType | "all">("all");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Convert date strings back to Date objects when loading from localStorage
  useEffect(() => {
    const convertDates = (items: any[]) => {
      return items.map(item => ({
        ...item,
        createdAt: typeof item.createdAt === 'string' ? new Date(item.createdAt) : item.createdAt,
        updatedAt: typeof item.updatedAt === 'string' ? new Date(item.updatedAt) : item.updatedAt,
        dueDate: item.dueDate && typeof item.dueDate === 'string' ? new Date(item.dueDate) : item.dueDate,
      }));
    };

    // Only convert if we have items and they need conversion
    if (folders.length > 0 && folders[0].createdAt && typeof folders[0].createdAt === 'string') {
      console.log("Converting folder dates...");
      setFolders(convertDates(folders));
    }
    
    if (notes.length > 0 && notes[0].createdAt && typeof notes[0].createdAt === 'string') {
      console.log("Converting note dates...");
      setNotes(convertDates(notes));
    }
  }, []);

  const handleCreateFolder = (folderData: Omit<Folder, "id" | "createdAt" | "updatedAt">) => {
    const newFolder: Folder = {
      ...folderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setFolders(prev => [newFolder, ...prev]);
    setSelectedFolderId(newFolder.id);
    toast({
      title: "Pasta criada!",
      description: `A pasta "${newFolder.name}" foi criada com sucesso.`,
    });
  };

  const handleDeleteFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    const folderNotes = notes.filter(note => note.folderId === folderId);
    
    if (folderNotes.length > 0) {
      toast({
        title: "Erro",
        description: `Não é possível excluir a pasta "${folder?.name}" pois ela contém ${folderNotes.length} anotação(ões).`,
        variant: "destructive",
      });
      return;
    }

    setFolders(prev => prev.filter(f => f.id !== folderId));
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
    }
    
    toast({
      title: "Pasta excluída",
      description: `A pasta "${folder?.name}" foi removida com sucesso.`,
      variant: "destructive",
    });
  };

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
    console.log("Editando nota:", note);
    setEditingNote(note);
    setEditDialogOpen(true);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    console.log("Atualizando nota:", updatedNote);
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    toast({
      title: "Anotação atualizada!",
      description: "Suas alterações foram salvas com sucesso.",
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

    // Filter by folder
    if (selectedFolderId) {
      filtered = filtered.filter(note => note.folderId === selectedFolderId);
    }

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
  }, [notes, selectedFolderId, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const relevantNotes = selectedFolderId 
      ? notes.filter(n => n.folderId === selectedFolderId)
      : notes;

    const counts = {
      all: relevantNotes.length,
      note: relevantNotes.filter(n => n.type === "note").length,
      reminder: relevantNotes.filter(n => n.type === "reminder").length,
      project: relevantNotes.filter(n => n.type === "project").length,
    };
    return counts;
  }, [notes, selectedFolderId]);

  const stats = useMemo(() => {
    const relevantNotes = selectedFolderId 
      ? notes.filter(n => n.folderId === selectedFolderId)
      : notes;
    
    const today = new Date();
    const overdueReminders = relevantNotes.filter(note => 
      note.type === "reminder" && 
      note.dueDate && 
      note.dueDate < today
    ).length;

    return {
      total: relevantNotes.length,
      reminders: relevantNotes.filter(n => n.type === "reminder").length,
      projects: relevantNotes.filter(n => n.type === "project").length,
      overdue: overdueReminders,
    };
  }, [notes, selectedFolderId]);

  // Se uma pasta específica está selecionada mas não temos criar nova anotação, 
  // precisamos de uma pasta válida
  const currentFolderId = selectedFolderId || (folders.length > 0 ? folders[0].id : "default");

  return (
    <Layout
      folders={folders}
      selectedFolderId={selectedFolderId}
      onFolderSelect={setSelectedFolderId}
      onCreateFolder={handleCreateFolder}
      onDeleteFolder={handleDeleteFolder}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {selectedFolderId ? "nesta pasta" : "anotações salvas"}
              </p>
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
              <CardTitle className="text-sm font-medium">Pastas</CardTitle>
              <FolderOpen className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{folders.length}</div>
              <p className="text-xs text-muted-foreground">organizadas</p>
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
            {(selectedFolderId || folders.length > 0) && (
              <CreateNoteDialog 
                onCreateNote={handleCreateNote} 
                folderId={currentFolderId}
              />
            )}
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

        {/* Empty state for no folders */}
        {folders.length === 0 ? (
          <Card className="bg-gradient-card border-0 shadow-soft text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Nenhuma pasta criada ainda</h3>
                <p>Crie sua primeira pasta para começar a organizar suas anotações!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
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
                    ) : selectedFolderId ? (
                      <>
                        <h3 className="text-lg font-medium mb-2">Pasta vazia</h3>
                        <p>Esta pasta ainda não possui anotações. Crie sua primeira anotação!</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-2">Nenhuma anotação ainda</h3>
                        <p>Selecione uma pasta ou crie uma nova para começar!</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Edit Note Dialog */}
      <EditNoteDialog
        note={editingNote}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateNote={handleUpdateNote}
      />
    </Layout>
  );
};

export default Index;