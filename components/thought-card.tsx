import { Card, CardContent } from "@/components/ui/card"
import type { Thought } from "@/lib/thoughts"
import { formatDistanceToNow } from "date-fns"

export function ThoughtCard({ thought }: { thought: Thought }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <p className="whitespace-pre-wrap">{thought.content}</p>
        <time
          className="text-xs text-muted-foreground"
          dateTime={thought.createdAt}
        >
          {formatDistanceToNow(new Date(thought.createdAt), { addSuffix: true })}
        </time>
      </CardContent>
    </Card>
  )
}
