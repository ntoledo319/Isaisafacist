# isaisafacist.club

A satirical single-page website styled as a fake government "National Cultural Threat Bulletin" about "Isa Fascism." Deployed as static HTML to Cloudflare Pages.

## Tech Stack
- Next.js (App Router, static export)
- TypeScript (strict)
- Tailwind CSS v4
- Cloudflare Pages deployment

## Build & Deploy
```bash
npm run dev    # Dev server on localhost:3000
npm run build  # Static export to out/
```

## Architecture
- Single page app: `src/app/page.tsx` (all sections)
- Global styles: `src/app/globals.css` (custom animations, theme)
- Layout: `src/app/layout.tsx` (metadata, fonts)
- Static assets: `public/images/` (evidence photos)

---

## Taste Standards

This project operates under active taste enforcement. Every code change,
UI element, copy block, and architectural decision must pass taste review.

### The Taste Hierarchy
- GENERIC: Could appear on any similar project unchanged. UNACCEPTABLE.
- SAFE-GOOD: Competent but predictable. UNACCEPTABLE.
- CONTEXTUAL: Specific to this project. MINIMUM VIABLE TASTE.
- DISTINCTIVE: Could only exist in this project. THE TARGET.

### Hard Rules
1. No statistical-average output. If it looks like a default template, rewrite.
2. Every UI component must answer: "Why does THIS project need THIS to
   look/work THIS way?"
3. Copy must have a point of view. Swap test: replace product name with
   competitor's. If it still works, the copy is dead.
4. No decoration-driven design. Every visual choice serves meaning.
5. Elimination before addition. Try removing elements first.

### Project Identity
- This project believes: Friendship humor is best when overengineered to absurdity. The gap between bureaucratic gravity and stupid content IS the art.
- This project is for: Isa's friend group — people who get inside jokes and appreciate absurdist commitment to a bit.
- This project should feel like: A declassified FBI file made as a joke with TERRIFYING effort; Tim Robinson's ITYSL; an SCP Foundation entry.
- This project should NEVER feel like: A generic roast-your-friend template; a birthday page; anything that breaks character or winks at the audience.
- Must-word: COMMITTED
- Never-word: CUTE

### Character Rules
- NEVER break character. The site is a real government document. Period.
- Inside jokes are delivered with the gravity of intelligence findings.
- Every visual detail reinforces the bureaucratic fiction.
- The more seriously it presents itself, the funnier it gets.

### Taste Verification
Before any task is complete, run the Specificity Test:
"Could this element exist in any other project without modification?"
If yes → rewrite.
