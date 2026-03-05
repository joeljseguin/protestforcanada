import Link from "next/link";
import "../globals.css";

export default function InfluenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "240px",
          background: "#f3f3f3",
          borderRight: "1px solid #ddd",
          padding: "1.5rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Influence</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link href="/influence/missions">Missions</Link>
          <Link href="/influence/hub">Action Hub</Link>
          <Link href="/influence/topics">Topics</Link>
          <Link href="/influence/truth">Truth Vault</Link>
          <Link href="/influence/network">Network</Link>
          <Link href="/influence/maze">Maze</Link>
          <Link href="/influence/profile">Profile</Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
