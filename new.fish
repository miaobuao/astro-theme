#!/usr/bin/env fish

read -l -p "echo 'Title: '" title
set -l tags ()
while test -n $(string trim $(read -p "echo 'Tags: '" tag), $tag)
    set -a tags $tag
end

set -l root (dirname (status --current-filename))
set -l tgt_path $root"/src/content/blog/"$(string join "/" $tags)
set -l doc_path $tgt_path"/"$title".md"
mkdir -p $tgt_path

echo -e "---
title: $title
date: $(date '+%Y-%m-%d %H:%M:%S')
tags: [$(string join ',' $tags)]
---

# $title\n" > $doc_path

code $root
code $doc_path