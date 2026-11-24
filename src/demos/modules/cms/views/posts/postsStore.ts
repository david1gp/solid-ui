import { createSignal } from "solid-js"

export type Post = {
  id: string
  title: string
  excerpt: string
  content: string
  status: "draft" | "published" | "archived"
  date: string
  deleted: boolean
}

const today = new Date().toISOString().slice(0, 10)
const postDate = (monthOffset: number, day: number) => {
  const now = new Date()
  const date = new Date(now.getFullYear(), now.getMonth() + monthOffset, day)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
const seedPosts: Array<Pick<Post, "title" | "status">> = [
  { title: "Produktupdate im Überblick", status: "published" },
  { title: "So arbeiten wir zusammen", status: "draft" },
  { title: "Einblicke in die Redaktion", status: "published" },
  { title: "Tipps für den Einstieg", status: "published" },
  { title: "Interview mit dem Designteam", status: "draft" },
  { title: "Unsere Ziele für das Quartal", status: "published" },
  { title: "Rückblick auf die Community", status: "archived" },
  { title: "Neue Funktionen entdecken", status: "draft" },
  { title: "Häufig gestellte Fragen", status: "published" },
  { title: "Hinter den Kulissen", status: "draft" },
  { title: "Nachhaltigkeit im Alltag", status: "published" },
  { title: "Veranstaltungen und Termine", status: "draft" },
  { title: "Die Geschichte unseres Teams", status: "archived" },
  { title: "Praxisbeispiele unserer Kunden", status: "published" },
  { title: "Ein Leitfaden für neue Ideen", status: "draft" },
  { title: "Highlights aus der Entwicklung", status: "published" },
  { title: "Unsere nächsten Schritte", status: "draft" },
  { title: "Wissen teilen im Team", status: "published" },
  { title: "Rückblick auf das letzte Jahr", status: "archived" },
  { title: "Menschen und ihre Projekte", status: "published" },
  { title: "Fragen an die Redaktion", status: "draft" },
  { title: "Neuigkeiten aus der Community", status: "published" },
]
const [posts, setPosts] = createSignal<Post[]>([
  {
    id: "1",
    title: "Willkommen im CMS",
    excerpt: "Ein erster Einblick in unsere Inhalte.",
    content: "<p>Willkommen im CMS.</p>",
    status: "published",
    date: today,
    deleted: false,
  },
  {
    id: "2",
    title: "Neuigkeiten aus dem Team",
    excerpt: "Aktuelles und Geschichten aus dem Team.",
    content: "<p>Unsere neuesten Geschichten.</p>",
    status: "draft",
    date: today,
    deleted: false,
  },
  {
    id: "3",
    title: "Ein Blick zurück",
    excerpt: "Ein Beitrag aus dem Archiv.",
    content: "<p>Ein Blick zurück.</p>",
    status: "archived",
    date: today,
    deleted: false,
  },
  ...seedPosts.map((post, index) => ({
    ...post,
    id: String(index + 4),
    excerpt: `Einblicke und Neuigkeiten: ${post.title}.`,
    content: `<p>${post.title} – mehr über dieses Thema erfahren.</p>`,
    date: postDate(index % 2, 1 + ((index * 3) % 28)),
    deleted: false,
  })),
])

export const postsStore = {
  posts,
  save(post: Post) {
    setPosts((all) =>
      all.some((p) => p.id === post.id) ? all.map((p) => (p.id === post.id ? post : p)) : [post, ...all],
    )
  },
  update(id: string, changes: Partial<Post>) {
    setPosts((all) => all.map((p) => (p.id === id ? { ...p, ...changes } : p)))
  },
  remove(id: string) {
    setPosts((all) => all.filter((p) => p.id !== id))
  },
}
