"use server";

import { revalidatePath } from "next/cache";

export async function createPostAction(data: { title: string; body: string }) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании поста");
  }

  revalidatePath("/posts");
  
  return { success: true };
}