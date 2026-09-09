# Portfolio — Danishvaran Kamalakannan

Static site, comic-page theme. No build step, no dependencies beyond Google
Fonts. Three files do the work: `index.html`, `styles.css`, `main.js`, plus
`assets/` for the hero clip and project imagery.

## Preview locally

```bash
python -m http.server 5173
```

Then open <http://localhost:5173>. (Opening `index.html` directly also works,
but a server is closer to how it will actually be served.)

## Outbound links

All outbound links live in the `LINKS` object at the top of `main.js`:

```js
const LINKS = {
  pl:       "https://premier-league-match-prediction-by-danish.streamlit.app/",
  linkedin: "https://www.linkedin.com/in/danishvaran15/",
  github:   "https://github.com/Dminish"
};
```

Any value left as `""` renders that link disabled rather than shipping a dead
`href`, so it is safe to blank one out while a destination is being moved.
Project buttons in the Work section carry their URLs inline in `index.html`
rather than through `LINKS`.

## Projects and their links

| # | Project | Link | Last checked |
| --- | --- | --- | --- |
| 001 | SplitBuddy | <https://splitbuddy-iota.vercel.app> | `200` |
| 002 | D.A.N | <https://dan-chat.onrender.com> | `200` |
| 003 | DanTech IT Helpdesk Agent | <https://github.com/Dminish/it-helpdesk-triage-agent> | `200` |
| 004 | NOC Monitor | <https://noc-monitor-by-danish.streamlit.app> | `303` → login |
| 005 | Premier League Predictor | <https://premier-league-match-prediction-by-danish.streamlit.app> | `303` → login |

A card only carries the **Live** badge when its URL actually serves. DanTech
links to source rather than a demo, so it has no badge. If you deploy the
DanTech Streamlit demo, add the URL and the badge together.

### Known issue: both Streamlit apps are private

As of this writing, both `noc-monitor-by-danish.streamlit.app` and
`premier-league-match-prediction-by-danish.streamlit.app` answer an anonymous
request with `303` to `/-/login`, which is Streamlit Community Cloud's private-app
gate. A visitor with no Streamlit account sees a login wall, not the app.

To fix, per app: <https://share.streamlit.io> -> the app's menu -> **Settings** ->
**Sharing** -> set viewer access to public. A public app returns `200` and renders
straight away. Verify with:

```bash
curl -sL -o /dev/null -w "%{url_effective}" https://noc-monitor-by-danish.streamlit.app/
```

If the final URL still contains `/-/login`, it is still private.

## Editing content

| What | Where |
| --- | --- |
| Career timeline entries | `TIMELINE` object in `main.js` |
| Projects, skills, experience, education | the matching `<section>` in `index.html` |
| Colours, type, spacing | the `:root` block at the top of `styles.css` |

## Deploy to GitHub Pages

1. Create a repo and push these files to the `main` branch.
2. Repo **Settings** → **Pages** → Source: *Deploy from a branch* → `main` / `root`.
3. It goes live at `https://<username>.github.io/<repo>/` within a minute or two.

To use a custom domain later, add a `CNAME` file containing the domain and
point a DNS `CNAME` record at `<username>.github.io`.
