import { Project } from "@/types/project";
import { projects } from "@/mocks/data";

const USE_MOCK = true;

export async function listProjects(): Promise<Project[]> {
  if (USE_MOCK) return projects;

  // docelowo: fetch("/api/projects") albo call do backendu
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
}
