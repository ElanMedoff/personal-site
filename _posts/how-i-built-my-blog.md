---
title: "How I Built My Blog"
abstract: "The stack I chose, client and server."
lastUpdated: "August 28, 2022"
slug: how-i-built-my-blog
tags:
  - software eng
  - devops
priority: 1
collection: null
---

# How I Built My Blog

I'm a big fan of tech blogs. Compared to a video or dev talk, they're often shorter, more intentional, quicker to skim when needed, and when dealing with difficult content, easier to review and re-read. They're also fun to write – especially when most of your typing is coding. I've been wanting to write my own blog for some time now, and with a break in some of my other side-projects, I finally got around to it!

This post shouldn't function as a step-by-step tutorial, but rather a high-level overview of the tech stack I use along with a few of my thoughts.

## Client

I decided to use [Next.js](https://nextjs.org/) as my front-end framework because of it's optimization for static site generation. With SSG, every page is pre-rendered at build time and served to the user immediately. This is distinct from server side rendering, which renders the requested page at request-time. Since my blog renders the same content for every user, it makes a great use case for pre-rendering the site with SSG.

I looked into some other frameworks that specialize in SSG, but Next.js had the best combination of popularity – which goes hand-in-hand with online resources – and a good ratio of framework-specific quirks to features. In other words, for all the features you can access with Next.js, you have to learn very little framework boilerplate.

### Design

I decided to use [tailwindcss](https://tailwindcss.com/) as my CSS "framework". I've experimented in the past with css-modules, plain scss, and [vanilla extract](https://vanilla-extract.style/), but I've found tailwind to be my favorite so far. Nothing can beat its dx.

Design isn't my strong suit, so I decided to go with [daisyui](https://daisyui.com/) as my component library. I mostly write my own components, but daisyui has some great color themes that I use too (the theme for this site is `cyberpunk`!). Daisyui also has great integration with tailwind, so I can use classes like `text-primary` instead of something like `text-gray-200`. If I ever decide to add a dark mode in the future, this should make that _much_ easier.

I write my blog posts in Markdown, which has an awesome syntax for writing, and some really nice default styles. I looked into using [mdx](https://mdxjs.com/), which has support for JSX components, but it seemed a bit overkill for my usecases. Maybe in a bit.

For syntax highlighting in my code blocks, I use [react-markdown](https://github.com/remarkjs/react-markdown) and the approach outlined [here](https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight). It was a bit of a pain to set up, but it's the best solution I've found so far.

When I want to apply tailwind or daisyui styles to my markdown, I've found it easiest to wrap the section in a `div` with a custom attribute. I just select for that attribute in my s/css, and it applies the styles as expected. For instance, I'll import the following scss into the component where I parse my markdown:

```scss
[data-daisy="alert-info"] {
  @apply alert alert-info shadow-lg my-6;

  & a {
    @apply text-secondary-content hover:text-accent-focus;
  }
}
```

It's a little hacky, but it works well for me.

### Atropos

For the fancy 3D parallax image on the homepage, I use [Atropos](https://atroposjs.com/). The library is surprisingly minimal, and the documentation bare-bones, so I've had to reverse engineer a few of features I wanted from the examples on their site. This blog is [open source](https://github.com/ElanMedoff/personal-site), so maybe I can save you from doing the same!

<div data-daisy="alert">

Check out the `AtroposBorder` [component](https://github.com/ElanMedoff/personal-site/blob/master/components/AtroposBorder.tsx) to recreate the fancy 3D borders on the video game samples on the Atropos site.

</div>

## Server

On the server side of things, I host my blog on a [digital ocean](https://www.digitalocean.com/) droplet – the cheapest one available. I use [nginx](https://www.nginx.com/) as a proxy for my Next.js server, and [certbot](https://certbot.eff.org/) to set up my ssl certificate.

To manage my production code, I use [this setup](https://toroid.org/git-website-howto) to push changes to the server with the command `git push server`. It's bare-bones, low-level, and awesome.

For my _very_ basic continuous integration, I wrote the following deploy script:

```bash
#!/bin/bash
git add -A
git commit -m "$1"
git push origin master
git push server
```

I use [pm2](https://pm2.keymetrics.io/) to manage my Next.js server, and I restart the service automatically when new code is pushed – it took just a few lines added to the post-receive hook.

I'll write a full post on my minimal approach to continuous integration, but this should do for now.

## Bonus: Some of my Favorite Blog Posts

- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [Remix vs Next.js](https://remix.run/blog/remix-vs-next)
- [Fix the slow render before you fix the re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)
- [Why Efficient Hydration in JavaScript Frameworks is so Challegning](https://dev.to/this-is-learning/why-efficient-hydration-in-javascript-frameworks-is-so-challenging-1ca3)
- [How to write Performant React code: rules, patterns, do's and don'ts](https://www.developerway.com/posts/how-to-write-performant-react-code)
- [The Ultimate Guide to handling JWTs on frontend clients](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql)
- [OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/)

You can get a pretty good idea of my interests from this list!
