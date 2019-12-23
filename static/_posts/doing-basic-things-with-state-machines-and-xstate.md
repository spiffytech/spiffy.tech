---
title: Doing basic things with state machines and xstate
date: 2019-12-23T15:37:26.239Z
thumbnail: /uploads/garett-mizunaka-xfjti9ryilo-unsplash.jpg
excerpt: >-
  The xstate library is powerful, but complicated to learn. I try to simplify it
  with a real-world example.
---
# Introduction
I have been learning to use xstate, and I found the docs pretty impenetrable. They introduce many new primitives without adequately explaining why you would reach for them.

Here I will attempt to explain xstate in the context of loading a page of data, either through an HTTP request or a websocket.

# Concepts
- Machine: A static bundle of states and context. You will define your machine, but will not directly interact with it.
- Interpreter: Runs your machine. Manages state transitions, events, and side effects.
- States: Your machine can be in one of several "states", such as 'loading', 'loaded', and 'error'. States can be nested into substates.
- Context: An object that holds variables representing information your machine needs to function. Similar to React's component state. Context is controlled by actions.
- Actions: _Cannot transition your machine_. One-off work that happens when you transition to a new state. Commonly used for updating machine context.
- Events: _Can transition your machine_. This is how you control your machine's state. You will fire events into your machine, and event handlers will respond by transitioning states and running actions. Events can be sent by button clicks, event handlers, or anything imperative.

# Fetching data

# Using a websocket

# Bonus: pagination
