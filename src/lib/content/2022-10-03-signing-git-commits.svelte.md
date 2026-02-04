---
layout: post
title: Signing git commits
date: 2022-10-03 12:00:00 -0600
comments: true
categories: git
---

If you're not already, I recommend signing your git commits.

### Why should you sign your git commits?

If a commit isn't signed, there's no guarantee the author name you see is the actual author of the commit.
You can forge commits 😳. You might not think this is a bid deal, especially if your working on closed source,
but if you're working on anything open-source then it's important.

## How to setup on macOS

### Install gpg tools

Download and install [GPG Suite](https://gpgtools.org/)


```
git config --global commit.gpgsign true
```
