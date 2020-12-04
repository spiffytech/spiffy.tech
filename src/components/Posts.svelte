<script>
  import geopattern from 'geopattern';

  export let posts;
</script>

{#each posts as post}
  <a rel="prefetch" href={`blog/${post.slug}`}>
    <article
      class="p-5 mb-5 shadow-md rounded-lg bg-cover text-white"
      style={`background-image: linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url("${post.thumbnail}")`}>
      <heading class="font-bold text-2xl">{post.title}</heading>
      <p>{post.excerpt}</p>
    </article>
  </a>
{/each}
