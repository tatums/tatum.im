import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export async function GET({ params }) {
  const { page } = params;
  const n = parseInt(page);
  const data = await getPosts(n);

  return json(data);
}
