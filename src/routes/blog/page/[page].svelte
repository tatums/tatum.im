<script context="module">
  import '../../../app.scss'
  import Fa from 'svelte-fa'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, fetch }) {
    const resp = await fetch(`/blog/page/${params.page}.json`);
    const data = await resp.json()

    if (resp.ok) {
      return {
        props: {
          posts: data.posts,
          currentPage: data.page,
          pagesCount: data.pagesCount
        }
      };
    }
    return {
      status: resp.status,
      error: new Error(`Could not load`)
    };
  }
</script>

<script>
  export let posts;
  export let currentPage;
  export let pagesCount
  import { goto } from '$app/navigation';
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



<section class="pagination-controls">
  <a href="/blog/page/{currentPage == 1 ? currentPage : currentPage - 1}" class="button prev-btn" disabled={currentPage == 1}>
    <span>Previous</span>
  </a>
  <!--
  <span class="info"> page {currentPage} of {pagesCount} </span>
  -->
  <a href="/blog/page/{pagesCount == currentPage ? currentPage : currentPage + 1}" class="button next-btn" disabled={pagesCount == currentPage}>
    <span>Next</span>
  </a>
</section>
