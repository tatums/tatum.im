<script context="module">
  import '../app.scss'
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch, session }) {
    const url = `/index.json`;
    const res = await fetch(url);
    const data = await res.json()

    // console.log('res', JSON.stringify(data))

    if (res.ok) {
      return { props: { posts: data.posts } };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>tatum.im</title>
</svelte:head>

{#each posts as post}
  <article class="blog-post">
    <header>
      <h2>
        <a href={'/blog/' + post.slug}> {post.title} </a>

        <code>{Object.keys(post)} </code>
        <!--
        <a href={post.path.replace('.svelte.md', '')}> {post.title} </a>
        -->
      </h2>

      <span class="post-date">
        { post.date }
      </span>

      <hr />

      <p class="post-meta">
        <!--
        {@html post.html}
        {JSON.stringify(post)}
        -->
      </p>

    </header>

    <div>
        {@html post.html}
     </div>

  </article>
{/each}
