# Ganesh Khamkar - Developer Portfolio

A fast, responsive, modern portfolio website built for **Ganesh Khamkar (Web-Developer)**.

- **Strictly Developer-Focused**: Highlights coding skills, databases, and AI tooling.
- **Zero Framework Bloat**: Pure semantic HTML5, clean modern CSS variables, and vanilla JavaScript.
- **Accessible & Responsive**: Tested for screens from 375px mobile through 1440px+ widescreen desktops.

---

## Quick Setup & Customization Guide

### 1. Configure Placeholders
Search and replace the bracketed placeholders across `index.html` and `script.js`:

| Placeholder | Where to find | Description |
| :--- | :--- | :--- |
| `[GITHUB PROFILE URL]` | `index.html` | Your actual GitHub URL |
| `[LINKEDIN PROFILE URL]` | `index.html` | Your LinkedIn URL |
| `[RESUME URL]` / `[RESUME DOWNLOAD URL / PDF]` | `index.html` | Link to your PDF resume |
| `[YOUR EMAIL ADDRESS]` | `index.html` | Your contact email address |
| `[PROJECT NAME 1, 2, 3]` | `index.html` & `script.js` | Real project names and descriptions |
| `[GITHUB URL 1, 2, 3]` | `index.html` & `script.js` | Direct links to project repositories |
| `[LIVE DEMO URL 1, 2, 3]` | `index.html` & `script.js` | Direct URLs to live hosted demos |
| `[COMPANY NAME]` / `[ROLE / TITLE]` | `index.html` | Your verified work history |
| `[DEGREE / COURSE]` / `[INSTITUTION]` | `index.html` | Your verified education details |

---

### 2. Connect Contact Form to Email Service
The contact form in `script.js` validates data client-side and is pre-structured for free services like [Formspree](https://formspree.io) or [Formkeep](https://formkeep.com).

To enable direct email sending:
1. Create a free form at Formspree.
2. In `script.js` under `initContactForm()`, replace the mock timeout with:
   ```javascript
   const response = await fetch("https://formspree.io/f/YOUR_ID_HERE", {
     method: "POST",
     headers: { "Content-Type": "application/json", "Accept": "application/json" },
     body: JSON.stringify({ name: nameVal, email: emailVal, message: messageVal })
   });
   ```

---

### 3. Deploying the Website
You can deploy this site in under 2 minutes for free on any of these hosts:
- **GitHub Pages**: Push this repo, go to **Settings → Pages**, and select `main` branch.
- **Vercel**: Run `vercel` or link your GitHub repo.
- **Netlify**: Drag and drop the folder into the Netlify app.
