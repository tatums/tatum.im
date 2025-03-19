import type { ServerLoadEvent } from '@sveltejs/kit';
import {getPosts} from '$lib/posts';

export async function load({ }: ServerLoadEvent) {
  return await getPosts()
}
