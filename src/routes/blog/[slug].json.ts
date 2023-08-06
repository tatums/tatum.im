import { getPost } from '$lib/posts';

export async function GET({ params }) {
  const { slug } = params;

  const post = await getPost(slug)

  return {
    status: 200,
    body: JSON.stringify(post),
  };
}
