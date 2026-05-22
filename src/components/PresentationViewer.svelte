<script>
  let { presentations = [] } = $props();

  let selectedIndex = $state(0);
  let slideIndex = $state(0);
  let viewerEl;

  let current = $derived(presentations[selectedIndex]);
  let currentSlide = $derived(current?.slides[slideIndex]);

  function buildGroups(pres) {
    const result = [];
    const seen = new Map();
    pres.forEach((p, i) => {
      if (p.series) {
        if (!seen.has(p.series)) {
          const group = { type: 'series', name: p.series, items: [] };
          seen.set(p.series, group);
          result.push(group);
        }
        seen.get(p.series).items.push({ index: i, title: p.title });
      } else {
        result.push({ type: 'single', index: i, title: p.title });
      }
    });
    return result;
  }

  let sidebarGroups = $derived(buildGroups(presentations));

  function selectPresentation(i) {
    selectedIndex = i;
    slideIndex = 0;
  }

  function prevSlide() {
    if (slideIndex > 0) slideIndex--;
  }

  function nextSlide() {
    if (slideIndex < current.slides.length - 1) slideIndex++;
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

{#if presentations.length === 0}
  <p class="pv-empty">No rendered presentation slides are available yet.</p>
{:else}
<div class="pv-layout">
  <!-- Sidebar selector -->
  <aside class="pv-sidebar">
    <h3 class="pv-sidebar-heading">Presentations</h3>
    <ul class="pv-list">
      {#each sidebarGroups as group}
        {#if group.type === 'series'}
          <li class="pv-series-group">
            <span class="pv-series-label">{group.name}</span>
            <ul class="pv-series-list">
              {#each group.items as item}
                <li>
                  <button
                    class="pv-list-btn pv-list-btn--part"
                    class:pv-list-btn--active={item.index === selectedIndex}
                    onclick={() => selectPresentation(item.index)}
                  >
                    {item.title}
                  </button>
                </li>
              {/each}
            </ul>
          </li>
        {:else}
          <li>
            <button
              class="pv-list-btn"
              class:pv-list-btn--active={group.index === selectedIndex}
              onclick={() => selectPresentation(group.index)}
            >
              {group.title}
            </button>
          </li>
        {/if}
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
            src={currentSlide.src}
            alt="{current.title} - Slide {slideIndex + 1} of {current.slides.length}"
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
          disabled={slideIndex === current.slides.length - 1}
          aria-label="Next slide"
        >&#8250;</button>
      </div>

      <!-- Controls bar -->
      <div class="pv-controls">
        <span class="pv-slide-counter">
          {slideIndex + 1} / {current.slides.length}
        </span>
        <div class="pv-controls-right">
          <button class="pv-btn" onclick={toggleFullscreen} aria-label="Toggle fullscreen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            Fullscreen
          </button>
          {#if current.deckFile}
            <a
              class="pv-btn pv-btn--download"
              href={current.deckFile}
              download
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download .pptx
            </a>
          {/if}
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
{/if}

<style>
  .pv-empty {
    color: var(--text-secondary);
    font-size: var(--text-sm);
    line-height: 1.7;
    text-align: center;
  }

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

  /* Series grouping in sidebar */
  .pv-series-group {
    margin-bottom: var(--space-xs);
  }

  .pv-series-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: var(--space-sm) var(--space-md) 2px;
    margin-top: var(--space-sm);
  }

  .pv-series-list {
    list-style: none;
    padding: 0;
  }

  .pv-list-btn--part {
    padding-left: calc(var(--space-md) + 12px);
    font-size: var(--text-xs);
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
