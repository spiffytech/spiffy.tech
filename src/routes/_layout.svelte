<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		flex-basis: 56rem;
	}
</style>

<div class="flex w-full bg-cover flex-col items-center"
  style={`background: linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url("/images/carbon.png")`}>

  <Nav {segment}/>

    <main style="max-width: 56rem;">
      <slot></slot>
    </main>

  <footer>
      <a href="/pages" style="visibility: hidden">Pages</a>
  </footer>
</div>
