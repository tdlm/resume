# Scott Weaver Resume

> The brief account of my qualifications, experience and references in its various consumable forms.

## Versions

- **PDF** - [scott-weaver_resume.pdf](dist/scott-weaver_resume.pdf)
- **HTML** - [scott-weaver_resume.html](dist/scott-weaver_resume.html)
- **Markdown** - [scott-weaver_resume.md](dist/scott-weaver_resume.md)

And, here's [How I Work](https://gist.github.com/tdlm/3cb67429e01212f921aace4e1af100a6).

## Why

I was tired of having my resume in fifty different locations, and trying to remember how to keep all the various resume generators up to date.

## How

TL;DR: A JSON-based resume generator.

The heart of everything is the `resume.json` file, which is read by Gulp and interpolated into Mustache templates for output into HTML/PDF (`templates/scott-weaver_resume.html.mustache`) and into Markdown (`templates/scott-weaver_resume.md.mustache`).

### Commands

| Command         | Description                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------- |
| `npm start`     | Starts Gulp watcher, which waits for changes to `src/` files and regenerates the HTML/PDF/MD files. |
| `npm run build` | Generates HTML/PDF/MD files based on `src/` files.                                                  |
| `npm run clean` | Cleans out the `dist/` folder.                                                                      |
