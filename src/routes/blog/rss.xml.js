import fm from 'front-matter';
import glob from 'glob';
import {fs} from 'mz';
import path from 'path';
import RSS from 'rss';

export async function get(req, res) {
  const posts = await new Promise((resolve, reject) =>
      glob('static/_posts/*.md', (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    }),
  );

  const postsFrontMatter = await Promise.all(
    posts.map(async post => {
      const content = (await fs.readFile(post)).toString();
      return {...fm(content).attributes, slug: path.parse(post).name};
    }),
  );

  const feed = new RSS({
    title: 'spiffy.tech',
    feed_url: 'https://spiffy.tech/blog/rss.xml',
    site_url: 'https://spiffy.tech',
    pubdate: new Date()
  });

  postsFrontMatter.forEach(post => feed.item({
    title: post.title,
    description: post.excerpt,
    url: `https://spiffy.tech/blog/${post.slug}`,
    date: new Date(post.date)
  }));

  res.writeHead(200, {
    'Content-Type': 'application/rss+xml'
  });
  res.end(feed.xml({indent: true}));
}
