---
title: Using a GraphQL Subscription with Vanilla JS
date: 2019-07-22T16:07:27.674Z
thumbnail: /uploads/isaac-smith-at77q0njnt0-unsplash.webp
excerpt: Here's a lightweight way to make GraphQL queries that supports
  subscriptions, without heavy client libraries.
---
I've been working on a project that uses GraphQL via Hasura. Using Subscriptions (real-time updates to queries) is a key feature for my project, but it's one that most of the simpler GraphQL client libraries don't support. That leaves me looking at heavyweight tools Apollo. Apollo is pretty complicated to configure (I'm paying for a lot of features I don't use), and it \_strongly\_ steers you towards React hooks for accessing data; I had to dig pretty hard to find the documentation for their language-agnostic client library. I've really come to believe data fetches shouldn't be represented declaratively, at least not the way React hooks handles it. The ergonomics are poor and the flexibility is low every time I try it. 

So I went looking for a GraphQL client that could handle GraphQL subscriptions, which was simple to set up and worked great when used imperatively.

[Edit: since originally writing this, I see urql is (now?) designed for more than just React use, and has docs for imperative, non-framework-specific usage (though that's clearly not what they're steering you towards). It looks simpler to set up, though I haven't tried it yet.]

The solution I settled on was to use the same underlying library that powers Apollo's subscriptions feature. It's simple to use from vanilla JS, and can be used for `Query`, `Mutation` and `Subscription`. The package is `subscriptions-transport-ws`.

Here's an example of making an authenticated GraphQL subscription request:

```javascript
import gql from 'graphql-tag';
import {SubscriptionClient} from 'subscriptions-transport-ws';

const wsclient = new SubscriptionClient(
  'wss://example.com',
  {
      reconnect: true,
      connectionParams: {
        headers: {
          'Authorization': `Bearer <your token here>`,
        }
      },
    }
);

wsclient.request({
  query: gql`
    fragment transaction on transactions {
      id
      user_id
    }
    subscription SubscribeTransactions($user_id: String!) {
      transactions(where: { user_id: { _eq: $user_id } }) {
        ...transaction
      }
    }
  `,
  variables: { user_id: 'capncrunch' }
  // Don't forget to check for an `errors` property in the next() handler
}).subscribe({next: console.log, error: console.error})
```