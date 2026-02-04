import { json } from '@sveltejs/kit';
import { getPost } from '$lib/posts';

export async function GET({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  return json(post);
}
