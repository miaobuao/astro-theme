---
title: frontmatter介绍
date: 2024-07-22 15:36:38
tags: [theme]
cover: ./images/cover.jpg
---

# frontmatter介绍

```yaml
---
title: 文章的标题
description: 文章的描述
tags: [标签1, 标签2, 标签3]
date: 2024-07-22 15:36:38
ctime: 2024-07-22 15:36:38
mtime: 2024-07-22 15:36:38
pubDate: 2024-07-22 15:36:38
updatedDate: 2024-07-22 15:36:38
heroImage: ./images/cover.jpg
cover: ./images/cover.jpg
draft: false
---
```

如无特殊说明，则参数默认为可选参数，缺省时会根据规则自动推断，具体规则见各参数说明

## 参数解释

### title

文章标题，会显示在主页的文章列表中。

缺省时按以下规则顺延推断：

1. Markdown 内的一级标题
2. Markdown 文件名（不包含文件拓展名 `.md`）


### description

文章描述，会显示在文章详情页的文章内容中。

缺省时按以下规则顺延推断：

1. Markdown 内 `<!-- more -->` 之前的所有文本内容
2. Markdown 内的第一个段落


### tags

文章标签，常用于标记文章的所属领域或类别

缺省时按以下规则顺延推断：

1. 文件的路径，以 `/` 作为分隔符


### date、ctime、pubDate

都表示文章发布时间，一般格式为 `YYYY-MM-DD HH:mm:ss`

之所以用三个属性来表示文章的发布时间，是为了兼容 `hexo` 和其他主题

缺省时按以下规则顺延推断：

1. 该文章在 git log 中记录的第一次提交时间


### mtime、updatedDate

都表示文章更新时间，一般格式为 `YYYY-MM-DD HH:mm:ss`

使用两个字段，同样是为了兼容 `hexo` 和其他主题

缺省时按以下规则顺延推断：

1. 该文章在 git log 中记录的最后一次提交时间


### heroImage、cover

文章的封面图，会显示在首页的文章列表中

缺省时则不显示封面


### draft

是否为草稿，当为草稿时则该文章不会被被编译成 html

