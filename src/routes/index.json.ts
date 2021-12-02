import { getPosts } from '$lib/posts';

export async function get() {
  // load progressive? like only load the first 4 then load the others on scroll?
  //
  // https://github.com/matfantinel/matfantinel.github.io/blob/main/src/routes/posts.json.js
  //
  const posts = await getPosts()
  return {
    status: 200,
    body: JSON.stringify({ posts: posts })
  };
}
