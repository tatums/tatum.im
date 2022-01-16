import { getPosts } from '$lib/posts';

export async function get({ url }) {
  const page = url.searchParams.get('page') || 1
  const postsResp = await getPosts(parseInt(page))
  return {
    status: 200,
    body: JSON.stringify(postsResp)
  };
}
