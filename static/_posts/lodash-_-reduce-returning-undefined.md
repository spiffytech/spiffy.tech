---
title: Lodash _.reduce returning undefined
date: 2019-02-08T17:01:03.225Z
thumbnail: /uploads/holger-link-xfko2aakc3a-unsplash.webp
excerpt: >-
  Say you're using Lodash's _.reduce method to check each item in an array, but
  it's returning 'undefined'. Here's the fix!
---
# The issue
Say you have a method which receives an array, and you use Lodash's `_.reduce` to check each item one by one. But `_.reduce` is returning `undefined`. Here's an example:

```javascript
console.log(
	_.reduce(
  	[{toBeCounted: 1}, {toBeCounted: 0}],
    function(total, item) 
      {
        if (item.toBeCounted !== 0){
          return total + 1;
        }
      },
    0
  )
);

// Prints 'undefined'
```

# The fix
When you use `_.reduce` (or the ES6 `Array.prototype.reduce`), you must _always_ return a value from your reducer function. Here's the corrected code:

``javascript
console.log(
	_.reduce(
  	[{toBeCounted: 1}, {toBeCounted: 0}],
    function(total, item) 
      {
        if (item.toBeCounted !== 0){
          return total + 1;
        }
        return total;  // This is the fix
      },
    0
  )
);

// Prints `1`
```
