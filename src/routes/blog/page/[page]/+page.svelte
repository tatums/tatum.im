<script>
  import Fa from 'svelte-fa';
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

  export let data;
  $: ({ posts, currentPage, pagesCount } = data);
</script>

<svelte:head>
  <title>tatum.im</title>
</svelte:head>

{#each posts as post, index}
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

  {#if (index + 1) != posts.length}
    <hr class="article" />
  {/if}
{/each}

<section class="pagination-controls">
  <a href="/blog/page/{currentPage == 1 ? currentPage : currentPage - 1}" class="button prev-btn" disabled={currentPage == 1}>
    <span>Previous</span>
  </a>
  <a href="/blog/page/{pagesCount == currentPage ? currentPage : currentPage + 1}" class="button next-btn" disabled={pagesCount == currentPage}>
    <span>Next</span>
  </a>
</section>
