export type NoteType = "note" | "reminder" | "project";

export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  dueDate?: Date;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}