---
title: "Building My Portfolio Site on a Raspberry Pi"
date: 2025-01-10
---

I decided to host my personal portfolio on my Raspberry Pi instead of using a generic platform. Here's how I set it up...

*(2026 update: this site now lives on GitHub Pages as a hand-built static site — but the Pi era was a great learning experience.)*

## Why self-host?

- **Full control** over the stack and design
- **No platform lock-in** — I own my content
- **Learning opportunity** — sysadmin, networking, deployment
- **Cost** — basically free after hardware

## The stack

| Component | Choice |
|-----------|--------|
| Static Site Generator | MkDocs Material |
| Hosting | Raspberry Pi 4 |
| Web Server | Nginx |
| SSL | Let's Encrypt |
| CI/CD | GitHub Actions |

## Setup process

### 1. Environment

```bash
python3 -m venv ~/blog-venv
source ~/blog-venv/bin/activate
pip install mkdocs-material
```

### 2. Project structure

```
portfolio/
├── docs/
│   ├── blog/
│   │   └── posts/
│   ├── about.md
│   ├── contact.md
│   ├── index.md
│   └── projects.md
└── mkdocs.yml
```

## Lessons learned

1. **MkDocs Material is incredible** — the blog plugin, search, and theming are top-notch
2. **Virtual environments are your friend** — keeps the Pi's system Python clean
3. **Start simple, iterate** — don't over-engineer v1

---

*Have you self-hosted a site? What was your experience?*
