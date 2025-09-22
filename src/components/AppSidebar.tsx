import { useState } from "react";
import { Folder as FolderIcon, Settings, Plus, MoreHorizontal, Edit3, Trash2 } from "lucide-react";
import { Logo } from "./Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreateFolderDialog } from "./CreateFolderDialog";
import { Folder } from "@/types";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onFolderSelect: (folderId: string | null) => void;
  onCreateFolder: (folder: Omit<Folder, "id" | "createdAt" | "updatedAt">) => void;
  onDeleteFolder: (folderId: string) => void;
}

export function AppSidebar({ 
  folders, 
  selectedFolderId, 
  onFolderSelect, 
  onCreateFolder,
  onDeleteFolder 
}: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleFolderAction = (action: string, folderId: string) => {
    if (action === "delete") {
      onDeleteFolder(folderId);
    }
    // TODO: Implement edit functionality
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className={cn("p-4", isCollapsed && "p-2")}>
        {!isCollapsed ? (
          <Logo size="sm" />
        ) : (
          <Logo size="sm" showText={false} className="justify-center" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={cn("flex items-center justify-between", isCollapsed && "justify-center")}>
            {!isCollapsed && "Minhas Pastas"}
            {!isCollapsed && (
              <CreateFolderDialog 
                onCreateFolder={onCreateFolder}
                trigger={
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="h-3 w-3" />
                  </Button>
                }
              />
            )}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {/* All Notes Item */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onFolderSelect(null)}
                  isActive={selectedFolderId === null}
                  tooltip={isCollapsed ? "Todas as Anotações" : undefined}
                >
                  <div className="w-3 h-3 rounded-sm mr-2 bg-gradient-primary" />
                  {!isCollapsed && <span>Todas as Anotações</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Folder Items */}
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <div className="flex items-center w-full group/folder">
                    <SidebarMenuButton
                      onClick={() => onFolderSelect(folder.id)}
                      isActive={selectedFolderId === folder.id}
                      tooltip={isCollapsed ? folder.name : undefined}
                      className="flex-1"
                    >
                      <div 
                        className="w-3 h-3 rounded-sm mr-2"
                        style={{ backgroundColor: `hsl(${folder.color})` }}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{folder.name}</span>
                      )}
                    </SidebarMenuButton>
                    
                    {!isCollapsed && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 opacity-0 group-hover/folder:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleFolderAction("edit", folder.id)}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleFolderAction("delete", folder.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapsed state: Add Folder Button */}
        {isCollapsed && (
          <div className="p-2">
            <CreateFolderDialog 
              onCreateFolder={onCreateFolder}
              trigger={
                <Button variant="ghost" size="sm" className="w-full h-10" asChild>
                  <div>
                    <Plus className="h-4 w-4" />
                  </div>
                </Button>
              }
            />
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}