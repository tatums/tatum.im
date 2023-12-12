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
  <title>tatum.im</title>
  <link rel="me" href="https://github.com/tatums">
</svelte:head>

<main class="landing">
  <section class="introduction">
    <div class="me">
      <img src="https://avatars.githubusercontent.com/u/72979?v=4" />
    </div>
    <p>
     Hi! My name is <span>Tatum Szymczak</span> and this is my blog.
     I'm a software engineer and I've been doing this since 2000. Work @ <a href="https://scholasticahq.com/">Scholastica</a>. I write code - mostly in ruby.
      I sometimes, althought not to often, I write about things here.
      I love good cheese, I always root for an under-dog, and I love a good movie.
    </p>
    <p>
        If you want to chat, you can find me on
        <a href="https://github.com/tatums">Github</a> or <a href="https://twitter.com/tatumszymczak">Twitter.</a>
    </p>
    <hr>
  </section>

  <section class="recent-posts">
    <h2>Recent posts</h2>
    <ul>
    {#each posts as post, index}
      <li class="blog-post">
        <span class="post-date">{ post.formattedDateShort }</span>
        <a class="recent-post" href={post.postPath}>{post.title}</a>
      </li>
    {/each}
    </ul>
    <div>
    <a class="all-posts" href="/blog/page/1">← All posts</a>
    </div>
  </section>
</main>
