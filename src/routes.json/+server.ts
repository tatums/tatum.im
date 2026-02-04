import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export async function GET({ url }) {
  const page = url.searchParams.get('page') || '1';
  const postsResp = await getPosts(parseInt(page));
  return json(postsResp);
}
