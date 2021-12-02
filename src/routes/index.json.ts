import path from 'path';

import { getPosts } from '$lib/posts';

export async function get() {
  const posts = await getPosts()

  //console.log('>>> posts', posts.length)

  // const { slug } = params;
  // const __dirname = path.resolve();
  // const location = path.join(__dirname, './src/routes/');
  // const articles = await getPostsContent(location);
  // const article = articles.find((element) => element.slug === slug);

  return {
    body: {
      posts: posts
    }
  };
}
