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
  .content :global(h1), .content :global(h2), .content :global(h3), .content :global(h4), .content :global(h5), .content :global(h6) {
    font-weight: 700;
  }

  .content :global(h1) {
    font-size: 1.875rem;
  }
  .content :global(h2) {
    font-size: 1.5rem;
  }
  .content :global(h3) {
    font-size: 1.25rem;
  }
  .content :global(h4) {
    font-size: 1.125rem;
  }

  .content :global(*) {
    margin-bottom: 1.25rem;
  }

  .content :global(img), .content :global(pre) :global(code) {
    border-radius: 0.5rem;
    border-color: #a0aec0;
    border-width: 2px;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/styles/github.min.css">
  <meta name="description" content={post.excerpt} />
</svelte:head>

<h1 class="p-5 shadow rounded-lg mb-5 font-bold text-3xl bg-cover border-2 border-gray-500" style={`background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("${post.thumbnail}")`}>{post.title}</h1>

<section class="content p-5 shadow rounded-lg border-2 border-gray-500" style={`background: linear-gradient(rgba(255,255,255,.85), rgba(255,255,255,.85)), url("${post.thumbnail}")`}>
  {@html post.html}

  <Newsletter />
</section>

