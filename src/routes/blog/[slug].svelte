<script context="module">
  import '../../app.scss'
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch, session, stuff }) {
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


<h1>{post.title}</h1>

{@html post.html}

