---
title: "Speaking into Existence: 1"
date: 2026-03-14
description: "It started with a frustration so banal I almost didn’t act on it."
tags: [vociferous, dev-diary]
canonicalUrl: "https://medium.com/@WanderingAstronomer/speaking-into-existence-6f542deb9070"
---

*Originally published on [Medium](https://medium.com/@WanderingAstronomer/speaking-into-existence-6f542deb9070).*

### Speaking into Existence: 1

#### Chapter 1: I Think Faster Than I Type

It started with a frustration so banal I almost didn’t act on it.

I think faster than I type. That’s it. That’s the whole genesis story. I’d sit at my desk, ideas cascading through my mind at a hundred miles an hour, and my fingers would bottleneck everything into a sluggish 40-words-per-minute trickle. Every thought had to queue up, wait its turn, shuffle through the keyboard. By the time I finished typing a sentence, I’d lost the three sentences that were supposed to follow it.

This is not an uncommon problem. Unless you type at a blazing hundred words per minute or more, there’s a decent chance you’ve felt this. The gap between thought speed and output speed is a real cognitive bottleneck, and most people just accept it as the cost of having a keyboard in front of them.

I did not accept it! (*Shenanigans ensue~)*

So in September 2025, I did what any developer does when confronted with a mundane problem: I dramatically over-engineered a solution.
by [Brady Bonus](https://www.linkedin.com/in/bradybonus/)
### The ChatterBug Era

The first commit landed on September 17, 2025. I called it ChatterBug. A cute name for a dictation tool — talk to your computer, get text out. Simple concept, right?

But I didn’t build a simple tool. I built a *system*. Oops!

The original architecture was — and I say this with the clear-eyed judgment of someone who lived through what came next — an ambitious disaster. Within two months I had assembled a 60-file monstrosity centered around a FastAPI daemon server with a REST API, a Kivy Material Design GUI with multiple screens, a CLI that supported five different commands (`transcribe`, `daemon`, `bench`, `check`, `deps`), a model registry supporting multiple transcription engines, configuration presets with complex validation, and a progress tracking system with rich callbacks.

Sixty files. For a dictation tool. A tool whose entire job is: listen to microphone, turn audio into text, put text somewhere useful.

I had 50 test files, 376 tests, separate engine backends with a registry pattern so you could swap transcription models at runtime — something I’ve actually kept to this day, for the record — Pydantic schemas and configuration presets and hardware detection logic. It looked really nice on paper.

It was a painted trash can.
via [@flaviocopes](https://twitter.com/flaviocopes/status/1417007331930423298)
I had built a cathedral when I needed a shed. Long before I understood anything about masonry or what skills you actually needed to build a cathedral back when people were building them.

As for ChatterBug — the name had to go. There’s already a company in Europe using it in the speech software domain. RIP.

So, I went searching. I spent time on trademark databases and patent office searches, making sure I had something that wasn’t going to collide with anything. And I landed on Vociferous: loud-voiced, opinionated, *insistently clamoring* — which is exactly what a dictation tool does. It captures your voice and refuses to let it be lost. I liked it. I kept it.

### The Two-Month Silence

Here’s something the git log reveals: after that initial September sprint, there’s a two-month gap. September 17 to November 21 — nothing. Radio silence.

I was busy. Genuinely busy, in ways that had nothing to do with Vociferous but shaped exactly who came back to it when I did.

I was competing in the National Cyber League in the fall. My team placed 20th in the nation in the experience students bracket, which I’m still pretty proud of. I was also in the middle of reconstructing and refactoring the Technology Community of Practice web pages for Franklin University. There were presentations and papers and the regular machinery of college bearing down, and I took a (long overdue) trip back to upstate New York to see my family.

But underneath all of that, something else was happening. I was figuring out — with a lot more clarity than I’d had in September — that what I wanted to do with my life was build software. Not as a hobby, not as a side project, but as a career, as a craft. And I was acutely aware of the gap between where I was and where I needed to be to actually prove that to anyone, including myself. Also around this time, my identity as an engineer began to take shape.

> ***Why*** do I want to build? And for ***who***? Do they ***need*** it, or do they ***want**** *it? Should ***they*** even have it? ***Should*** it be built? And should ***I ***be the one to build it? Each a critical question every self-identifying “builder” must answer.

So when I returned to Vociferous on November 21st, I didn’t just pick up where I left off. In the week before I came back, I did a lot of research. Human speech patterns, ASR anatomy, software architectural design principles, UI and frontend stack comparisons, how different technologies played together, what I actually needed to understand to do this right. I thought I got it on the first try! Spoiler alert:
He did not get it right on the first (or third) try.
I learned a tremendous amount. And I was more confident than I should have been — which, if you’ve ever been new at something, is exactly where the next expensive lesson comes from.

### The Kivy Detour

One of the first things I tried when real development resumed was a Kivy GUI. For those unfamiliar, Kivy is a Python UI framework — Material Design aesthetic, cross-platform, decent for mobile, passable for desktop. On December 7, I committed a “KivyMD GUI foundation.”

It lasted about four days.

…yeah. *Cough.*

Kivy had the Python-native advantage — no JavaScript build chain, no process boundary, just Python all the way down. But in practice, the rendering was sluggish, the widget ecosystem was limited, and customizing the look and feel was an exercise in frustration. I was fighting the framework instead of building features.

In the world of finance, there’s a phrase for this: *paying tuition*. When a bad trade blows up in your face, you don’t call it a loss — you call it tuition. The market taught you something, and you paid for the lesson. Could that just be a fable gifted to new traders to get them to dump their meager funds into the wealthy’s Infinite Money Generator™? Yeah, probably.

Regardless, I paid tuition on Kivy. I don’t regret it, and I’m not saying that there is something wrong with using it. It just wasn’t right for me. Every wrong turn teaches you what the right turn looks like. At the very least, you will never make that particular mistake again.

Yet I wasn’t done paying tuition. Not even *close*.

### December 11: The Day Everything Happened

If you look at the git log for December 11, 2025, you’ll see something extraordinary. In a single day, the version jumped from v0.3 to v0.8. Five version bumps in one day — each representing a meaningful change, not just a number increment.

This was the moment the project found its heartbeat. The daemon architecture was gone. The multi-engine registry was gone. The complex CLI was gone. What remained was getting leaner and meaner by the hour. I had migrated to PyQt5 for the UI, and I was converging on something — I didn’t know exactly what yet, but I could feel the unnecessary weight falling away.

A note: later in development I moved to PyQt6, because after spending time in PyQt5 I found myself looking at the version number wondering why I wasn’t already on the more future-proof release. There’s a fun lesson here: don’t be sold on tech too quickly. PyQt6 sounded EXACTLY like what I thought I needed, so I jumped arms wide into it, over-eager to sate my UI/UX woes.

### The Decision to Burn It Down

Around December 13, I made the decision that would define the entire project: kill everything and start over.

Version 0.9.0 was titled “Complete Architectural Rewrite.” The CHANGELOG entry is bracingly honest:

> This version is not compatible with any previous version. The entire codebase has been replaced.

What gave me the gall to do that? Well… I was my only user. Hahaha!

I deleted 136 files. The entire Vociferous package with its eight subdirectories — gone. The 50 test files — gone. The Kivy GUI, the daemon server, the engine registry, the CLI commands — gone, gone, gone. Everything must go!

What replaced it? Eight files. Eight. Sitting in a `src/` directory:
```
src/
├── main.py               # VociferousApp orchestrator
├── utils.py              # ConfigManager singleton
├── key_listener.py       # Hotkey detection (evdev/pynput)
├── result_thread.py      # Audio recording & transcription
├── transcription.py      # faster-whisper integration
├── input_simulation.py   # Text injection backends
├── config_schema.yaml    # Configuration schema
└── ui/
    ├── base_window.py    # Frameless window base
    └── status_window.py  # Status indicator
```
The daemon with its REST API became a direct function call. The multi-engine registry became a single `faster-whisper` integration. The Kivy GUI became a minimal PyQt5 status window—a floating rectangle that showed "Recording..." or "Transcribing..." and otherwise stayed the hell out of your way. The complex CLI became `python run.py`.

That was it.

### Why the Rewrite Was the Right Call

I’ve heard the conventional wisdom a thousand times: “Never rewrite from scratch.” [Joel Spolsky](https://www.joelonsoftware.com/) wrote about it. Every engineering blog has a cautionary tale, and who am I to deviate? They’re not wrong — for teams, for products with users, for codebases with years of accumulated domain knowledge baked into edge-case handling, that is.

But *this* wasn’t *that*. This was a solo developer, three months in, with zero users, looking at a codebase that had accumulated complexity without accumulating value. The 60-file architecture wasn’t protecting me from anything. It was protecting architectural abstractions from the reality that I was building a dictation tool, not a transcription platform.

The rewrite took days, not months, because I wasn’t really rewriting — I was *subtracting*. The core logic (record audio, transcribe with Whisper, output text) was maybe 200 lines of meaningful code buried under 10,000 lines of UI slop + architecture. I just had to find those 200 lines and let them breathe. I needed to know where the heartbeat of my program was.

There’s something else I learned here, something that didn’t fully click until after the rewrite was done: up to this point I had been relying heavily on AI to direct my understanding of where the codebase should go. And here’s what the people who are more experienced with AI-driven development will tell you, and what I had to discover the hard way — the AI will not lead you astray if you know what you’re talking about. But you don’t know for sure if you can walk the walk and talk the talk until you’ve struggled through hell and back and discovered that you weren’t quite as clever as you thought you were.

You just have to pay that tax.

### The Design Philosophy That Survived

Something crystallized during that rewrite that would guide every decision for the next six months:

The right amount of complexity is the minimum needed for the current task.

Not the minimum needed for the *imagined future task*. Not the minimum for *what this might become someday*. The minimum for *right now*.

This might sound obvious! It was not. Every developer’s instinct screams at them to build for the future, to add abstraction layers “just in case,” to design extension points for features that don’t exist yet. I knew because I’d just spent three months doing exactly that — and developed an extremely poor understanding of my own codebase, what my program was, what it did, and why it did it.

V0.9 was the antibody. Eight files. No abstractions beyond what the current code demanded. A configuration file with sensible defaults and nothing else. A UI so minimal it barely qualified as a UI.

It worked. Press a key, talk, press the key again, get text. The core experience I’d been trying to build for three months was finally real, and it lived in a codebase I could hold in my head all at once.

### What I Learned

If you take one thing from this first chapter, let it be this: the hardest engineering decision isn’t adding something — it’s removing it. Or making the conscious decision to keep something out in the first place.

I’m not saying v0.1 through v0.8 was wasted time. It wasn’t. The exploration taught me what the problem space actually looked like — what I needed versus what I thought I needed, and exactly how much architecture a single-purpose tool can tolerate before it collapses under its own weight. It taught me how to research the problem space, find the boundaries of a solution, distinguish the core from the scaffolding. Once again: you don’t get that from a tutorial.

The real project — the one that would eventually grow into 130+ releases, 355 commits, a genuinely useful production-grade tool on multiple operating systems — started the day I set fire to everything and wrote eight files.

*One last thing: the chapter you just read was originally dictated. Into Vociferous. It took 21 minutes to speak 2,500 words at an average of 141 words per minute. I was actively speaking 81% of the time. I used 41 filler words. All of that analytical data comes straight out of the app. I find it hard to imagine a better advertisement. As is tradition; proof:*
Refinement took about 156 seconds with a custom prompt Qwen 14B via my RTX 3090.
> Vociferous is an open-source, offline speech-to-text application. It runs entirely on your hardware, no cloud required. Both CPU and GPU are supported.

[GitHub: WanderingAstronomer/Vociferous](https://github.com/WanderingAstronomer/Vociferous)
[Chapter 0: Dictating About a Dictation Tool](https://medium.com/@WanderingAstronomer/speaking-into-existence-6f542deb9070)