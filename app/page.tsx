import { listProjects } from "@/lib/api";

export default async function Home() {
  const projects = await listProjects();

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>My MVPs v2</h1>
      <h2 style={{color: "red"}}>typ o smiesznej nazwie zrobil commita tej twojej stronki </h2>
      <p>Projects:</p>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <b>{p.name}</b> — {p.status} — {new Date(p.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
