---
title: "Speaking into Existence: 0"
date: 2026-03-12
description: "I'm dictating a story about my dictation tool — into the dictation tool I built — so that I can publish it to get more people using my dictation tool."
tags: [vociferous, dev-diary]
canonicalUrl: "https://medium.com/@WanderingAstronomer/speaking-into-existence-b9b75effcfe3"
---

*Originally published on [Medium](https://medium.com/@WanderingAstronomer/speaking-into-existence-b9b75effcfe3).*

### Speaking into Existence: 0

#### Chapter 0: Dictating About a Dictation Tool
Nothing quite like getting roasted by your program’s built-in SLM first thing in the morning! (look up top)
There’s a deep irony in what I’m doing right now.

I’m dictating a story about my dictation tool — into the dictation tool I built — so that I can publish it to get more people using my dictation tool. I’m talking at my screen, Vociferous is transcribing it, and the Small Language Model (SLM) is cleaning up the edges of my spoken rambling into something resembling prose. The subject of the book is writing the book. I find that funny. It’s the kind of irony that only makes sense if you built the thing yourself and then kept using it long enough to notice.

So. Chapter zero. The part where I tell you why any of this happened.

### It Started Because Linux Ate My Dictation Setup

On Windows, I had Whisper Typing. It worked. Not perfect, not polished, but functional — press a button, talk, get text. I used it for notes, for drafts, for long rambling thoughts I wanted to capture before they evaporated. It fit how I think.

Then I jumped ship to Linux. And the dictation landscape on Linux is, to put it charitably, a smoldering crater. There’s nothing of similar quality. Certainly nothing with the features I wanted. I hunted. I tried things. I complained to no one in particular. Hosted solutions either wanted my money or my data; screw *that* noise.

And then, in the way that developers tend to respond to problems when they should probably just go lie down instead, I decided to build something “simple” *(subtle foreshadowing).* What could possibly go wrong?

600 hours later (oops), this is what happened.

### A Blunderbuss at a Flock

I want to be honest about the goals here, because it wasn’t purely “I need a tool.” That was the seed, but the seed landed in some very fertile overthinking.

I was setting out to kill as many birds as possible with as few stones as possible, and I ended up aiming a blunderbuss at a flock. The number of problems I was actually trying to solve:

I needed a tool. That’s the obvious one. I think faster than I type. 60–65 words per minute is a cognitive bottleneck when your brain is running at a hundred miles an hour. Or, as Vociferous’ analytics show, my 133 WPM average across nearly 80,000 spoken words so far.
You, too can have a pretty analytics page! Download my app! >:D
***I needed something to close that gap.***

I *needed* to become a developer. Not a hobbyist who can wire up a script. An actual developer. Someone who could look at a system architecture and have instincts about what would go wrong, where the edges were, what patterns applied. I had none of that. Zero. I had enthusiasm and a laptop. And now I don’t even have a laptop! Just me and my trusty gaming PC.

I *needed* to figure out AI-assisted development. This was 2025. AI was rewriting the landscape of software engineering in real time, and I was trying to figure out what it could do, what it couldn’t, and how to ride it without letting it drive. Because when you’re new and an AI is confidently outputting code, it’s very easy to just say yes. And just as easily, the entire thing falls apart. It’s a very crumbly cookie. The AI will build you a beautiful-looking house on a foundation of sand, and you won’t know until the second floor collapses.

I *needed* a portfolio. You go out and do some quick Googling on how to break into software development, and somewhere below “go to this bootcamp” and “watch this YouTube guy” is: *build something on GitHub and put it out publicly.* That struck a spark in my brain. I didn’t want to build a to-do app or a weather dashboard. I wanted to solve a real problem I had, and make something that other people might actually want to use. I wanted to build with passion and purpose, not follow a stupid guide.

So yes — tool, career, AI experience, portfolio. One project. That’s why 600 hours. That’s the math.

### Flying a Plane While Already in the Air
Me in November — Colorized
The early days of this project were genuinely chaotic. Not productively chaotic — just chaotic. I was learning what architectural instinct even means while simultaneously trying to practice it. I had no appreciation for scope creep identification, trade-off analysis, technical debt patterns, data access design, security considerations. None of the invisible scaffolding that experienced engineers carry around in their heads as intuition.

And AI-assisted development without that intuition is particularly treacherous. If you don’t know enough to steer, the AI picks the direction. And the AI will steer you somewhere reasonable-sounding and structurally unsound without ever flagging that anything is wrong. It solves the prompt you gave it. It doesn’t tell you the prompt was the wrong question.

The whole experience felt like trying to figure out how to fly a plane while already in the air. Tools in hand. Controls responsive. No idea what half of them do. Hopscotching between language models and VS Code and PyCharm, trying to figure out where I was comfortable, trying to find my working rhythm. You don’t know where you want to be as a developer until you’ve put hundreds of hours into it and started to feel where your instincts want to take you.

I don’t think “comfort” is quite the right word for it, actually. I don’t think developers are ever comfortable. I think it’s a perpetual state of being uncomfortable — of not fully knowing the scope of what you’re doing or exactly how to do it — wherein you’ve just gotten fast enough at fumbling that it starts to look like competence.

Which is why software architecture is such a rare skill. And why I find it brilliantly fun. Which probably marks me a little insane. But that’s fine. Totally normal in this field; nothing to see here, folks.

### What Vociferous Is Actually About

Past the career goals and the tool gaps and the AI experiments — there’s a philosophical core to this project that I didn’t fully articulate to myself until I was well into it.

I have a strong feeling about what AI should be. It should be human-first. Person-first. Focused on helping people get ideas out of their heads so they can work with them more effectively. And it should be private. Secure. Contained to the individual unless there’s explicit, informed reason to do otherwise.

AI at the scale of business, at the scale of harvesting behavior and training on your personal data, is questionable at best. I feel that strongly. So Vociferous is, in part, a statement: you can have sophisticated offline AI — speech recognition, grammar refinement, local SLM inference — entirely on your own hardware, subject only to your own terms.

Nothing leaves your machine. Not because I wrote that in a privacy policy. Because *physically, architecturally, it can’t*. There’s no cloud endpoint. There’s no telemetry. There’s no data collection. That’s the whole point. It’s exactly what I envisioned, and that’s not changing anytime soon.

As I expand what Vociferous can do, that principle stays fixed. The giants in this space — the companies charging subscriptions to transcribe your private thoughts through their servers — have convenient terms of service and legal documents that protect them. I’m not interested in competing on their terms. I’m interested in building something that makes their entire model irrelevant for the people who care about their own data.

### The Thing I’m Most Excited About

I just turned 27. I came into serious software development late by some measures, and I am acutely aware of everything I don’t yet know. That scope of ignorance — all the things I’ve discovered I don’t understand, all the patterns I haven’t internalized yet, all the domains I haven’t touched — used to be daunting.

Now it’s just exciting!

There is so much left to know. And I have so much time left to figure it out. That ratio feels like freedom to me. If I’d started this at 50 or 60, I think the enormity of everything I didn’t know would have been depressing. At 27, it’s fuel.

The more I learn, the more I realize how much more there is to know. I don’t think that ever goes away. I think that’s actually the thing that makes good engineers — not getting better at everything, but staying genuinely curious about the next thing they don’t understand.

Vociferous is my first real proof that I can do this. Not a toy project, not a tutorial follow-along. A real application — cross-platform, genuinely useful, architecturally coherent — built from scratch by someone who started out not knowing what they were doing and figured it out the hard way.

This series is how I documented that process while it was happening: the decisions, the mistakes, the rewrites, the moments where I knew exactly what I was doing and the longer stretches where I absolutely did not.

Recorded, of course, using the tool I built!

This will be a *very* active series, published once or twice a day until all of my gained experience is out of my head and generating clicks (ya boy needs a job). This is of course, made possible by Vociferous. In fact… this took me 30 minutes to put together. What’s that? Proof? Okay, bet:
Vociferous: Proudly defeating AI-slop allegations since 2025™
> Vociferous is an open-source, offline speech-to-text application. It runs entirely on your hardware, no cloud required. Both CPU and GPU are supported.

[**GitHub: WanderingAstronomer/Vociferous**](https://github.com/WanderingAstronomer/Vociferous)[**
**Chapter 1: I Think Faster Than I Type](https://medium.com/@WanderingAstronomer/speaking-into-existence-b9b75effcfe3)