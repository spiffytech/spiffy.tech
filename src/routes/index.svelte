<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { onMount } from 'svelte';

  export let posts;

  onMount(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  });
</script>

<svelte:head>
  <title>Sapper project template</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js">

  </script>
</svelte:head>

{#each posts as post}
  <a href={`blog/${post.slug}`}>
    <article
      class="p-5 mb-5 shadow rounded-lg bg-cover"
      style={`background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("${post.thumbnail}")`}>
      <heading class="font-bold text-2xl">{post.title}</heading>
      <p>{post.excerpt}</p>
    </article>
  </a>
{/each}
