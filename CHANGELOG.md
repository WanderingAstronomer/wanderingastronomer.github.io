# Changelog

All notable changes to [wanderingastronomer.github.io](https://wanderingastronomer.github.io) are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — 2026-03-15

### Added
- **Blog series support** — `series` and `seriesOrder` fields added to blog content schema; posts in a named series are grouped into horizontal scroll carousels on the blog index, sorted ascending by `seriesOrder`, with an amber accent and amber-themed card styling distinct from standalone posts
- **Series carousels** — Each series block shows a `Series` badge, the series name, a part count, and a `scroll →` hint; cards snap-scroll left-to-right with a thin scrollbar
- **Articles divider** — A centered `——— Articles ———` rule visually separates series carousels from independent posts below
- **Series frontmatter** — "Speaking into Existence: 0" (`seriesOrder: 0`) and "Speaking into Existence: 1" (`seriesOrder: 1`) grouped under the "Speaking into Existence" series; "Examining Artificial Intelligence and Memory Architecture — Part 1" (`seriesOrder: 1`) starts the "Examining AI & Memory Architecture" series
- **Blog post images restored** — 19 images stripped during the Medium → Markdown conversion have been reinserted across 6 posts: `examining-ai-memory-architecture-part-1` (1), `a-bit-of-a-journey` (1), `vociferous-v3-a-personal-milestone` (1), `shadows-at-the-summit` (4), `speaking-into-existence-0` (4), `speaking-into-existence-1` (8); orphaned figcaption text converted to italic Markdown below each image

### Fixed
- Part labels on series cards now reflect 0-based `seriesOrder` directly (removed erroneous +1 offset)

---

## [1.0.0] — 2026-03-15

Full portfolio site launch. Built from scratch with Astro 6, Svelte 5, and TypeScript.

### Added

#### Pages
- **Homepage** — Hero with animated star field (Svelte), about section with photo + sidebar, contact section with email/phone/socials
- **Skills & Tools** — 6-category grid: Languages, Frameworks & Tools, Infrastructure, Security, AI/ML, Monitoring — with tech icons
- **Projects** — Featured Vociferous card with screenshot, Synapse.sql, TCP Canvas Pages, Bookbot
- **Achievements** — Split into Cybersecurity (NCL rankings, Cyber Skyline report viewer) and Programming (commit stats, presentations delivered, GitHub heatmap, certifications)
- **Experience** — Timeline layout with 5 positions (Wittenbach, Cennox, ICS, Starry NOC, Starry Installer)
- **Leadership & Teaching** — President of Programming SIG, Senior Officer of CySec SIG, NCL Team Leader
- **Presentations** — Interactive slide viewer with sidebar navigation, keyboard controls, fullscreen, .pptx download — 11 presentation decks converted to 2K PNG slides
- **Blog index** — Featured hero card for latest post, 2-column grid, tag filtering, reading time estimates, Medium badges
- **Blog post template** — Reading progress bar, metadata row (date + reading time + "View on Medium"), prev/next post navigation

#### Blog Posts (7 published)
- "Speaking into Existence: 1" — Mar 13, 2026
- "Speaking into Existence: 0" — Mar 12, 2026
- "Vociferous v3: A Personal Milestone in Learning How to Build Carefully" — Jan 22, 2026
- "Shadows at the Summit" — Nov 23, 2025
- "A Bit of a Journey" — Jul 24, 2025
- "Examining Artificial Intelligence and Memory Architecture — Part 1" — Jun 11, 2025
- "What Finally Got Me Writing (Hint: It Wasn't Confidence)" — May 21, 2025

#### Infrastructure
- GitHub Pages deployment via `deploy.yml` (Node 22, `upload-pages-artifact@v3`, `deploy-pages@v4`)
- Astro content collections for blog with schema validation (title, date, description, tags, draft, canonicalUrl)
- Global design system: deep space theme, CSS custom properties, glassmorphism cards, scroll-reveal animations
- Site-wide footer with 6 social links (GitHub, LinkedIn, YouTube, Boot.dev, Medium, Email)

#### Components
- `StarField.svelte` — Canvas-based animated star field with parallax
- `PresentationViewer.svelte` — Full slide deck viewer with sidebar, keyboard nav, fullscreen
- NCL report viewer — Vanilla JS tabbed viewer for Cyber Skyline PDFs (4-tab horizontal bar, page navigation, fullscreen, download)
- GitHub contribution heatmap — Dark-themed via CSS filter inversion

### Design
- **Typography** — Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **Color palette** — Deep navy (`#060c1a`), card surfaces (`#111b2e`), cyan accent (`#00d9ff`), amber accent (`#ff9d3d`)
- **Motion** — Scroll-reveal animations, hover lifts with glow, smooth page transitions
- **Responsive** — All pages adapt to mobile with single-column layouts at 768px breakpoint
