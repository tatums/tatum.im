<script context="module">
  import '../app.scss'
  import Fa from 'svelte-fa'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, fetch }) {
    const currentPage = params.page || 1
    const resp = await fetch(`/blog/page/${currentPage}.json`);
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
  currentPage = currentPage || 1
</script>




<svelte:head>
 <title>Posts</title>
</svelte:head>

<h2>Posts...</h2>

<section class="blog-posts">
  <h2>Latest posts</h2>

    {#each posts as post, index}
      <article class="blog-post">
        <span class="post-date">{ post.formattedDate }</span>
        <a href={post.postPath}>{post.title}</a>
      </article>
    {/each}
</section>

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
