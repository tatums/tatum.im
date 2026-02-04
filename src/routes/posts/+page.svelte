<script>
  import Fa from 'svelte-fa';
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

  export let data;
  $: ({ posts, currentPage, pagesCount } = data);
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
  <a href="/blog/page/{pagesCount == currentPage ? currentPage : currentPage + 1}" class="button next-btn" disabled={pagesCount == currentPage}>
    <span>Next</span>
  </a>
</section>
