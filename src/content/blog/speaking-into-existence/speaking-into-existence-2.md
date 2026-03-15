---
title: "Speaking into Existence: 2"
date: 2026-03-15
description: "Eight files sounds like nothing. But they had to grow up — and they did it fast."
tags: [vociferous, dev-diary]
series: "Speaking into Existence"
seriesOrder: 2
canonicalUrl: "https://medium.com/@WanderingAstronomer/speaking-into-existence-2-4946a997a61a"
---

*Originally published on [Medium](https://medium.com/@WanderingAstronomer/speaking-into-existence-2-4946a997a61a).*

### Speaking into Existence: 2

#### Chapter 2: Eight Files and a Dream

In the last chapter, I told you all about burning down a 60-file codebase and replacing it with eight files. Now let me tell you what happened when those eight files had to actually grow up.

### The PyQt5 Bet

When I chose PyQt5 for the v0.9 rewrite, I was making a pragmatic bet. I needed a GUI that was:

1. Fast to render
2. Capable of system tray integration
3. Capable of frameless windows
4. Cross-platform — even though I was only running on Linux at the time, I had bright-eyed ambition
5. Mature enough that I wouldn't be fighting framework bugs

PyQt5 checked every box. It wasn't trendy. It wasn't the thing you'd see recommended in a 2025 blog post about building desktop apps. But it was battle-tested — decades of C++ Qt underneath, with Python bindings that mostly stayed out of your way.

The initial UI was laughably minimal. It was just supposed to be this frameless window that showed its recording status and a system tray icon. No history, no settings dialog, no way to see what you'd previously dictated. You pressed a hotkey, talked, pressed it again, and the transcribed text appeared in the floating window and got copied to your clipboard. That was the entire user experience. And for about two weeks, that was enough for me. Until it wasn't.

### The Clipboard-Only Philosophy

One of the most important decisions in v0.9 — one that would survive every subsequent rewrite — was the clipboard-only output model. The previous architecture had tried to be clever about text injection: pynput keyboard simulation, ydotool for Wayland, dotool as another option, with auto-detection and fallback chains. It was so annoying.

Here's what I learned from all that nonsense: **automatic text injection is a lie.** Well, at least on Linux, between X11 and Wayland, it feels like a lie. Between different compositors, window managers, applications that handle focus differently — there's just almost no reliable way to programmatically type text into an arbitrary application. You can get it working on *your* machine, in *your* setup, and then someone runs a different compositor and everything breaks.

So I was faced with a conundrum. Do I want to create a tool that only works for me in very specific cases, where it might break if I decide to change literally anything? Or do I want to choose the simpler path? Column B.

The solution was embarrassingly simple: copy to clipboard, let the user paste. Ctrl+V works everywhere. It works on X11. It works on Wayland. It works on macOS. It works on Windows. It works in every application ever written. The user already knows how to do it.

This is a pattern that would repeat throughout the entire project: **the dumb solution that works everywhere beats the smart solution that only works on your machine in extremely specific scenarios.**

### The Evdev Breakthrough

The hotkey system was the first piece of real engineering in the rewrite. On Linux, if you want to capture global keyboard events regardless of which window has focus, you've really only got about two options:

1. **pynput**: Works great on X11, completely broken on Wayland. Party pooper.
2. **evdev**: Reads directly from `/dev/input/` device files, works everywhere, requires `input` group membership — but who cares? That's an easy ask.

I built both backends with automatic detection. If evdev is available (the user is in the `input` group), use it. Otherwise, fall back to pynput and hope you're on X11. Not terrible, but not as graceful as it could have been.

This dual-backend approach was my first taste of what cross-platform really means at the system level. It's not "write once, run anywhere." It's "write twice, test four times, pray nightly" — which is just hopes and dreams at that point.

The key listener ran on its own thread — non-negotiable for a global hotkey system. You can't block the main thread waiting for keyboard events, and you can't poll in a loop either. It's awful for performance. Evdev gives you a file descriptor you can `select()` on, which is extremely clean. Pynput gives you a listener thread. Both had to map into the same callback interface so the rest of the app didn't care which backend was active. It worked nicely.

### December 2025: The Velocity Phase

After the v0.9 rewrite landed on December 13, something shifted. The codebase was small enough that I could hold it entirely in my head. Every change was fast because there was nothing to work around, no abstractions to satisfy, no interfaces to maintain. In other words, all of the AI-generated bloat had been cut away as I started to understand, in more excruciating detail, what it meant to architect systems and get them to work together with as little excess as possible.

For a while, that meant staying the hell away from AI until I was comfortable enough in my own programmer skin to make the big decisions — and to have productive conversations with an entity that had access, statistically speaking, to significantly more information than I did.

Between December 14 and December 31, I shipped:

- **v1.0.0**: A full main window with transcription history, settings dialog, system tray, dark theme, JSONL storage, export to txt/csv/markdown
- **v1.0.1**: Editable transcriptions, device settings
- **v1.1.0**: Custom frameless title bar, file-watching for history changes, cancel button for recordings, bundled icons
- **v1.1.1**: Documentation refresh

Four releases in two and a half weeks. Each one meaningful — not version-bump theater, but actual features landing and working properly. A word of sage advice, at no cost to you: don't write your wikis early. It is a complete waste of time when you're tearing your system apart and rebuilding it. I did a tremendous amount of documentation work during this phase that got completely bombed. Learn from my suffering.

### The Embarrassing Choice That Worked

The JSONL history system deserves a moment of honest reflection. I needed persistent storage for transcripts, and I reached for the simplest possible thing: a JSON Lines file. One JSON object per line, append-only, human-readable, trivially parseable. No database. No ORM. No schema. Just `open("history.jsonl", "a")` and `json.dumps()`.

Was it the right long-term choice? Absolutely not, without question. I'd replace it with SQLite in v1.2. But was it the right *right-now* choice? Absolutely yes. It let me ship a working history system in hours instead of days. It let me validate the UX before committing to a data model. And when the time came to replace it, I knew exactly what the real requirements were because I'd been living with the simple version and had a very clear picture of what I actually wanted.

### The Settings Dialog: Schema-Driven UI

The settings dialog in v1.0 did something I'm still proud of: it generated itself from a YAML schema. `config_schema.yaml` defined every setting — its type, its options, its description, its default value — and the settings dialog dynamically built the UI from that schema. I'd never done anything like it before. It was like watching Harry Potter magic.

Each schema section became a tab. Bool settings became checkboxes. String settings with options became dropdowns. Descriptions became tooltips. And adding a new setting required exactly one change: add it to the YAML file. No UI code to write. No dialog layout to update. The schema was the single source of truth for both the runtime configuration and the user interface.

It's a small pattern, but it embodies something I'd come to believe deeply: **configuration should be declared, not programmed.** The moment you start writing custom UI code for each individual setting, you've created a maintenance multiplier that grows linearly with every new option. Down the toilet.

### The Live Hotkey Capture

One feature that was disproportionately satisfying to build: live hotkey rebinding. You open settings, click "Change..." next to the activation key, press any key combination, and it's immediately active. No restart required.

But it was also a lesson in how simple features hide sharp edges. A hotkey capture widget needs to:

1. Switch the key listener into "capture mode" so events route to the settings dialog instead of triggering recording
2. Validate the captured key against reserved shortcuts and reject them with clear feedback to the user
3. Convert between the display string ("Left Alt"), the config string ("alt_l"), and the actual keycode
4. Update the running key listener immediately, not just on next launch — otherwise you'll be sitting there pressing your hotkey wondering why nothing is happening
5. Handle the case where the user changes the hotkey *while recording* — because of course they would try that. Have you ever met a user? They're insane. All of them. Source: I am a user.

Each of those sub-problems is relatively trivial. Together, they form a feature that's easy to get 80% right and maddeningly hard to get 100% right. The last 20% is always the stupid edge cases: what happens when someone tries to bind Escape? What if they close the dialog mid-capture? What if the evdev and pynput backends report the same key differently? Pure headache.

This was my first real encounter with a pattern that would define the entire project: **the feature is simple, the integration is hard.** An all too common story in software engineering.

### The Recording Indicator

Version 1.0 introduced a recording indicator that I thought was needlessly polished at the time but turned out to be absolutely essential for daily use: a "● Recording" label with a pulsing opacity animation.

When you're dictating — actually using this tool for its intended purpose — you need to know instantly whether your voice is being captured. Not "probably being captured." Not "I think the hotkey registered." You need a visual signal as unambiguous as a spotlight. The pulse animation (opacity cycling between 0.3 and 1.0) solved a subtle UX problem: a static indicator blends into the UI and your eye stops seeing it. A pulsing indicator is impossible to ignore. Your peripheral vision catches it even when you're looking at the text editor where you'll paste your transcription.

Fun fact for the future: this ended up evolving into audio waveforms that were responsive in real time with your voice. But we'll get there.

### The Christmas Shipping Frenzy

By Christmas 2025, I had a genuinely useful tool. I was using it daily for notes, emails, documentation drafts. The core loop worked: press key, talk, press key, get text. The history grew. The exports worked. The settings persisted.

But — and there's always the dreaded but — I was really starting to feel the limitations of JSONL and the flat file model. Search was O(n) over the whole file. Updates required rewriting the entire file. There was no way to organize transcripts into groups. The data model was just a big bag of timestamped strings.

The eight-file codebase that felt liberating in week one was starting to feel constraining in week three. Not because the architecture was wrong — it was exactly right for what it needed to be when I built it. But the requirements had grown, and once again I was facing down scope creep and the question of what the final evolutionary form *(insert Dragon Ball meme here)* of Vociferous was going to look like.

This is the paradox of starting small: if you do it right, the simplicity lets you build fast, which means you discover all the new requirements you dreamily wish you'd had from the start, which means you outgrow the simple design at a speed that is almost disappointing to arrive at.

The codebase born from the ashes of over-engineering was about to face the opposite problem. It needed to grow up without growing bloated. I needed a tall program, not a fat one.

---

> Vociferous is an open-source, offline speech-to-text application. It runs entirely on your hardware, no cloud required. Both CPU and GPU are supported.

- [GitHub: WanderingAstronomer/Vociferous](https://github.com/WanderingAstronomer/Vociferous)
- [Chapter 1: I Think Faster Than I Type](/blog/speaking-into-existence/speaking-into-existence-1)
