---
title: Creating a type from nested interface properties in TypeScript
date: 2019-12-09T21:00:31.998Z
thumbnail: /uploads/riccardo-pelati-omwqmd0-n6c-unsplash.jpg
excerpt: In Typescript you can create a new type from deep properties on an interface.
---
While at work I was upgrading [graphql-code-generator](https://graphql-code-generator.com/), and found that the generated code no longer exports the type for a query node. Instead, the type of the whole query response was exported. But I had code that relied on having the node type available. 

To solve this, I created a new type by reading attributes from deep in the response type.

```
interface Foo {
    bar: {
        baz: {
            zap: {
                zoop: number;
            }[];
        };
    };
}

type zoop = Foo['bar']['baz']['zap'][number]['zoop'];
```
