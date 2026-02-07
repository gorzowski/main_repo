import { Project } from "@/types/project";

export const projects: Project[] = [
  { id: "p1", name: "Landing v1", status: "active", createdAt: new Date().toISOString() },
  { id: "p2", name: "Admin panel prototype", status: "draft", createdAt: new Date().toISOString() },
];
