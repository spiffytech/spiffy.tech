---
title: Using a GraphQL Subscription with Vanilla JS
date: 2019-07-22T16:07:27.674Z
thumbnail: /uploads/isaac-smith-at77q0njnt0-unsplash.jpg
excerpt: >-
  Here's a lightweight way to make GraphQL queries that supports subscriptions,
  without heavy client libraries.
---
I was looking for a way to use GraphQL subscriptions without Apollo, Relay, urql, or any other heavy libraries or frameworks that were locked to React. It turns out you can use Apollo's `subscriptions-transport-ws` library by itself, without the rest of the framework. You can use it for both Subscriptions and for Query/Mutation.

Here's an example of making an authenticated GraphQL subscription request:

```
import gql from 'graphql-tag';
import {SubscriptionClient} from 'subscriptions-transport-ws';

const wsclient = new SubscriptionClient(
  'wss://example.com',
  {
      reconnect: true,
      connectionParams: {
        headers: {
          'Authorization': `Bearer foobar`,
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
