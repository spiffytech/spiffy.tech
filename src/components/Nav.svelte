<script>
  export let segment;
</script>

<nav class="flex items-center">
  <heading class="font-bold text-2xl float-left mx-3">spiffy.tech</heading>

  <ul>
    <li class="float-left mx-3">
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li>
    <li class="float-left mx-3">
      <a class={segment === 'about' ? 'selected' : ''} href="about">about</a>
    </li>
    <li class="float-left mx-3">
      <a class={segment === 'about' ? 'selected' : ''} href="mailto:hello@spiffy.tech?subject=Hello!&body=">drop me a line</a>
    </li>
  </ul>
</nav>
