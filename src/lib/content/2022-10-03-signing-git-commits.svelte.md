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
You can forge commits 😳. You might not think this is a big deal, especially if you're working on closed source,
but if you're working on anything open-source then it's important.

## How to setup on macOS

### Install gpg tools

Download and install [GPG Suite](https://gpgtools.org/)

### Generate a GPG key

Once GPG Suite is installed, generate a new GPG key:

```bash
gpg --full-generate-key
```

Follow the prompts:
- Select RSA and RSA (default)
- Choose key size of 4096 bits
- Set the key to not expire (or set an expiration date)
- Enter your name and email (use the same email as your git config)
- Set a secure passphrase

### List your GPG keys

To see your newly created key:

```bash
gpg --list-secret-keys --keyid-format=long
```

You'll see output like:

```
sec   rsa4096/3AA5C34371567BD2 2022-10-03 [SC]
      1234567890ABCDEF1234567890ABCDEF12345678
uid                 [ultimate] Your Name <your.email@example.com>
ssb   rsa4096/4BB6D45482678CE3 2022-10-03 [E]
```

Copy the GPG key ID (the part after `rsa4096/`, e.g., `3AA5C34371567BD2`)

### Configure git to use your GPG key

```bash
git config --global user.signingkey 3AA5C34371567BD2
git config --global commit.gpgsign true
```

### Export your GPG public key

To add your GPG key to GitHub, GitLab, or other platforms:

```bash
gpg --armor --export 3AA5C34371567BD2
```

Copy the output (including `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----`)

### Add your GPG key to GitHub

1. Go to GitHub Settings → SSH and GPG keys
2. Click "New GPG key"
3. Paste your public key
4. Click "Add GPG key"

### Verify it's working

Make a commit and verify the signature:

```bash
git commit -m "Test signed commit"
git log --show-signature -1
```

You should see "Good signature" in the output.

### Troubleshooting

If you encounter an error like "gpg failed to sign the data":

```bash
export GPG_TTY=$(tty)
```

Add this to your `~/.zshrc` or `~/.bash_profile` to make it permanent:

```bash
echo 'export GPG_TTY=$(tty)' >> ~/.zshrc
```
