---
title: Setting up Sapper with Netlify CMS
date: 2019-08-14T21:45:54.873Z
thumbnail: /uploads/todd-quackenbush-XBxQZLNBM0Q-unsplash.jpg
excerpt: >-
  You can create a static site with a web-based CMS using Netlify and Sapper,
  hosted for free!
---
# What are these things?

## Sapper

Sapper is Svelte's answer to Next.js/Nuxt.js. It's a way of rendering Svelte code on the server so your site is compatible with JavaScript-free devices, and renders immediately instead of waiting for a JS blob to download, parse, and run.

Sapper ordinarily runs as a full server application, but using the `sapper export` command we can generate a static version of our site that we can host on Github Pages or, in this case, Netlify. That's a great way to have a very fast site that's free for small-to-medium traffic numbers.

## Netlify CMS

Netlify CMS is as open-source content management system, meaning it's a way to create blog posts and web pages through a web page. Since it's from Netlify, the static site host, it's designed to work with static site generators like Hugo and Jekyll. We'll be adapting it to work with Sapper.

## Putting these together

Adapting Netlify CMS to work with Sapper is pretty straightforward. First we'll follow [Netlify's directions](https://www.netlifycms.org/docs/add-to-your-site/) for adding the CMS to a generic site. That'll give us a web interface that drops Markdown files into our Sapper site's git repository. Next, we'll update our Sapper site code to see those Markdown files and render them as blog posts.

You can copy/paste the same code changes we make in this tutorial to support adding entire pages to Sapper, or to add multiple content sections, like a personal and a professional blog.

Let's get started!

\* Note: If you want to skip all of this and just get something working, you can clone the [repository I made](https://github.com/spiffytech/sapper-netlify-cms-starter) for this tutorial.

# Let's do it - Netlify CMS

## Prepare your workspace

### Create a project

Start your project by cloning the Sapper template git repository.

```
npx degit "sveltejs/sapper-template#webpack" my-site
cd my-site
npm install
```

### Commit that project

Go ahead and commit and push this to Github so you can create your Netlify project, which is tied to your Git repo.

Create a new repository on Github, and substitute that URL in the fourth command.

```
git init
git add .
git commit -am "Degit'd the Sapper starter project"
git remote add origin <your github project URL here>
git push
```

## Go to Netlify and create a project

Now that we have a barebones Sapper project in Git, it's time to tell Netlify that we'd like to host that project. Sign up at Netlify.com and begin creating your new Netlify project.

![New site from Git](/uploads/screenshot-2019-08-14-at-18.19.49.png "Click the button to create a new site from a Git repo")

Click the button to create a new site from a Git repo.

![github](/uploads/screenshot-2019-08-14-at-18.19.57.png "Use Github as the source for your project. Netlify CMS only supports Github at this time.")

Use Github as the source for your project. Netlify CMS only supports Github at this time.

![project](/uploads/screenshot-2019-08-14-at-18.20.21.png "Select the repo you created in Github")

Select the repo you created in Github

![configure the app](/uploads/screenshot-2019-08-14-at-18.21.45.png "Configure your build process. Set the build command to generate the static Sapper site, and the publish directory to the directory where Sapper exports to.")

Configure your build process. Set the build command to generate the static Sapper site, and the publish directory to the directory where Sapper exports to.

## Install the Netlify CMS

Back in our workspace it's time to add the Netlify CMS code to our project.

### Add the CMS code

Create the directory `static/admin`, then add the below snippet to the file `static/admin/index.html`. This file contains the code that bootstraps the Netlify CMS.

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

### Configure Netlify CMS

Edit `static/admin/config.yml` and add the following:

```yaml
backend:
  name: git-gateway
  branch: master # Branch to update (optional; defaults to master)
publish_mode: editorial_workflow # Allows you to save drafts before publishing them
media_folder: static/uploads # Media files will be stored in the repo under static/images/uploads
public_folder: /uploads # The src attribute for uploaded media will begin with /images/uploads

collections:
  - name: "blog" # Used in routes, e.g., /admin/collections/blog
    label: "Blog" # Used in the UI
    folder: "static/_posts" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{slug}}" # Filename template, e.g., title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "blog"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Body", name: "body", widget: "markdown"}
```

## Set up Netlify authentication

We'll use Netlify's authentication service -- called "Identity" -- tot let users log into our CMS and create posts. We'll also wire up Netlify with write access to our Git repo so the CMS can actually add the content to the repo.

### Activate Identity

Follow [Netlify's directions](https://www.netlifycms.org/docs/add-to-your-site/#enable-identity-and-git-gateway) to activate Identity and connect your git account to your Netlify project. Also, invite yourself as a user to the project.

### Add Identity code to your site

We need to add the Netlify Identity code to both our admin page (so we can log in) and our main site (so it can redirect us back to the admin after we log in).

Take this snippet: `<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>`

And add it to the head section of your `static/admin/index.html`:

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
+ <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</body>
</html>
```

Also add it to the `<svelte:head>` section of your `src/routes/index.svelte`:

```
<svelte:head>
    <title>Sapper project template</title>
+   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</svelte:head>
```

3. You'll also need to add this snippet to the top of your `src/routes/index.svelte`:

```
<script>
  import { onMount } from 'svelte';

  onMount(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  });
</script>
```

## Success part 1!

Commit and push your code.

```
git add .
git commit -am "Configured the site to run the Netlify CMS"
git push
```

Wait for Netlify to deploy it, then visit your admin site (the URL will be your Netlify site + `/admin`, like https://awesome-bose-294ddb.netlify.com/admin), log in, and create a post! You won't see the post on your published site yet -- Sapper still doesn't know anything about the Netlify CMS content. Let's fix that!

# Lets do it - Sapper rendering markdown blog posts

Here's where the real work comes in. Sapper, out of the box, reads posts from a rather unwieldy `_posts.json` file. We're going to replace that with reading from Markdown files that Netlify CMS creates in our repo. 

## Install dependencies

You'll need to install a few packages for managing the markdown files:

`npm install mz glob markdown-it front-matter`

- `glob` makes it easy to get a list of Markdown files
- `mz` wraps the standard Node.js `fs` library in promises, so we can `async`/`await` our way to success
- `front-matter` reads the metadata out of our blog posts and separates it from the markdown content
- `markdown-it` will render our markdown content

## Update the `blog.json` server route

The built-in Sapper blog engine reads a list of all blog entries from the `/blog.json` server route, which is controlled by the `src/routes/blog/index.json.js` file. We're going to open that file and replace the whole thing with this:

```javascript
import fm from 'front-matter';
import glob from 'glob';
import {fs} from 'mz';
import path from 'path';

export async function get(req, res) {
  // List the Markdown files and return their filenames
  const posts = await new Promise((resolve, reject) =>
      glob('static/_posts/*.md', (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    }),
  );

  // Read the files and parse the metadata + content
  const postsFrontMatter = await Promise.all(
    posts.map(async post => {
      const content = (await fs.readFile(post)).toString();
      // Add the slug (based on the filename) to the metadata, so we can create links to this blog post
      return {...fm(content).attributes, slug: path.parse(post).name};
    }),
  );

  // Sort by reverse date, because it's a blog
  postsFrontMatter.sort((a, b) => (a.date < b.date ? 1 : -1));

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  // Send the list of blog posts to our Svelte component
  res.end(JSON.stringify(postsFrontMatter));
}
```

Now, when the `blog.json` server route is called, Sapper will scan the list of markdown files at `static/_posts/`, read the metadata for each one, and create a list of the blog titles, dates, and any other fields (besides content) that we added to our Netlify CMS `fields` section.

## Edit the per-post Svelte component

Next up, we need to update our Svelte component to fetch the Markdown files instead of the old JSON content, then render those files to HTML and present the content to the user.

### Remove an unused server route

Sapper provides a server route for extracting post content from the `_posts.js` file. Since we're not using that file, we need neither the file nor the server route. remove both:

```
cd src/routes/blog
rm _posts.js [slug].json.js
```

### Render markdown posts

Next, open `src/routes/blog/[slug].svelte` and replace both `<script>` blocks with this code:

```html
<script context="module">                                                                                                                                                                                                                                                                   
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`_posts/${params.slug}.md`);

    if (res.status === 200) {
      return { postMd: await res.text() };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import fm from 'front-matter';
  import MarkdownIt from 'markdown-it';

  export let postMd;

  const md = new MarkdownIt();

  $: frontMatter = fm(postMd);
  $: post = {
    ...frontMatter.attributes,
    html: md.render(frontMatter.body)
  };
</script>
```

We've changed the default Sapper code in two ways:

1. We fetch text from the server instead of JSON
2. We break up that text into metadata and content, and render the content. 

When we put the metadata and content back together, we're passing the rest of the Svelte component the same data it expected to get from the old `[slug].json.js` server route, and now everything renders!

## Success part 2!

### See our work in action

Our site now works! You can see it for yourself by running `npm run dev` and visiting http://localhost:3000 .

### Verify the exported site

If you want to verify your site exports correctly before committing and sending it to Netlify, you can do this:

```
npm run export
npx serve __sapper__/export
```

if the export command didn't produce any `500` messages, visit http://localhost:5000, click around and confirm that everything works like you expect.

### Send it to Netlify

```
git add .
git commit -am "Configured the site to read and publish markdown blog posts"
git push
```

After waiting for Netlify to publish your site, you can visit your site and see the glorious blog post you created earlier!

You're now all set with a hosted and operational Sapper blog!
