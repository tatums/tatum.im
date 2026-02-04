import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {
  const currentPage = params.page || 1;
  const resp = await fetch(`/blog/page/${currentPage}.json`);
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
