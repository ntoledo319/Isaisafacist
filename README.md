# isaisafacist.club

**National Cultural Threat Bulletin**
*Issued in reluctant service by the Agnostic Society for the Study of Isa Fascism.*

This is a single-page satirical website. It is absurdist social satire, not political advocacy.

---

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- Static export (`output: "export"`)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output is generated in the `out/` directory.

## Deploy to Cloudflare Pages

### Option A: Direct Upload
1. Run `npm run build`
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
3. Create a new project → Upload assets
4. Upload the contents of the `out/` directory
5. Set custom domain to `isaisafacist.club`

### Option B: Git Integration
1. Push to GitHub/GitLab
2. Connect repository in Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `out`
5. Set custom domain to `isaisafacist.club`

### Option C: Wrangler CLI
```bash
npx wrangler pages deploy out/ --project-name=isaisafacist
```

## Project Structure

```
├── public/
│   └── images/
│       ├── evidence-01.svg   # Placeholder asset (not used by page)
│       ├── evidence-02.svg   # Placeholder asset (not used by page)
│       └── evidence-03.svg   # Placeholder asset (not used by page)
├── src/
│   └── app/
│       ├── evidenceData.ts   # Embedded JPEG data URIs (text-only assets)
│       ├── globals.css       # Tailwind + custom dossier styling
│       ├── layout.tsx        # Root layout with metadata
│       └── page.tsx          # The entire single-page site
├── next.config.ts            # Static export config
├── postcss.config.mjs
└── tsconfig.json
```

## Disclaimer

This is satire. This is parody. This is art. This is absurdist social commentary. No actual governments, agencies, or fascisms were harmed in the making of this document. Except maybe facism. Because it's spelled wrong on purpose.
