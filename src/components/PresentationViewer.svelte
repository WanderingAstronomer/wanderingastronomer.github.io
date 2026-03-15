<script>
  let selectedIndex = $state(0);
  let slideIndex = $state(0);
  let viewerEl;

  // Flat list — no categories
  const presentations = [
    {
      slug: 'intro-to-ai-act-1',
      title: 'An Introduction to Artificial Intelligence — Act 1',
      description: 'Part one of a two-act series. Covered the landscape of modern AI: ML paradigms (supervised, unsupervised, reinforcement), how neural networks are structured and trained, the role of data, and why the current moment in AI development is historically unusual. Framed for students with no prior ML background.',
      tags: ['AI / ML', 'Conceptual'],
      slideCount: 30,
    },
    {
      slug: 'intro-to-ai-act-2',
      title: 'An Introduction to Artificial Intelligence — Act 2',
      description: 'The follow-up. Went deeper on backpropagation, transformer architecture, retrieval-augmented generation, AI ethics under deployment pressure, and frontier model capabilities. Closed with a practical framing of how to think about AI as a tool vs. a replacement.',
      tags: ['AI / ML', 'Architecture', 'Ethics'],
      slideCount: 36,
    },
    {
      slug: 'github-fundamentals-pt1',
      title: 'The Fundamentals of GitHub — Part 1',
      description: 'What version control is for and why it matters before you need it. Covered repositories, commits, branches, and the mental model of a working tree. Exercises done live in the terminal.',
      tags: ['Git', 'Tooling'],
      slideCount: 11,
    },
    {
      slug: 'github-fundamentals-pt2',
      title: 'The Fundamentals of GitHub — Part 2',
      description: 'Merging, rebasing, resolving conflicts, and pull request workflows. Emphasized the difference between how Git works locally vs. how teams use it collaboratively, and why those distinctions produce most of the confusion.',
      tags: ['Git', 'Collaboration'],
      slideCount: 12,
    },
    {
      slug: 'github-fundamentals-pt3',
      title: 'The Fundamentals of GitHub — Part 3',
      description: 'GitHub Actions, branch protection, code review conventions, and project organization. Gave attendees a working CI pipeline by the end of the session.',
      tags: ['Git', 'CI/CD', 'Automation'],
      slideCount: 9,
    },
    {
      slug: 'never-bad-at-programming',
      title: 'You Were Never "Bad" at Programming',
      description: "A talk for students who feel like they're behind. Examined why the feeling of being bad at programming is almost universal, where it comes from, how it differs from actually being bad at something, and what productive learning in this field actually looks like. One of the most-discussed sessions I've delivered.",
      tags: ['Mindset', 'Learning'],
      slideCount: 9,
    },
    {
      slug: 'hashing-made-simple',
      title: 'Hashing Made Simple',
      description: 'Demystified cryptographic hashing for a mixed-background audience. Walked through toy hash functions, collision generation, the avalanche effect, bcrypt for password storage, and rainbow table lookups — with live CLI demos from the Explore-Hashing tool built specifically for this session.',
      tags: ['Cryptography', 'Security'],
      slideCount: 23,
    },
    {
      slug: 'physical-security-for-soc',
      title: 'Physical Security for SOC Analysts',
      description: "Drew from 3.5 years of field experience servicing electronic security systems inside bank branches — DMP alarm panels, vault door hardware, IP cameras, access control. Bridged the physical layer to the threat model: how physical access defeats logical controls, what SOC analysts miss when they've never been on a job site, and why the security stack starts at the door.",
      tags: ['Physical Security', 'SOC', 'Field Experience'],
      slideCount: 14,
    },
    {
      slug: 'what-to-expect-in-ncl',
      title: 'What to Expect in NCL',
      description: 'Pre-competition briefing built from first-hand Fall 2025 experience. Covered category breakdown (OSINT, log analysis, password cracking, network forensics, web app exploitation, cryptography), scoring strategy, how to allocate time, and what separates teams that place from teams that stall.',
      tags: ['CTF', 'NCL', 'Security'],
      slideCount: 19,
    },
    {
      slug: 'osint-review',
      title: 'OSINT Review',
      description: 'A focused review session on open-source intelligence techniques for competitive cybersecurity. Covered reconnaissance methodology, search operators, metadata extraction, social media profiling, and domain/IP enumeration — with practical walkthroughs from real CTF challenges.',
      tags: ['OSINT', 'Security', 'CTF'],
      slideCount: 8,
    },
    {
      slug: 'risk-rules-recovery',
      title: 'Risk, Rules & Recovery — CompTIA Security+ Domain 5',
      description: 'Study session covering Security+ Domain 5: governance, risk, and compliance. Walked through risk management frameworks, security policies, incident response procedures, disaster recovery planning, and business continuity — tailored for students preparing for the certification exam.',
      tags: ['Security+', 'GRC', 'Certification'],
      slideCount: 37,
    },
  ];

  let current = $derived(presentations[selectedIndex]);

  function selectPresentation(i) {
    selectedIndex = i;
    slideIndex = 0;
  }

  function prevSlide() {
    if (slideIndex > 0) slideIndex--;
  }

  function nextSlide() {
    if (slideIndex < current.slideCount - 1) slideIndex++;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      viewerEl?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'Escape' && document.fullscreenElement) document.exitFullscreen();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="pv-layout">
  <!-- Sidebar selector -->
  <aside class="pv-sidebar">
    <h3 class="pv-sidebar-heading">Presentations</h3>
    <ul class="pv-list">
      {#each presentations as pres, i}
        <li>
          <button
            class="pv-list-btn"
            class:pv-list-btn--active={i === selectedIndex}
            onclick={() => selectPresentation(i)}
          >
            {pres.title}
          </button>
        </li>
      {/each}
    </ul>
  </aside>

  <!-- Main viewer -->
  <div class="pv-main">
    <div class="pv-viewer" bind:this={viewerEl}>
      <!-- Slide area (16:9) -->
      <div class="pv-slide-wrap">
        <div class="pv-slide">
          <img
            src="/presentations/{current.slug}/slide-{slideIndex + 1}.png"
            alt="{current.title} — Slide {slideIndex + 1} of {current.slideCount}"
            class="pv-slide-img"
          />
        </div>

        <!-- Navigation arrows -->
        <button
          class="pv-arrow pv-arrow--left"
          onclick={prevSlide}
          disabled={slideIndex === 0}
          aria-label="Previous slide"
        >&#8249;</button>
        <button
          class="pv-arrow pv-arrow--right"
          onclick={nextSlide}
          disabled={slideIndex === current.slideCount - 1}
          aria-label="Next slide"
        >&#8250;</button>
      </div>

      <!-- Controls bar -->
      <div class="pv-controls">
        <span class="pv-slide-counter">
          {slideIndex + 1} / {current.slideCount}
        </span>
        <div class="pv-controls-right">
          <button class="pv-btn" onclick={toggleFullscreen} aria-label="Toggle fullscreen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            Fullscreen
          </button>
          <a
            class="pv-btn pv-btn--download"
            href="/presentations/{current.slug}.pptx"
            download
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download .pptx
          </a>
        </div>
      </div>
    </div>

    <!-- Info below viewer -->
    <div class="pv-info">
      <h2 class="pv-title">{current.title}</h2>
      <p class="pv-desc">{current.description}</p>
      <div class="pv-tags">
        {#each current.tags as tag}
          <span class="pill pill--neutral">{tag}</span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .pv-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-xl);
    min-height: 70vh;
  }

  /* Sidebar */
  .pv-sidebar {
    border-right: 1px solid var(--border);
    padding-right: var(--space-lg);
    max-height: 80vh;
    overflow-y: auto;
  }

  .pv-sidebar-heading {
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-md);
  }

  .pv-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pv-list-btn {
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    font-size: var(--text-sm);
    line-height: 1.4;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .pv-list-btn:hover {
    background: var(--bg-card);
    color: var(--text-primary);
  }

  .pv-list-btn--active {
    background: var(--bg-card);
    color: var(--cyan);
    border-left: 2px solid var(--cyan);
  }

  /* Main viewer area */
  .pv-viewer {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .pv-viewer:fullscreen {
    display: flex;
    flex-direction: column;
    background: #000;
  }

  .pv-viewer:fullscreen .pv-slide-wrap {
    flex: 1;
  }

  .pv-slide-wrap {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .pv-slide {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
  }

  .pv-slide-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  /* Arrows */
  .pv-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: #fff;
    font-size: 2rem;
    width: 44px;
    height: 64px;
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: background 0.15s;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pv-arrow:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.75);
  }

  .pv-arrow:disabled {
    opacity: 0.25;
    cursor: default;
  }

  .pv-arrow--left { left: var(--space-md); }
  .pv-arrow--right { right: var(--space-md); }

  /* Controls bar */
  .pv-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    border-top: 1px solid var(--border);
    background: var(--bg-surface);
  }

  .pv-slide-counter {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-muted);
  }

  .pv-controls-right {
    display: flex;
    gap: var(--space-sm);
  }

  .pv-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    font-size: var(--text-xs);
    padding: 6px 12px;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
    text-decoration: none;
  }

  .pv-btn:hover {
    border-color: var(--border-hover);
    color: var(--text-primary);
  }

  .pv-btn--download {
    color: var(--amber);
  }

  .pv-btn--download:hover {
    color: var(--amber-dim);
  }

  /* Info below viewer */
  .pv-info {
    margin-top: var(--space-xl);
  }

  .pv-title {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--space-sm);
  }

  .pv-desc {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    line-height: 1.7;
    max-width: 52rem;
    margin-bottom: var(--space-md);
  }

  .pv-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }

  @media (max-width: 800px) {
    .pv-layout {
      grid-template-columns: 1fr;
    }

    .pv-sidebar {
      border-right: none;
      border-bottom: 1px solid var(--border);
      padding-right: 0;
      padding-bottom: var(--space-md);
      max-height: none;
    }

    .pv-list {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .pv-list-btn {
      font-size: var(--text-xs);
      padding: var(--space-xs) var(--space-sm);
    }
  }
</style>
