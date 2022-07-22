---
title: Test-Driven Refactoring
abstract: TODO
publishedOn: TODO
imagePath: TODO
---

# Test-Driven Refactoring

Test-driven development holds a strange place in software engineering culture: everyone seems to agree we should do it, but nobody actually wants to. I tend to be a part of this group.

For reference, Wikipedia defines test-driven development as:

> a software development process relying on software requirements being converted to test cases before software is fully developed

Or in other words, writing your tests before writing your code.

The purported benefits are less-buggy code and a smoother dx – but in my experience, this rarely pans out.

As much as we would like to only test software requirements, ignoring any implementation details, this is rarely possible. When testing frontend code, for example, sometimes you need to hook into DOM elements directly in your tests. Other times you may even _want_ to test implementation details – was this api call made in the correct circumstances? That's an important detail that's difficult to test before you've written your code.

It may also seem a little petty, but when I'm in the mindset of implementing a feature, writing tests really brings me out of the flow. It's a form of context-switching, one which hurts my motivation and lowers my productivity.

That being said, I still very much value the utility of tests – but not for development. Here me out:

I'm a big believer in being unafraid of my code. If I want to update a feature, refactor my types into some fancy conditional generics, I don't want to be afraid of silently breaking my app. I need the freedom to update my code, and tests give me the confidence necessary to make these changes.

I'm not afraid of breaking my app, I'm afraid of _silently_ breaking my app – and if I have good test coverage, that'll never happen.

So for those who are skeptical of test-driven refactoring: don't give up on tests altogether. Write tests to catch regressions, not to write original code. Test-driven refactoring, not test-driven development.
