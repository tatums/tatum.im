<script context="module">
  import '../../../../../app.scss'
  import Fa from 'svelte-fa'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
  import { blur } from 'svelte/transition'
  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch }) {
    const url = `/blog/${page.params.slug}.json`;
    const res = await fetch(url);
    const post = await res.json()


    if (res.ok) {
      return {
        props: {
          post: post
        }
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    };
  }
</script>

<script>
  export let post;
</script>

<article transition:blur={{duration: 700}}>
  <header>
    <h1>{post.title}</h1>
		<span class="post-date">
      <Fa icon={faCalendarAlt} /> { post.formattedDate }
    </span>
  </header>
  {@html post.html}
</article>
