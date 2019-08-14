---
title: Setting up Sapper with Netlify CMS
date: 2019-08-14T21:45:54.873Z
thumbnail: /uploads/todd-quackenbush-XBxQZLNBM0Q-unsplash.jpg
excerpt: >-
  You can create a static site with a web-based CMS using Netlify and Sapper,
  hosted for free!
---
We'll be following the directions from [Netlify's website](https://www.netlifycms.org/docs/add-to-your-site/).

# Prepare your workspace

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

# Go to Netlify and create a project

![New site from Git](/uploads/screenshot-2019-08-14-at-18.19.49.png "Click the button to create a new site from a Git repo")

Click the button to create a new site from a Git repo.

![github](/uploads/screenshot-2019-08-14-at-18.19.57.png "Use Github as the source for your project. Netlify CMS only supports Github at this time.")

Use Github as the source for your project. Netlify CMS only supports Github at this time.

![project](/uploads/screenshot-2019-08-14-at-18.20.21.png "Select the repo you created in Github")

Select the repo you created in Github

![configure the app](/uploads/screenshot-2019-08-14-at-18.21.45.png "Configure your build process. Set the build command to generate the static Sapper site, and the publish directory to the directory where Sapper exports to.")

Configure your build process. Set the build command to generate the static Sapper site, and the publish directory to the directory where Sapper exports to.

# Install the Netlify CMS code

Back in your workspace it's time to add the Netlify CMS code to our project.

1. Create the directory `static/admin` and create `index.html` inside it. This file contains the code that bootstraps the Netlify CMS.

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

2. Configure Netlify for your project

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

# Set up Netlify authentication

We'll want to use Netlify's authentication service -- called "Identity" -- so that our CMS can authenticate with Netlify and use its APIs to publish content to our Git repo.

1. Follow [Netlify's directions](https://www.netlifycms.org/docs/add-to-your-site/#enable-identity-and-git-gateway) to activate Identity and connect your git account to your Netlify project

2. We need to add the Netlify Identity code to both our admin page (so we can log in) and our main site (so it can redirect us back to the admin after we log in).

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

# Success part 1!
If you commit and push your code, then wait for Netlify to deploy it, you should be able to visit your admin site (like https://awesome-bose-294ddb.netlify.com/admin), log in, and create a post! You won't see it on your published site yet, though -- Sapper still doesn't know anything about the Netlify CMS content.
