import { error } from "@sveltejs/kit"
import type { ServerLoadEvent } from "@sveltejs/kit"
import { getPost } from "$lib/posts";

export const load = async ({ params }: ServerLoadEvent) => {
  try {
    const resp = await getPost(params.slug)
    return resp
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`)
  }
};
export const prerender = true;
