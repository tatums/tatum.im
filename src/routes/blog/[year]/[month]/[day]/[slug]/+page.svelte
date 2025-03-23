<script lang="ts">
  import Fa from 'svelte-fa'
  import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
  import { formatDate } from "$lib/utils";
  import type { PageProps } from './$types';
  export let data;
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<article>
  <header>
    <h1>{data.title}</h1>
    <span class="post-date">
      <Fa icon={faCalendarAlt} /> {data.formattedDate}
    </span>
    <img src={data.image} alt="blog banner" />
  </header>

  <svelte:component this={data.html} />
</article>
