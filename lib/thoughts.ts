import { readFile, writeFile, mkdir } from "node:fs/promises"
import { join } from "node:path"

export interface Thought {
  id: string
  content: string
  createdAt: string
}

const DATA_DIR = join(process.cwd(), ".data")
const DATA_FILE = join(DATA_DIR, "thoughts.json")

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true })
  try {
    await readFile(DATA_FILE, "utf-8")
  } catch {
    await writeFile(DATA_FILE, "[]", "utf-8")
  }
}

export async function getThoughts(): Promise<Thought[]> {
  await ensureDataFile()
  const raw = await readFile(DATA_FILE, "utf-8")
  const thoughts: Thought[] = JSON.parse(raw)
  return thoughts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function createThought(content: string): Promise<Thought> {
  const thoughts = await getThoughts()
  const thought: Thought = {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date().toISOString(),
  }
  thoughts.push(thought)
  await writeFile(DATA_FILE, JSON.stringify(thoughts, null, 2), "utf-8")
  return thought
}
