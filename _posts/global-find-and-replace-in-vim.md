---
title: "Global Find and Replace in Vim"
abstract: "Stitching together the fzf, quickfix list, cdo, and a custom lua function for an awesome find and replace in Vim"
lastUpdated: "September 7, 2022"
slug: global-find-and-replace-in-vim
tags:
  - software eng
  - vim
collection: null
---

# Global Find and Replace in Vim

Of all the VSCode features I've reimplemented in Vim, none have given me as much trouble as the global find and replace. In VSCode, the global-search ui is built into the sidebar with options to include/exclude files, and search by whole word, case sensitive, case insensitive, and any combination of the three. Once you've narrowed down your search, you can easily replace all instances in the same ui. For renaming across multiple files, it's a lifesaver. Luckily, with a bit of a work, and a little flexibility, we can get an analagous solution working in Vim.

## tl;dr

<div data-daisy="alert">

Find your first-pass results with [fzf](https://github.com/ibhagwan/fzf-lua), populate them into the quickfix list, narrow it down with [bfq](https://github.com/kevinhwang91/nvim-bqf), and replace all instances by executing `cdo s/find/replace` with a custom user command to accept arguments for `find` and `replace`.

</div>

## Search With [fzf](https://github.com/ibhagwan/fzf-lua)

fzf is an awesome command line utility for fuzzy finding just about anything (seriously, anything). In our case, we'll be using the `fzf-lua` package for Neovim, and focusing on just one specific command: `grep`

`grep` allows you to input a search term and narrow down the results "fuzzily" by filename. I use the following key remaps, but feel free to use your own:

```vim
nnoremap <leader>zf <cmd>lua require('fzf-lua').grep()<cr>
```

Once you trigger the command, you'll be greeted with a prompt to input your initial search term:

<img src="grep-for.png" style="width: 50%; margin: auto"/>

Enter the search term (in our case, let's look for the string `fzf`) and a window will appear with the filenames of every file containing your string.

<img src="fzf-initial.png"/>

You can then narrow down your results by inputting a part of the filename, or negating a filename if you begin with a shebang i.e. `!.md`:

<img src="fzf-narrow.png" />

In our case, we negated any files with `packer` in the filepath. We can then export a subset of the files to the quickfix list by marking a result with tab ...

<img src="fzf-mark.png" />

... and pressing enter. In our case, let's mark all the instances where we remap an fzf command.

This will populate the quickfix list, which should look something like the following:

<img src="bfq-initial.png" />

## Narrow Down With [bfq](https://github.com/kevinhwang91/nvim-bqf)

The second plugin we'll use is bfq, an awesome utility for the quickfix list. I won't dive into all the details, but some of the highlights are:

- create another list by marking an entry with tab and pressing `zn`.
- navigate between lists with `>` and `<`
- `zf` to fuzzy search within the current list
- navigate by file (not result) with `ctrl-p` and `ctrl-n`
- scroll in the preview window with `ctrl-b` and `ctrl-f`

I also use some bfq-agnostic quickfix list remaps that may be helpful:

```vim
nnoremap gn :cnext<cr>
nnoremap gp :cprevious<cr>
nnoremap ge :copen<cr>
nnoremap gq :cclose<cr>
```

Between creating lists, fuzzy searching with a list, and repeating, you should have enough tools to narrow down your search to a final, single list. This brings us to the final section: replacing.

## Replace With cdo

The key to this last step is the native Vim `cdo` command. If we enter the command `:help cdo` in Vim, we learn the following info:

```
:cdo[!] {cmd}		Execute {cmd} in each valid entry in the quickfix list.
```

In practice, this means we need to narrow our search to a single quickfix list (i.e. with `zn` and `zf`) so we can replace its every instance.

For the `cmd`, we'll be using the `substitute` command. Although there's a whole boatload of options we can use, the defaults are generally good enough: `s/foo/bar/` will replace a single instance of `foo` with `bar`.

Some common `substitute` options include the `/g` flag (i.e. `s/foo/bar/g`) which replaces all the instances in the current line, the `%s` flag (i.e. `%s/foo/bar`) to replace all the instances in _all_ lines, the `/i` flag (i.e. `s/foo/bar/i`) for case-insensitive replacements, and the `/I` flag for case-sensitive. Check out this great [guide](https://vim.fandom.com/wiki/Search_and_replace) for more examples.

Luckily, since `cdo` applies its command argument to every instance in the quickfix list, we need neither the `/g` flag nor the `%s` flag – I'll leave it up to you to decide on the `/i` and `/I` flags.

## Custom User Command

Technically, you could stop here and you'd be good to go – just use the `:cdo s/foo/bar/` command as above. If you're like me, however, this can feel a bit unweildy. What about creating a key remap to interpolate the `foo` and `bar`? While it's not possible for a Vim remap to accept arguments, a user command can!

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

First, the `nargs = "*"` indicates that our user command can take any number of arguments. The arguments are passed through `opts.args` as a space-separated string. Unfortunatley, Lua lacks a built in split function, but we can use our own from stackoverflow. We can interpolate the values with `string.format` (remember that Lua is 1-indexed!), and execute the command with `nvim_command`. Finally, we can set a keymaping.

One last note: if you regret your find and replace, don't panic! You can easily undo your changes with `:cdo undo`.

## Bonus: Local Find and Replace With Options

While a global find and replace is a bit of work in Vim, a local find a replace is actually quite simple – with the right keymappings.

```vim
  noremap <leader>/c /\C<left><left>
  noremap <leader>/w /\<\><left><left>
  noremap <leader>cw /\<\>\C<left><left><left><left>
```

Just like in VSCode, these mappings give us the option to search case-sensitive (`<leader>/c`), search by whole word (`<leader>/w`), or both (`<leader>cw`)!

To replace multiple results in a single file, highlight your results with `/` or one of the commands above, type `cgn`, enter the replacement, and press escape. Go the next entry with `n` as normal, and do the same replacement with `.`.
