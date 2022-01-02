<script context="module">
  import '../app.scss'
  export const prerender = true;
  import Fa from 'svelte-fa'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch }) {
    const currentPage = page.query.get('page') || 1

    console.log('currentPage', currentPage)
    const resp = await fetch(`/index.json`);
    const data = await resp.json()

    if (resp.ok) {
      return { props: { posts: data.posts } };
    }
    return {
      status: resp.status,
      error: new Error(`Could not load`)
    };
  }

</script>

<script>
  export let posts;
  let currentPage = 1

  const handleClick = async () => {
    currentPage += 1
    const resp = await fetch(`/index.json?page=${currentPage}`);
    const data = await resp.json()
    if (resp.ok) {
      console.log('ok -> ', data.posts)
      // posts = posts.concat(data.posts)
      posts = data.posts

      const url = new URL(window.location.toString());
      // https://dev.to/mohamadharith/mutating-query-params-in-sveltekit-without-page-reloads-or-navigations-2i2b
      // TODO improve this?
      url.searchParams.set(encodeURIComponent('page'), encodeURIComponent(currentPage));
      history.replaceState({}, '', url);

      window.scrollTo({ top: 0, behavior: "smooth" });

    } else {
      console.log('NOT OK ->', resp)
    }
  }
</script>

<svelte:head>
  <title>tatum.im</title>
</svelte:head>


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
    <div> {@html post.html} </div>
  </article>
{/each}

<section class="controls">
  <button class="button" on:click={handleClick}>
    <span>Next</span>
    </button>
</section>
