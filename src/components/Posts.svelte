<script>
  export let posts;
</script>

{#each posts as post}
  <a rel="prefetch" href={`blog/${post.slug}`}>
    <article
      class="p-5 mb-5 shadow rounded-lg bg-cover"
      style={`background: linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url("${post.thumbnail}")`}>
      <heading class="font-bold text-2xl">{post.title}</heading>
      <p>{post.excerpt}</p>
    </article>
  </a>
{/each}
