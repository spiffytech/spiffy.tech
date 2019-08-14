<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`_posts/${params.slug}.md`);

    if (res.status === 200) {
      return { postMd: await res.text() };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import fm from 'front-matter';
  import hljs from 'highlight.js';
  import MarkdownIt from 'markdown-it';
  import {afterUpdate} from 'svelte';

  import Newsletter from '../../components/Newsletter.svelte';

  export let postMd;

  afterUpdate(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });

  const md = new MarkdownIt();

  $: frontMatter = fm(postMd);
  $: post = {
    ...frontMatter.attributes,
    html: md.render(frontMatter.body)
  };
</script>

<style>
	.content :global(h1) {
	font-weight: 700;
	font-size: 1.5rem;
}

.content :global(*) {
	margin-bottom: 1.25rem;
}
</style>

<svelte:head>
  <title>{post.title}</title>
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/styles/github.min.css">
</svelte:head>

<h1 class="p-5 shadow rounded-lg mb-5 font-bold text-3xl bg-cover" style={`background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("${post.thumbnail}")`}>{post.title}</h1>

<section class="content p-5 shadow rounded-lg" style={`background: linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url("${post.thumbnail}")`}>
  {@html post.html}

  <Newsletter />
</section>

