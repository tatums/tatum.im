import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {
  const resp = await fetch(`/blog/page/${params.page}.json`);
  const data = await resp.json();

  if (resp.ok) {
    return {
      posts: data.posts,
      currentPage: data.page,
      pagesCount: data.pagesCount
    };
  }
  throw error(500, `Could not load`);
}
