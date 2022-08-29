---
title: "Global Find and Replace in Vim"
abstract: "Stitching together the fzf, quickfix list, cdo, and custom lua functions for an awesome find and replace in Vim"
lastUpdated: "August 28, 2022"
slug: global-find-and-replace-in-vim
tags:
  - software eng
  - vim
priority: 0
collection: null
---

# Global Find and Replace in Vim

Of all the VSCode features I've reimplemented in Vim, none have given me as much trouble as the global find and replace. In VSCode, the global find ui is built into the sidebar with options to include/exclude files, and search by whole word/case sensitive/insensitive. Once you've narrowed down your search a bit, you can replace all instances with the same ui. For large-scale renaming across multiple files, it's a lifesaver. Luckily, with a bit of a work and flexibility, we can get an analagous solution working in Vim.

## tl;dr

<div data-daisy="alert">

Find your first-pass results with [fzf](https://github.com/ibhagwan/fzf-lua), populate them into the quickfix list, narrow it down with [bfq](https://github.com/kevinhwang91/nvim-bqf), and replace all instances by executing `cdo s/find/replace` with a custom user command to accept arguments for `find` and `replace`.

</div>

## Search With [fzf](https://github.com/ibhagwan/fzf-lua)

fzf is an awesome command line utility for fuzzy finding just about anything (seriously, check it out). In our case, we'll be focusing on just one specific command: `grep_project`

`grep_project` allows you to search by file-content _and_ filename at the same time, it's a pattern I'm a big fan of. I use the following key remaps, but feel free to use your own:

```vim
nnoremap <leader>zg <cmd>lua require('fzf-lua').grep_project()<cr>
```

Once you input the command, you'll be greeted with a window of all your files – something like this:

<img src="fzf-initial.png"/>

You can then narrow down your results with some search terms of your file-content, filename, or a negation of either if you begin with a shebang i.e. `!.md`:

<img src="fzf-narrow.png" />

In our case, we searched for the text `fzf` and negated any files with the file extension `.md`. We can then export our selection to the quickfix list by marking a result with tab ...

<img src="fzf-mark.png" />

... and pressing enter.

This populates the quickfix list, which should look something like the following:

<img src="bfq-initial.png" />

## Narrow Down With [bfq](https://github.com/kevinhwang91/nvim-bqf)

The second plugin we'll use is bfq, an awesome utility for the quickfix list. I won't dive into all the details, but some of the highlights are:

- create a sub-list by marking an entry with tab ...

<img src="bfq-mark.png" />

... and pressing `zn`.

<img src="bfq-sublist.png" />

- navigate between sub-lists with `>` and `<`
- `zf` to fuzzy search within the current sub-list

<img src="bfq-fzf.png" />

- navigate by file (not result) with `ctrl-p` and `ctrl-n`
- scroll in the preview window with `ctrl-b` and `ctrl-f`

I also use some bfq-agnostic quickfix list remaps that may be helpful:

```vim
nnoremap gn :cnext<cr>
nnoremap gp :cprevious<cr>
nnoremap ge :copen<cr>
nnoremap gq :cclose<cr>
```

Between creating sublists, fuzzy searching with a sublist, and repeating, you should have enough tools to narrow down your search. This brings us to the final section: replacing.

## Replace With cdo

The key to this last step is the native Vim `cdo` command. If we enter the command `:help cdo` in Vim, we learn the following info:

```
:cdo[!] {cmd}		Execute {cmd} in each valid entry in the quickfix list.
```

Pretty self explanatory. For the `cmd`, we'll be using the substitute command. Although there's a whole boatload of options we can use, the defaults are generally good enough: `s/foo/bar/` will replace a single instance of `foo` with `bar`.

Some common substitute options include the `/g` flag (i.e. `s/foo/bar/g`) which replaces all the instances in the current line, the `%s` flag (i.e. `%s/foo/bar`) to replace all the instances in _all_ lines, the `/i` flag (i.e. `s/foo/bar/i`) for case-insensitive replacements, and the `/I` flag for case-sensitive.

Luckily, since `cdo` applies its command argument to every instance in the quickfix list, we need neither the `/g` flag nor the `%s` flag – I'll leave it up to you to decide on the `/i` and `/I` flags.

## Custom User Command

Technically, you could stop here and you'd be good to go – just use the `:cdo s/foo/bar/` command as above. If you're like me, however, this feels a bit unweildy. This is where creating a custom user command comes in. While it's not possible for a Vim remap to accept arguments, a user command can!

Our custom user command will accept two arguments, a `foo` and a `bar`, and execute a Vim command that interpolates the values into a string of the form `:cdo s/foo/bar/`. Let's look at the following code:

```lua
-- https://stackoverflow.com/questions/1426954/split-string-in-lua
local function split(s)
	local result = {}
	for match in (s .. " "):gmatch("(.-)" .. " ") do
		table.insert(result, match)
	end
	return result
end

vim.api.nvim_create_user_command("FindAndReplace", function(opts)
	local args = split(opts.args)
	vim.api.nvim_command(string.format("cdo s/%s/%s", args[1], args[2]))
end, { nargs = "*" })

vim.api.nvim_set_keymap(
  "n",
  "<leader>ir",
  ":FindAndReplace ",
  { noremap = true })
)
```

First, the `nargs = "*"` indicates that our user command can take any number of arguments. The arguments are passed through `opts.args` as a space-separated string. Unfortunatley Lua lacks a built in split function, but we can use our own from stackoverflow. We can interpolate the values with `string.format` (remember that Lua is 1-indexed!), and execute the command with `nvim_command`. Finally, we can set a keymaping.

One last note: if you regret your find and replace, don't panic! You can easily undo your changes with `:cdo undo`.

## Bonus: Local Find and Replace With Options

While a global find and replace is a bit of work in Vim, a local find a replace is actually quite simple – with the right keymappings.

```vim
  noremap <leader>/c /\C<left><left>
  noremap <leader>/w /\<\><left><left>
  noremap <leader>cw /\<\>\C<left><left><left><left>
```

Just like in VSCode, these mappings give us the option to search case-sensitive (`<leader>/c`), search by whole word (`<leader>/w`), or both (`<leader>cw`)!

To replace multiple results in a single file, type `cgn`, type the replacement, and press escape. Go the next entry with `n` as normal, and do the same replacement with `.`.
