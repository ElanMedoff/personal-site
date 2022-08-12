---
title: "VSCode-Style Git Diffs the Vim Way"
abstract: "Check your git diffs with Vim faster than you ever have with VSCode"
lastUpdated: "August 11, 2022"
slug: vscode-style-git-diffs-the-vim-way
tags:
  - software eng
  - vim
priority: 0
collection: null
---

# Git Diffs in Vim Like VSCode

The deeper you dive into the Vim black hole, the less you take opinionated editors like VSCode for granted. Nowhere is this more true than when viewing git diffs. In VSCode, you have an elegant interface in the sidebar that shows every change since your last commit as a side-by-side diff. It also has other nice features, like the option to the discard all the changes in a particular file.

Before I switched to Vim, using this feature was an essential part of my workflow. I'd make a few changes, check the diffs to make sure I got rid of my TODOS, and pushed. It was great.

Unfortunately, it takes a little more work to get something analogous working for Vim.

## My Homegrown Solution

The solution I stitched together prioritizes moving quickly from file to file, sacrificing the fancier features of VSCode for a low-level approach. In fact, it can be boiled down to just the following bash function:

```bash
gd () {
	nvim -p $(git diff --name-only) -c ":tabdo :Gvdiffsplit"
}
```

Let's walk through it chunk by chunk.

First, the `-p` flag. If we enter `nvim --help` in the terminal, we can see the following:

```text
-p[N]                 Open N tab pages (default: one per file)
```

In our case, we're using the result of `$(git diff --name-only)` as our `[N]` to determine how many tabs to open in Vim. Looking at the [git documentation](https://git-scm.com/docs/git-diff), we can see that the `--name-only` flag returns the names of the changed files. In other words, open one tab for each changed file.

With the same `nvim --help` command, we can see that the `-c` flag executes its argument as a Vim command:

```text
-c <cmd>      Execute <cmd> after config and first file
```

In our case, the command we're passing to the `-c` flag is `:tabdo :Gvdiffsplit`.

While in Vim, we can enter the command `:help :tabdo` to get the following info on `:tabdo`:

```text
:[range]tabd[o] {cmd}
  Execute {cmd} in each tab page ...
```

The command we're passing to `:tabdo` is `:Gvdiffsplit`, which is from the plugin [vim-fugitive](https://github.com/tpope/vim-fugitive). You can install vim-fugitive with the package-manager of your choice.

In the github documentation for vim-fugitive, we can see the following info on `:Gvdiffsplit`:

```text
:Gdiffsplit (or :Gvdiffsplit) brings up the staged version of the file side by side with the working tree version.
```

Putting everything together, our `gd` bash function opens a tab for every changed file, and for each tab, opens up a side-by-side git diff.

This homegrown function lacks some of the fancier capabilities of VSCode, but navigating forward is _fast_. To go from one file to the next, simply exit twice, once for each split! You can even setup a keybinding to make it that much faster.

```vim
nnoremap gn :q<cr>:q<cr>
```

This function is perfect for taking a last look at your changes before committing.

## Bonus: diffview.nvim

If you're interested in a more batteries-included solution, I'd recommend checking out [diffview.nvim](https://github.com/sindrets/diffview.nvim). Just like in VSCode, you can view side-by-side diffs of all the files changes since your last commit, with a whole bunch of other bells and whistles. Thank you [sindrets](https://github.com/sindrets) and friends!
