# Content Authoring

This site treats content as files. Blog posts live in Astro content collections, and presentations are rendered from a small metadata file plus raw PNG exports.

## Blog Posts

Add Markdown files under `src/content/blog`.

```txt
src/content/blog/my-post.md
src/content/blog/my-series/part-1.md
```

Use this frontmatter:

```yaml
---
title: "Post Title"
date: 2026-05-21
description: "Short summary used on cards, RSS, and metadata."
tags: ["tag-one", "tag-two"]
draft: false
canonicalUrl: "https://medium.com/p/example"
series: "Series Title"
seriesOrder: 1
---
```

`series` and `seriesOrder` are optional. If present, the blog index groups the post into a series row. Nested folders are supported, so a file at `src/content/blog/speaking-into-existence/part-1.md` becomes `/blog/speaking-into-existence/part-1`.

## Presentations

Each presentation needs one metadata file and one public image folder. The folder name and metadata filename must match.

```txt
src/content/presentations/my-talk.md
public/presentations/my-talk/
  slide-1.png
  slide-2.png
  slide-3.png
public/presentations/my-talk.pptx
```

Use this frontmatter:

```yaml
---
title: "My Talk"
description: "What the talk covers and who it was built for."
tags: ["AI", "Security"]
order: 120
deckFile: "/presentations/my-talk.pptx"
source: "powerpoint"
draft: false
---
```

Only `title` and `description` are required. `tags`, `order`, `deckFile`, `source`, and `draft` are optional.

The viewer discovers every `.png` file in `public/presentations/{slug}` at build time and sorts them naturally. These all work:

```txt
slide-1.png, slide-2.png, slide-10.png
Slide1.PNG, Slide2.PNG, Slide10.PNG
1.png, 2.png, 10.png
```

This means Gamma and PowerPoint exports can be dropped directly into the folder without renaming, as long as the exported images are PNG files and the folder slug matches the metadata file.

If a metadata file exists but its public folder has no PNG files, the deck is skipped so the public viewer does not show a broken presentation.

## Validation

Run this before publishing:

```sh
npm run build
```

Astro validates content frontmatter and fails the build if required fields are missing or malformed.