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

  import Newsletter from '../../components/Newsletter.svelte';

  export let postMd;

  const md = new MarkdownIt({
    highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="language-${lang} hljs">` +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
 
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});;

  const frontMatter = fm(postMd);
  const post = {
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

<h1 class="p-5 shadow rounded-lg mb-5 font-bold text-3xl bg-cover shadow-md text-white" style={`background-image: linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url("${post.thumbnail}")`}>{post.title}</h1>

<section class="content p-5 shadow rounded-lg shadow-md text-white bg-cover" style={`background-image: linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url("${post.thumbnail}")`}>
  {@html post.html}

  <Newsletter />
</section>

