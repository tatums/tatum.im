<script lang="ts">
  import '../app.scss';
  let { children } = $props();
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0" />
  <meta name="description" content="Random thoughts from a web developer.">
  <title>tatum.im</title>
</svelte:head>

{@render children()}
