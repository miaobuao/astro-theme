#!/usr/bin/fish
git add .

read -l -p "echo 'commit: '" msg

if test -n $(string trim $msg)
    git commit -m $msg
else
    git commit -m "$(date)"
end

git push