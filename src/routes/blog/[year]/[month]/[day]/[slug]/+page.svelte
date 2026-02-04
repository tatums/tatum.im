<script>
  import Fa from 'svelte-fa';
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

  export let data;
  $: ({ post } = data);
</script>

<article>
  <header>
    <h1>{post.title}</h1>
    <span class="post-date">
      <Fa icon={faCalendarAlt} /> { post.formattedDate }
    </span>
  </header>
  {@html post.html}
</article>
