---
title: A Minimal Svelte Router
date: 2019-07-12T16:05:41.950Z
thumbnail: /uploads/javier-allegue-barros-c7b-exxpoie-unsplash.jpg
excerpt: Here is a minimal router for Svelte v3 using Page.js.
---
Here is a minimal router for Svelte v3 using Page.js.

Whenever the route changes, Page.js sets a variable that holds the component that should be rendered for the route.

```javascript
<script>
  import page from 'page';

  import Home from './views/Home.svelte';

  let route;
  let routeParams;

  function setRoute(r) {
    return function({ params }) {
      route = r;
      routeParams = params;
    };
  }

  page("/", setRoute(Home));
  page({ hashbang: true });
</script>

<svelte:component this={route} bind:params={routeParams} /
```
