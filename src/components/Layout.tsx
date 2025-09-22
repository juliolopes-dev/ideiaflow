import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Folder } from "@/types";

interface LayoutProps {
  children: React.ReactNode;
  folders: Folder[];
  selectedFolderId: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onCreateFolder: (folder: Omit<Folder, "id" | "createdAt" | "updatedAt">) => void;
  onDeleteFolder: (folderId: string) => void;
}

export function Layout({ 
  children, 
  folders, 
  selectedFolderId, 
  onFolderSelect,
  onCreateFolder,
  onDeleteFolder 
}: LayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar 
          folders={folders}
          selectedFolderId={selectedFolderId}
          onFolderSelect={onFolderSelect}
          onCreateFolder={onCreateFolder}
          onDeleteFolder={onDeleteFolder}
        />
        
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center px-4 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
                {selectedFolderId 
                  ? folders.find(f => f.id === selectedFolderId)?.name || "Pasta"
                  : "Todas as Anotações"
                }
              </h1>
            </div>
          </header>
          
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}