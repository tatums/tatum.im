<script context="module">
  import '../../../../../app.scss'
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch }) {
    const url = `/blog/${page.params.slug}.json`;
    const res = await fetch(url);
    const post = await res.json()


    if (res.ok) {
      return {
        props: {
          post: post
        }
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }
</script>

<script>
  export let post;
</script>

<article>
  <header>
    <h1>{post.title}</h1>
		<span class="post-date">{post.date}</span>
  </header>

{@html post.html}
</article>

