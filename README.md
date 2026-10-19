# Interactive React Portfolio

A modern, responsive portfolio starter built with React + Vite.

## Features

- Dark / light mode
- Animated sections using Framer Motion
- Scroll progress bar and active section navigation
- Mobile responsive navigation
- Project category filters
- Project details modal
- Three-line section navigation menu
- Escape-to-close dialogs and clipboard feedback
- GitHub / LinkedIn / email links
- Resume button
- Clean glassmorphism UI
- No backend required

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Open a terminal in this folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL shown by Vite, usually:
`http://localhost:5173`

## Main customization file

Most of your personal content lives in:

`src/data.js`

Change:
- name
- role
- location
- email
- phone
- GitHub
- LinkedIn
- resume path
- stats
- skills
- projects
- experience

To add your resume:
- place your file at `public/resume.pdf`
- set `resume` in `src/data.js` to `/resume.pdf`

The Resume button appears when a resume path is configured.

To add project links, set each project's `github` and `demo` values in `src/data.js`.

## Build for deployment

```bash
npm run build
```

The production files will be created in `dist/`.

You can deploy the `dist/` output on Vercel, Netlify, GitHub Pages, or another static host.
