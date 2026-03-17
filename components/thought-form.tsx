"use client"

import { useActionState } from "react"
import { postThought } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { SendIcon } from "lucide-react"
import { useRef, useEffect } from "react"

export function ThoughtForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, isPending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      const result = await postThought(formData)
      return result
    },
    null
  )

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <Card>
      <CardContent>
        <form ref={formRef} action={action} className="flex flex-col gap-3">
          <Textarea
            name="content"
            placeholder="What's on your mind? Share a thought to inspire the world..."
            maxLength={500}
            required
            rows={3}
          />
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              <SendIcon />
              {isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
