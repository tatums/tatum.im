<script lang="ts">
  import type { PageProps } from './$types';
  export let data;
</script>

<svelte:head>
  <title>tatum.im</title>
  <link rel="me" href="https://github.com/tatums">
</svelte:head>

<main class="landing">
  <section class="introduction">
    <div class="me">
      <img alt="avatar" src="https://avatars.githubusercontent.com/u/72979?v=4" />
    </div>
    <p>
      Hi! My name is <span>Tatum Szymczak</span>, and this is my blog.
      I’m a software engineer, and I’ve been doing this since 2000. I work at <a href="https://scholasticahq.com/">Scholastica</a>. I write code—mostly in Ruby.
      Sometimes, though not too often, I write about things here.
      I love good cheese, always root for the underdog, and enjoy a good movie.
    </p>

    <p>
      If you want to chat, you can find me on <a href="https://github.com/tatums">Github</a>
      or <a href="https://twitter.com/tatumszymczak">Twitter.</a>.
    </p>
    <hr>
  </section>

  <section class="recent-posts">
    <h2>Recent posts</h2>

    <ul class="space-y-4">
      {#each data.posts as post}
        <li class="blog-post">
          <span class="post-date">{ post.formattedDateShort }</span>
          <a class="recent-post" href="/blog/{post.year}/{post.month}/{post.day}/{post.slug}">{post.title}</a>
        </li>
      {/each}
    </ul>

    <div>
      <a class="all-posts" href="/blog/page/1">← All posts</a>
    </div>
  </section>
</main>
