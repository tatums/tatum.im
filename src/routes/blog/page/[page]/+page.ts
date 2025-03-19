import {getPosts} from '$lib/posts';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load({ params }: ServerLoadEvent) {
  const page = Number(params.page || 1);
  return await getPosts(page)
}
