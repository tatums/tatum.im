<script lang="ts">
  import { formatDate } from "$lib/utils";
  import type { PageProps } from './$types';
   import Fa from 'svelte-fa'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
  export let data;
</script>

{#each data.posts as post, index}
  <article class="blog-post">
    <header>
      <h2>
        <a href={post.postPath}>{post.title}</a>
      </h2>
      <span class="post-date">
        <Fa icon={faCalendarAlt} />
        { post.formattedDate }
      </span>
      <img src={post.image} alt="blog banner" />
    </header>
    <div>
      <svelte:component this={post.html} />
    </div>

  </article>

  {#if (index + 1) != data.posts.length}
    <hr class="article" />
  {/if}
{/each}

<section class="pagination-controls">
  <a href="/blog/page/{data.page == 1 ? data.page : data.page - 1}" class="button prev-btn" disabled={data.page == 1}>
    <span>Previous</span>
  </a>
  <a href="/blog/page/{data.pagesCount == data.page ? data.page : data.page + 1}" class="button next-btn" disabled={data.pagesCount == data.page}>
    <span>Next</span>
  </a>
</section>
