<script context="module">
  import '../app.scss'
  export const prerender = true;
  import Fa from 'svelte-fa'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch, session }) {

    const res = await fetch('/index.json');
    const data = await res.json()
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

<!--
<button on:click={handleClick}> Click me </button>
-->

{#each posts as post}

  <article class="blog-post">
    <header>
      <h2>
        <a href={post.postPath}>{post.title}</a>
      </h2>
      <span class="post-date">
        <Fa icon={faCalendarAlt} />
        { post.formattedDate }
      </span>
    </header>

    <div>
        {@html post.html}
     </div>

  </article>
{/each}
