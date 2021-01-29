---
title: Azure Table Storage syntax error with equality operators
date: 2021-01-29T19:37:10.675Z
thumbnail: /uploads/sarah-kilian-52jrtc2s_ve-unsplash.webp
excerpt: Azure Table Storage queries don't accept `=` and `eq` in the same query.
---
If you get a syntax error for an Azure Table Storage query, it could be because although you can use the `=` operator, and the `eq` operator, you cannot use both inside the same query. The same goes for the other comparison operators.