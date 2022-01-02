import { getPosts } from '$lib/posts';
//import { page } from '$app/stores';

export async function get({ query }) {

  const page = query.get('page') || 1

  // load progressive? Only load the first 4 then load the others on scroll?
  //
  // https://github.com/matfantinel/matfantinel.github.io/blob/main/src/routes/posts.json.js
  //
  const posts = await getPosts(page)

  console.log(posts[0].title)

  return {
    status: 200,
    body: JSON.stringify({ posts: posts })
  };
}
