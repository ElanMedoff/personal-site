---
title: Test-Driven Refactoring
abstract: "Why we should approach tests from the angle of refactoring rather than development."
publishedOn: "July 27, 2022"
slug: test-driven-refactoring
tags:
  - software eng
---

# Test-Driven Refactoring

Test-driven development holds a strange place in software engineering culture: everyone seems to agree we should do it, but nobody actually wants to.

For reference, Wikipedia defines test-driven development as:

<div data-daisy="alert">
a software development process relying on software requirements being converted to test cases before software is fully developed
</div>

Or in other words, writing your tests before writing your code.

The purported benefits are less-buggy code and a smoother dx – but in my experience, this rarely pans out.

Part of the philosophy of test-driven development is that by solely testing software requirements, you can avoid testing implementation details. In fact, test-driven development relies on this pattern – you can't test implementation details you haven't written yet!

In principle, I would agree with this. If you _truly_ only test software requirements, you could refactor the implementation behind your code without rewriting a single test. What a dream.

Unfortunately, this is rarely possible. When testing frontend code, you sometimes need to hook into DOM elements directly in your tests. Other times, you may even _want_ to test implementation details – was this api call made in the correct circumstances? That's an important detail that's difficult to test before you've written your code.

It may also seem a bit petty, but when I'm in the mindset of implementing a feature, writing tests really brings me out of the flow. It's a form of context-switching, one which hurts my productivity.

---

That being said, I still very much value the utility of tests – but for refactoring, not development. Here me out:

I'm a big believer in being unafraid of my code. If I want to update a feature, refactor my types into some fancy conditional generics, I don't want to be afraid of silently breaking my app. I need the freedom to update my code when I think best, and tests give me the confidence necessary to make these changes.

In other words, I'm not afraid of breaking my app; I'm afraid of _silently_ breaking my app. If I have good test coverage, that'll never happen.

So for those who are skeptical of test-driven development: don't give up on tests altogether. Write tests to catch regressions, not to speed-up writing original code. Adopt test-driven refactoring, not test-driven development.