import { getThoughts } from "@/lib/thoughts"
import { ThoughtForm } from "@/components/thought-form"
import { ThoughtCard } from "@/components/thought-card"
import { SparklesIcon } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function Page() {
  const thoughts = await getThoughts()

  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-1">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <SparklesIcon className="size-5" />
          Thoughts
        </h1>
        <p className="text-sm text-muted-foreground">
          Share your thoughts and inspire the world.
        </p>
      </header>

      <ThoughtForm />

      <div className="flex flex-col gap-4">
        {thoughts.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No thoughts yet. Be the first to share one!
          </p>
        ) : (
          thoughts.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} />
          ))
        )}
      </div>
    </div>
  )
}
