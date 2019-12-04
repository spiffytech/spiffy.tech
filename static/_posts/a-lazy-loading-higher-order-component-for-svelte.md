---
title: A lazy-loading higher-order component for Svelte
date: 2019-12-04T01:25:46.950Z
thumbnail: /uploads/kate-stone-matheson-uy5t-cjuik4-unsplash.jpg
excerpt: >-
  I show how to lazy-load content in Svelte by wrapping your lazy content inside
  a component that detects when it's visible
---
  Recently, while building a simple Reddit clone, I wanted to lazy-load images and comments. That is, rather that loading all of the images and comments the instant I added a component to the DOM, I wanted to wait until the component was actually visible. This spreads out the impact of loading a page, both for the client and the server.

To do this, I used the `IntersectionObserver` API to create a higher-order Svelte component:

**VisibilityGuard.svelte**:

```html
<script>
  import { onMount } from "svelte";

  let el = null;

  let visible = false;
  let hasBeenVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      console.log("entry", entries[0]);
      visible = entries[0].isIntersecting;
      hasBeenVisible = hasBeenVisible || visible;
    });
    observer.observe(el);

    return () => observer.unobserve(el);
  });
</script>

<div bind:this={el}>
  <slot {visible} {hasBeenVisible} />
</div>
```

This renders a `div` and stores the rendered HTML element in the `el` variable. Once the component has been rendered (`onMount`), we use `IntersectionObserver` to watch the component, calling a callback whenever the element intersects with our viewport. We track whether the element is _currently_ visible, and whether it has _ever been_ visible, and we pass those to our child component (`slot`).

So how do we use this component?

**App.html**:

```html
<script>
	import VisibilityGuard from './VisibilityGuard.svelte';
	
	const images = new Array(100).fill(null).map((n, i) => [
		Math.floor(Math.random() * 500),
		Math.floor(Math.random() * 750)
	]);
</script>

{#each images as [x, y]}
	<VisibilityGuard let:hasBeenVisible>
		<div style="border: 1px solid black; min-height: 40px; min-width: 40px; padding: 5px; border-radius: 5px; margin-bottom: 5px;">
			<header>I am {hasBeenVisible ? 'visible' : 'invisible'}</header>
			<img src={hasBeenVisible ? `https://placekitten.com/${x}/${y}` : null} alt="a kitten" />
		</div>
	</VisibilityGuard>
{/each}
```

We import the `VisibilityGuard` component and use it to wrap our image. The `let:hasBeenVisible` directive declares a new variable that comes from our higher-order component, and we use that to determine whether to display our image (by setting or not setting a `src` attribute).

And that's that! [Here's a REPL of this in action](https://svelte.dev/repl/d19802ee38b84436824f4daccea9d307?version=3.16.0).
