<script>
  import Fa from 'svelte-fa';
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

  export let data;
  $: ({ posts, currentPage, pagesCount } = data);
</script>

<svelte:head>
  <title>tatum.im</title>
</svelte:head>

<main class="post">
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
    {#if pagesCount == currentPage}
      <span class="button prev-btn disabled"><span>Older</span></span>
    {:else}
      <a href="/blog/page/{currentPage + 1}" class="button prev-btn"><span>Older</span></a>
    {/if}
    {#if currentPage == 1}
      <span class="button next-btn disabled"><span>Newer</span></span>
    {:else}
      <a href="/blog/page/{currentPage - 1}" class="button next-btn"><span>Newer</span></a>
    {/if}
  </section>
</main>
