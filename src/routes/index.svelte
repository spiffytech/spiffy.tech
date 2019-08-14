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

  import Posts from '../components/Posts.svelte';

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

<div class="relative">
  <a href="/blog/rss.xml"><img src="/images/rss.png" alt="rss" class="w-8 h-8 absolute right-0" /></a>
  <Posts {posts} />
</div>
