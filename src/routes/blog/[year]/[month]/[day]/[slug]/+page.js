import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {
  const url = `/blog/${params.slug}.json`;
  const res = await fetch(url);
  const post = await res.json();

  if (res.ok) {
    return { post };
  }

  throw error(500, `Could not load ${url}`);
}
