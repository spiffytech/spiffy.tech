---
title: Setting up Sapper with Netlify CMS
date: 2019-08-14T21:45:54.873Z
thumbnail: /uploads/todd-quackenbush-XBxQZLNBM0Q-unsplash.jpg
excerpt: >-
  You can create a static site with a web-based CMS using Netlify and Sapper,
  hosted for free!
---
We'll be following the directions from [Netlify's website](https://www.netlifycms.org/docs/add-to-your-site/).

# The Basics

1. Create your project by cloning the Sapper template project

```
npx degit "sveltejs/sapper-template#webpack" my-site
cd my-site
```
2. Go ahead and commit and push this to Github so you can create your Netlify project:

```
git init
git add .
git commit -am "Degit'd the Sapper starter project"
git remote add origin git@github.com:spiffytech/sapper-netlify-cms-starter.git
git push
```

3. Go to Netlify and create a project:


2. Install the Netlify CMS code

Create the directory `static/admin` and create `index.html` inside it:

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

3. Configure Netlify for your project

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
    folder: "static/_posts/blog" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{slug}}" # Filename template, e.g., title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "blog"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Body", name: "body", widget: "markdown"}
```

4. Set up Netlify authentication

  * Follow [Netlify's directions](https://www.netlifycms.org/docs/add-to-your-site/#enable-identity-and-git-gateway) to activate Identity and connect your git account to your Netlify project
  * We need to add the Netlify Identity code to both our admin page (so we can log in) and our main site (so it can redirect us back to the admin after we log in).

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
  * You'll also need to add this snippet to the top of your `src/routes/index.svelte`:

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
