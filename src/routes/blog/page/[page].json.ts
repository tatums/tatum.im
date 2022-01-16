import { getPosts } from '$lib/posts';

export async function get({ params }) {
  const { page } = params
  const n = parseInt(page)
  const data  = await getPosts(n)

  return {
    status: 200,
    body: JSON.stringify(data),
  };
}
