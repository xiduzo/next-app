"use server"

import { revalidatePath } from "next/cache"
import { createThought } from "@/lib/thoughts"

const MAX_LENGTH = 500

export async function postThought(formData: FormData) {
  const content = formData.get("content")

  if (typeof content !== "string" || content.trim().length === 0) {
    return { error: "Please write something before posting." }
  }

  if (content.trim().length > MAX_LENGTH) {
    return { error: `Thoughts must be ${MAX_LENGTH} characters or fewer.` }
  }

  await createThought(content.trim())
  revalidatePath("/")
  return { success: true }
}
