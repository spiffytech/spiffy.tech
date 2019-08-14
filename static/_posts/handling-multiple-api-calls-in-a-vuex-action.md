---
title: Handling multiple API calls in a Vuex action
date: 2019-02-07T16:57:24.482Z
thumbnail: /uploads/fezbot2000-gwhs2pim_u-unsplash.jpg
excerpt: >-
  Do you find yourself making more than one API call in your Vuex actions?
  Wondering the best way to handle this situation? Read on for a fix!
---
Do you find yourself making more than one API call in your Vuex actions? Wondering the best way to handle this situation? Best practices?

# The issue
Here's some example code where you may want to load all posts and all post categories:

```
fetchPosts({commit}) {
    commit('setLoadStatus', 'loading');
    axios.get('/posts').then((response) => {
        commit('setPosts', response.data);
        commit('setLoadStatus', 'success');
    }).catch((error) => commit('setLoadStatus', 'error'));
    
    axios.get('/categories').then((response) => {
        commit('setCategories', response.data);
        commit('setLoadStatus', 'success');
    }).catch((error) => commit('setLoadStatus', 'error'));
}
```

Can you see the issue here? You only want to proceed with commits if BOTH the first and second API call correctly fetch the data. In this example, you could get a `loadStatus` of `success` if ANY of the API calls succeed, _even if some of them fail_. That's no good!

# The solution
The solution is to use `Promise.all` so you only `commit` after all of the API calls are finished:

```
fetchPosts({commit}) {
    Promise.all([
        axios.get('/posts').then((response) => response.data),
        axios.get('/categories').then((response) => response.data),
    ]).then(([posts, categories]) => {
        commit('setPosts', posts);
        commit('setCategories', categories);
        commit('setLoadStatus', 'success');
    }).catch((error) => commit('setLoadStatus', 'error'));
}
```

`Promise.all` accepts an array of promises (and each `axios.get` returns a new promise), and waits for all of them to finish before calling the `.then` callback. This way, you only commit your data and your `loadStatus` once you know if _all_ of the API calls are successful, or if any of them failed.
# Come back soon!
For more JavaScript fixes, enter your email in the box at the bottom of this post and you'll get notified when I have more to share!
