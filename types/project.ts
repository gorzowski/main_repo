export type Project = {
  id: string;
  name: string;
  status: "draft" | "active" | "archived";
  createdAt: string; // ISO
};
