---
title: Creating a bottom nav with CSS Flexbox
date: 2019-10-01T00:34:13.696Z
thumbnail: /uploads/jez-timms-hc9opzxkugg-unsplash.jpg
excerpt: How to create a bottom nav with just Flexbox and pure CSS
---
I needed to create a bottom nav (like what's used in many mobile apps) in CSS. Here's how I did it:

([CodePen](https://codepen.io/spiffytech/pen/GRKbyjg))

```html
<div class="container">
  <div class="content">
    <p>bar</p>
    <p>bar</p>
    <p>bar</p>
  </div>
  <nav>
    <p>foo</p>
    <p>foo</p>
    <p>foo</p>  
    <p>foo</p>
  </nav>
</div>
```

```css
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1 1 auto;
  overflow: auto;
  align-self: stretch;
}
```
