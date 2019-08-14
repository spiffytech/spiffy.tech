---
title: Understanding nested for loops in JavaScript
date: 2019-05-12T16:03:09.640Z
thumbnail: /uploads/priscilla-du-preez-fosina4f7qm-unsplash.jpg
excerpt: >-
  Are you having trouble understanding nested for loops in JavaScript? Just
  can't get it into your head? Here's how they work.
---
```
for (let outer = 0; outer < 3; outer += 1) {
    for (let inner = 0; inner < 3; inner += 1) {
        console.log('outer:', outer, 'inner:', inner);
    }
}
```

This prints:

```
outer: 0 inner: 0
outer: 0 inner: 1
outer: 0 inner: 2
outer: 1 inner: 0
outer: 1 inner: 1
outer: 1 inner: 2
outer: 2 inner: 0
outer: 2 inner: 1
outer: 2 inner: 2
```

Notice one important thing: Each time we run one iteration of the `outer` loop, we run the entire `inner` loop to completion. See how inner counts `0 1 2` while outer remains at `0` for all three steps? Then outer increments to `1` and we run `inner` again. 

Nested for loops run the entire innermost loop all the way, then increment the next-innermost loop, and run the innermost again. 
