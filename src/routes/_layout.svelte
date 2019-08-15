<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
</style>

<div class="flex w-full bg-cover flex-col items-center"
  style={`background: linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url("/images/carbon.png")`}>

  <Nav {segment}/>

  <main class="w-5/6 md:w-3/4 lg:w-2/3">
      <slot></slot>
    </main>

  <footer>
      <a href="/pages" style="visibility: hidden">Pages</a>
  </footer>
</div>
