<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`pages.json`).then(r => r.json()).then(pages => {
			return { pages };
		});
	}
</script>

<script>
	export let pages;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Pages</title>
</svelte:head>

<h1>All Pages</h1>

<ul>
	{#each pages as page}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='blog/{page.slug}'>{page.title}</a></li>
	{/each}
</ul>
