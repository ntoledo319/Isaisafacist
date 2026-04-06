'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ────────────────────────────────────────────────────────
   HOOKS
   ──────────────────────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.querySelectorAll('.stamp, .stamp-classified').forEach((stamp) => {
              stamp.classList.add('stamp-visible');
            });
            entry.target.querySelectorAll('.marker-highlight').forEach((m) => {
              m.classList.add('highlighted');
            });
            entry.target.querySelectorAll('.crayon-underline').forEach((c) => {
              c.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    const revealEls = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .section-divider');
    revealEls.forEach((child) => observer.observe(child));
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Tracks which section (1-6) the reader is currently viewing */
function useCurrentSection() {
  const [section, setSection] = useState(1);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const registerSection = useCallback((index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setSection(idx + 1);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return { section, registerSection };
}

function useLiveTimestamp() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) +
          ' UTC' +
          (now.getTimezoneOffset() <= 0 ? '+' : '-') +
          String(Math.abs(Math.floor(now.getTimezoneOffset() / 60))).padStart(2, '0')
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

/** Counts how many redacted items the reader has declassified */
function useDeclassificationCount() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  return { count, increment };
}

/** Self-destruct timer — appears after 60s on page */
function useSelfDestruct() {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const activateTimer = setTimeout(() => {
      setActive(true);
      setTimeRemaining(300); // 5 minute countdown
    }, 60000);

    return () => clearTimeout(activateTimer);
  }, []);

  useEffect(() => {
    if (!active || timeRemaining === null || timeRemaining <= 0) return;
    const tick = setInterval(() => {
      setTimeRemaining((t) => (t !== null && t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(tick);
  }, [active, timeRemaining]);

  return { active, timeRemaining };
}

/** Inactivity warning — shows after 30s of no interaction */
function useInactivityWarning() {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => setIdle(true), 30000);

    const reset = () => {
      setIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIdle(true), 30000);
    };

    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('mousemove', reset, { passive: true });
    window.addEventListener('click', reset, { passive: true });
    window.addEventListener('touchstart', reset, { passive: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', reset);
      window.removeEventListener('mousemove', reset);
      window.removeEventListener('click', reset);
      window.removeEventListener('touchstart', reset);
    };
  }, []);

  return idle;
}

/** Splash screen — classified folder opening animation */
function useSplashScreen() {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);

  useEffect(() => {
    const stampTimer = setTimeout(() => setStampVisible(true), 600);
    const openTimer = setTimeout(() => setOpening(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(stampTimer); clearTimeout(openTimer); clearTimeout(hideTimer); };
  }, []);

  return { visible, opening, stampVisible };
}

/** Scroll progress — how much of the document has been "declassified" */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}

/** Konami code easter egg — ↑↑↓↓←→←→BA */
function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const sequence = useRef<string[]>([]);
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      sequence.current.push(e.key);
      sequence.current = sequence.current.slice(-10);
      if (KONAMI.every((k, i) => sequence.current[i] === k)) {
        setActivated(true);
        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 400);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    setTimeout(() => { setActivated(false); setDismissed(false); }, 600);
    sequence.current = [];
  }, []);

  return { activated: activated && !dismissed, dismiss };
}

/* ────────────────────────────────────────────────────────
   SECTION LABELS (for page counter)
   ──────────────────────────────────────────────────────── */
const SECTION_LABELS = [
  'I / National Threat Bulletin',
  'II / Subject Profile',
  'III / Threat Analysis',
  'IV / Recovered Doctrines',
  'V / Operational Pillars',
  'VI / Civilian Preparedness',
  'VII / Issuing Body',
];

/* ────────────────────────────────────────────────────────
   COMPONENTS
   ──────────────────────────────────────────────────────── */

/** Static document handling artifacts — staple, paperclip, routing stamp */
function DocumentArtifacts() {
  return (
    <>
      {/* Staple holes — top left */}
      <div className="absolute top-6 left-5 z-[2] pointer-events-none" aria-hidden="true">
        <div className="w-[3px] h-[8px] bg-ink/20 rounded-[1px] mb-[3px]" />
        <div className="w-[3px] h-[8px] bg-ink/20 rounded-[1px]" />
      </div>
      {/* Paperclip shadow — top right */}
      <div
        className="absolute top-3 right-8 w-[14px] h-[40px] border-2 border-ink/10 rounded-full pointer-events-none z-[2]"
        style={{ borderBottom: 'none', transform: 'rotate(5deg)' }}
        aria-hidden="true"
      />
      {/* Single routing stamp */}
      <div
        className="absolute top-14 right-4 font-mono text-[0.4rem] tracking-[0.15em] uppercase text-ink/[0.08] rotate-[-3deg] pointer-events-none z-[2] select-none"
        aria-hidden="true"
      >
        RECEIVED — DEPT. OF CULTURAL AFFAIRS
      </div>
      {/* Copy number */}
      <div
        className="absolute top-14 left-4 font-mono text-[0.4rem] tracking-[0.1em] uppercase text-ink/[0.12] pointer-events-none z-[2] select-none"
        aria-hidden="true"
      >
        COPY 3 OF 7
      </div>
    </>
  );
}

/** Case file page counter — bottom right, document-native */
function PageCounter({ section }: { section: number }) {
  return (
    <div className="fixed bottom-3 right-3 z-50 font-mono text-[0.5rem] tracking-[0.15em] uppercase text-ink/20 pointer-events-none select-none page-counter" aria-hidden="true">
      <div>CASE FILE ISA-2024-001</div>
      <div>PAGE {section} OF 7</div>
    </div>
  );
}

function Barcode() {
  const heights = [70, 90, 50, 100, 60, 85, 45, 100, 75, 55, 90, 40, 100, 65, 80, 50, 95, 70, 100, 55, 85, 45, 75, 100, 60, 90, 50, 80, 100, 70];
  return (
    <div className="barcode" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className="barcode-line"
          style={{ height: `${h}%`, width: i % 5 === 0 ? '3px' : '1.5px' }}
        />
      ))}
    </div>
  );
}

/** Rebuilt threat meter — 5 discrete assessment boxes, static, form-like */
function ThreatMeter() {
  const levels = ['LOW', 'GUARDED', 'ELEVATED', 'HIGH', 'SEVERE'];
  return (
    <div className="max-w-sm mx-auto mt-6 fade-in fade-in-delay-5">
      <div className="font-mono text-[0.5rem] tracking-widest uppercase text-gray-bureau mb-2">THREAT ASSESSMENT</div>
      <div className="flex gap-[3px] mb-1">
        {levels.map((level, i) => (
          <div key={level} className="flex-1 flex flex-col items-center">
            <div
              className="w-full h-[8px] border border-ink/30"
              style={{
                background: `rgba(196, 30, 30, ${0.2 + i * 0.2})`,
              }}
            />
            <span className="font-mono text-[0.35rem] tracking-wider mt-0.5 text-ink/40 uppercase">{level}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-1.5">
        <span className="font-mono text-[0.5rem] tracking-widest uppercase text-blood font-bold">ASSESSMENT: 5/5 — MAXIMUM</span>
        <span className="font-mono text-[0.4rem] tracking-wider text-ink/30 uppercase">SCALE EXCEEDED — SEE ADDENDUM 4.7</span>
      </div>
    </div>
  );
}

function RedactedText({ children, onDeclassify }: { children: string; onDeclassify?: () => void }) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    if (!el.classList.contains('declassified')) {
      el.classList.add('declassified');
      onDeclassify?.();
    }
  }, [onDeclassify]);

  return (
    <span className="redacted" onClick={handleClick} title="Click to declassify">
      {children}
    </span>
  );
}

/** Self-destruct notice */
function SelfDestructNotice({ timeRemaining }: { timeRemaining: number | null }) {
  if (timeRemaining === null) return null;
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  return (
    <div className="fixed bottom-3 left-3 z-50 font-mono text-[0.5rem] tracking-[0.15em] uppercase self-destruct-notice select-none pointer-events-none" aria-hidden="true">
      <span className="text-blood/60">DOCUMENT AUTO-PURGE IN {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
    </div>
  );
}

/** Inactivity warning overlay */
function InactivityWarning({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none flex items-center justify-center inactivity-warning" aria-hidden="true">
      <div className="font-mono text-[0.7rem] tracking-[0.3em] uppercase text-blood/40 text-center leading-relaxed">
        THIS DOCUMENT IS BEING MONITORED<br />
        CONTINUED INACTIVITY WILL BE LOGGED
      </div>
    </div>
  );
}

/** Declassification counter in header */
function DeclassificationBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="text-crayon-yellow font-bold">
      {count} DECLASSIFIED
    </span>
  );
}

/** Splash screen overlay — classified manila folder */
function SplashScreen({ visible, opening, stampVisible }: { visible: boolean; opening: boolean; stampVisible: boolean }) {
  if (!visible) return null;
  return (
    <div className={`splash-overlay ${opening ? 'splash-exit' : ''}`}>
      <div className={`splash-folder ${opening ? 'opening' : ''}`}>
        <div className="splash-folder-label">
          <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-ink/40 mb-2">CASE FILE</div>
          <div className="font-display text-2xl tracking-wider text-ink">ISA-2024-001</div>
          <div className="font-mono text-[0.45rem] tracking-[0.15em] uppercase text-ink/30 mt-2">CULTURAL AFFAIRS DIVISION</div>
          <div className="font-mono text-[0.4rem] tracking-[0.1em] uppercase text-blood mt-4">DO NOT DISTRIBUTE</div>
        </div>
        <div className={`splash-stamp ${stampVisible ? 'visible' : ''}`}>CLASSIFIED</div>
      </div>
      <div className="font-mono text-[0.5rem] tracking-[0.3em] uppercase text-white/20 mt-8">
        LOADING THREAT ASSESSMENT...
      </div>
    </div>
  );
}

/** Scroll progress bar — declassification percentage */
function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="scroll-progress" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
  );
}

/** Failed redaction — text that glitches through the black bar */
function FailedRedaction({ children }: { children: string }) {
  return (
    <span className="redacted-fail">
      <span className="redacted-fail-text">{children}</span>
    </span>
  );
}

/** Konami code lockdown overlay */
function KonamiLockdown({ active, onDismiss }: { active: boolean; onDismiss: () => void }) {
  if (!active) return null;
  return (
    <div className="konami-lockdown" onClick={onDismiss}>
      <div className="lockdown-stamp">LOCKDOWN</div>
      <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mt-8">
        UNAUTHORIZED ACCESS SEQUENCE DETECTED
      </div>
      <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-blood/60 mt-3">
        ALL PERSONNEL REPORT TO DEBRIEF STATION 7
      </div>
      <div className="font-mono text-[0.4rem] tracking-[0.15em] uppercase text-white/20 mt-12">
        CLICK ANYWHERE TO RESUME DOCUMENT REVIEW
      </div>
    </div>
  );
}

/** Three-Card Monte — hidden game triggered by clicking the final evidence photo.
 *  3 card objects (key = card identity) each assigned a slot (0/1/2).
 *  React key stays on the card, so the DOM node persists across slot changes,
 *  and CSS transition on `transform: translateX()` animates the movement. */
function ThreeCardMonte({ onClose }: { onClose: () => void }) {
  type Phase = 'intro' | 'reveal' | 'shuffling' | 'picking' | 'result';
  const [phase, setPhase] = useState<Phase>('intro');
  // cardSlots[cardId] = which slot (0,1,2) that card occupies
  const [cardSlots, setCardSlots] = useState<[number, number, number]>([0, 1, 2]);
  const [picked, setPicked] = useState<number | null>(null); // slot index the user clicked
  const [won, setWon] = useState(false);
  const [showFaces, setShowFaces] = useState(false);
  const alive = useRef(true);

  // Card 0 is always Isa. Cards 1 and 2 are decoys.
  const ISA = 0;

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const [slotWidth, setSlotWidth] = useState(112);
  useEffect(() => {
    const update = () => setSlotWidth(window.innerWidth >= 640 ? 140 : 112);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const getSlotX = useCallback((slot: number) => slot * slotWidth, [slotWidth]);

  const startGame = useCallback(async () => {
    alive.current = true;

    // Random initial placement for Isa
    const isaSlot = Math.floor(Math.random() * 3);
    const decoySlots = [0, 1, 2].filter(s => s !== isaSlot);
    const init: [number, number, number] = [isaSlot, decoySlots[0], decoySlots[1]];
    setCardSlots(init);
    setPicked(null);
    setWon(false);

    // Show faces
    setPhase('reveal');
    setShowFaces(true);
    await sleep(2200);
    if (!alive.current) return;

    // Flip back down
    setShowFaces(false);
    await sleep(700);
    if (!alive.current) return;

    // Shuffle: 6-9 swaps
    setPhase('shuffling');
    const numSwaps = 6 + Math.floor(Math.random() * 4);
    const cur: [number, number, number] = [...init];

    for (let i = 0; i < numSwaps; i++) {
      if (!alive.current) return;
      // Pick two cards to swap slots
      const a = Math.floor(Math.random() * 3);
      let b = a;
      while (b === a) b = Math.floor(Math.random() * 3);
      const tmp = cur[a]; cur[a] = cur[b]; cur[b] = tmp;
      setCardSlots([...cur]);
      await sleep(Math.max(280, 520 - i * 30));
    }

    // Rig: 75% chance we do one extra swap moving Isa to confuse
    if (Math.random() > 0.25) {
      if (!alive.current) return;
      const isaAt = cur[ISA];
      const others = [0, 1, 2].filter(s => s !== isaAt);
      const target = others[Math.floor(Math.random() * others.length)];
      // Find which card is at target slot
      const otherCard = cur.indexOf(target);
      const tmp = cur[ISA]; cur[ISA] = cur[otherCard]; cur[otherCard] = tmp;
      setCardSlots([...cur]);
      await sleep(380);
    }

    if (!alive.current) return;
    setPhase('picking');
  }, []);

  useEffect(() => {
    if (phase === 'intro') {
      const t = setTimeout(startGame, 600);
      return () => clearTimeout(t);
    }
  }, [phase, startGame]);

  useEffect(() => () => { alive.current = false; }, []);

  const handlePick = useCallback((slot: number) => {
    if (phase !== 'picking') return;
    setPicked(slot);
    setWon(cardSlots[ISA] === slot);
    setShowFaces(true);
    setPhase('result');
  }, [phase, cardSlots]);

  // Which slot did the user click? We need to map pointer position back to slot.
  // Simpler: render a transparent click target for each slot.

  return (
    <div className="monte-game">
      <div className="text-center mb-4">
        <div className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-gray-bureau mb-1">
          CLASSIFIED — EVIDENCE SHUFFLE PROTOCOL
        </div>
        <div className="font-headline text-base md:text-xl font-bold text-ink leading-snug">
          {phase === 'intro' && 'Initializing shuffle protocol...'}
          {phase === 'reveal' && 'Observe. Remember the subject.'}
          {phase === 'shuffling' && 'Tracking in progress...'}
          {phase === 'picking' && 'Select a card, agent.'}
          {phase === 'result' && (won ? 'Congratulations, Isa wins!' : 'Congratulations, you win nothing!')}
        </div>
      </div>

      {/* Card table — relative container, cards absolutely positioned */}
      <div className="monte-table relative" style={{ height: slotWidth >= 140 ? 168 : 140 }}>
        {[0, 1, 2].map((cardId) => {
          const slot = cardSlots[cardId];
          const isFlipped = showFaces;
          const isIsa = cardId === ISA;
          const isPickedSlot = picked === slot;
          const isPickable = phase === 'picking';

          return (
            <div
              key={`card-${cardId}`}
              className={`monte-card absolute top-0 ${isFlipped ? 'flipped' : ''}`}
              style={{
                left: 0,
                transform: `translateX(${getSlotX(slot)}px)${isFlipped ? ' rotateY(180deg)' : ''}`,
                transition: phase === 'shuffling'
                  ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'transform 0.5s ease',
                outline: phase === 'result' && isPickedSlot
                  ? `3px solid ${won ? 'var(--color-blood)' : 'var(--color-gray-bureau)'}`
                  : 'none',
                outlineOffset: '3px',
                zIndex: phase === 'result' && isPickedSlot ? 2 : 1,
                cursor: isPickable ? 'pointer' : 'default',
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                handlePick(slot);
              }}
              role={isPickable ? 'button' : undefined}
              tabIndex={isPickable ? 0 : undefined}
              aria-label={isPickable ? `Select card ${slot + 1}` : undefined}
            >
              {/* Back */}
              <div className="monte-card-face monte-card-back">
                <div className="font-mono text-[0.4rem] tracking-[0.15em] uppercase text-white/40 z-10">CLASSIFIED</div>
                <div className="text-white/20 text-2xl my-2 z-10">◆</div>
                <div className="font-mono text-[0.35rem] tracking-[0.1em] uppercase text-white/20 z-10">ISA-2024</div>
              </div>
              {/* Front */}
              {isIsa ? (
                <div className="monte-card-face monte-card-front">
                  <img src="/images/evidence03.jpg" alt="Subject ISA" />
                </div>
              ) : (
                <div className="monte-card-face monte-card-front bg-paper flex flex-col items-center justify-center p-3">
                  <div className="font-mono text-[0.4rem] tracking-[0.15em] uppercase text-gray-bureau mb-1">
                    {cardId === 1 ? 'EXHIBIT X-7' : 'EXHIBIT X-9'}
                  </div>
                  <div className="text-3xl mb-1 opacity-30">◉</div>
                  <div className="font-mono text-[0.35rem] tracking-[0.1em] uppercase text-ink/30">DECOY FILE</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {phase === 'result' && (
        <div className="monte-result mt-6">
          <div className={`font-mono text-[0.55rem] tracking-[0.2em] uppercase mb-4 ${won ? 'monte-result-win font-bold' : 'monte-result-lose'}`}>
            {won
              ? '▲ SUBJECT LOCATED — ISA WINS AGAIN ▲'
              : '▲ SURVEILLANCE FAILURE — SUBJECT REMAINS AT LARGE ▲'}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => setPhase('intro')}
              className="font-mono text-[0.55rem] tracking-[0.15em] uppercase border border-ink px-4 py-2 hover:bg-ink hover:text-white transition-colors duration-200 cursor-pointer"
            >
              SHUFFLE AGAIN
            </button>
            <button
              onClick={onClose}
              className="font-mono text-[0.55rem] tracking-[0.15em] uppercase border border-ink/30 text-ink/50 px-4 py-2 hover:border-ink hover:text-ink transition-colors duration-200 cursor-pointer"
            >
              RETURN TO FILE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Doctrine card stamp variations — different analysts handled different cards */
const DOCTRINE_STAMPS = [
  'CONFIRMED',
  'CORROBORATED',
  'FIELD VERIFIED',
  'SEE ANNEX B',
  'INTERCEPTED',
  'EYES ONLY',
  'FLAGGED',
  'UNCONTESTED',
];

export default function Home() {
  const heroRef = useScrollReveal();
  const profileRef = useScrollReveal();
  const actIIRef = useScrollReveal();
  const actIIIRef = useScrollReveal();
  const actIVRef = useScrollReveal();
  const actVRef = useScrollReveal();
  const footerRef = useScrollReveal();
  const timestamp = useLiveTimestamp();
  const { section, registerSection } = useCurrentSection();
  const { count: declassifiedCount, increment: onDeclassify } = useDeclassificationCount();
  const { active: selfDestructActive, timeRemaining } = useSelfDestruct();
  const isIdle = useInactivityWarning();
  const splash = useSplashScreen();
  const scrollProgress = useScrollProgress();
  const konami = useKonamiCode();
  const [monteActive, setMonteActive] = useState(false);

  return (
    <main className="min-h-screen bg-bone">
      {/* ---- GLOBAL OVERLAYS ---- */}
      <SplashScreen visible={splash.visible} opening={splash.opening} stampVisible={splash.stampVisible} />
      <ScrollProgressBar progress={scrollProgress} />
      <KonamiLockdown active={konami.activated} onDismiss={konami.dismiss} />
      <div className="grain-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <PageCounter section={section} />
      {selfDestructActive && <SelfDestructNotice timeRemaining={timeRemaining} />}
      <InactivityWarning visible={isIdle} />

      {/* ============================================= */}
      {/* WARNING STRIPE TOP BAR */}
      {/* ============================================= */}
      <div className="warning-stripe h-3 w-full" aria-hidden="true" />

      {/* ============================================= */}
      {/* META HEADER BAR */}
      {/* ============================================= */}
      <div className="bg-ink text-white px-4 py-2 flex justify-between items-center font-mono text-[0.6rem] tracking-[0.2em] uppercase sticky top-0 z-50 backdrop-blur-sm bg-ink/95">
        <span>Classification: <span className="text-crayon-red font-bold">CULTURAL EMERGENCY</span></span>
        <span className="flex items-center gap-3">
          <DeclassificationBadge count={declassifiedCount} />
          <span className="hidden sm:inline text-white/40">SEC {SECTION_LABELS[section - 1]}</span>
          <span className="live-timestamp hidden sm:inline">{timestamp}</span>
          <span className="pulse-dot" />
          LIVE THREAT
        </span>
      </div>

      {/* ============================================= */}
      {/* ACT I — HERO / NATIONAL CULTURAL THREAT BULLETIN */}
      {/* ============================================= */}
      <section ref={(el) => { heroRef.current = el; registerSection(0)(el); }} className="relative px-4 pt-14 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* CLASSIFIED watermark */}
        <div className="classified-watermark" aria-hidden="true" />

        {/* Document handling artifacts — staple, paperclip, routing stamp */}
        <DocumentArtifacts />

        {/* Registration marks */}
        <div className="registration-mark top-4 left-4" aria-hidden="true" />
        <div className="registration-mark top-4 right-4" aria-hidden="true" />
        <div className="registration-mark bottom-4 left-4" aria-hidden="true" />
        <div className="registration-mark bottom-4 right-4" aria-hidden="true" />

        {/* Document crease */}
        <div className="doc-crease top-[55%]" aria-hidden="true" />

        {/* Binder holes — left margin */}
        <div className="absolute left-3 top-[20%] flex flex-col gap-[180px] pointer-events-none z-[2]" aria-hidden="true">
          <div className="w-[10px] h-[10px] rounded-full border-2 border-ink/10" />
          <div className="w-[10px] h-[10px] rounded-full border-2 border-ink/10" />
          <div className="w-[10px] h-[10px] rounded-full border-2 border-ink/10" />
        </div>

        {/* File number + barcode */}
        <div className="flex items-center justify-between mb-8 fade-in relative z-10">
          <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-gray-bureau">
            CASE FILE NO. ISA-2024-001 &nbsp;/&nbsp; THREAT LEVEL: <span className="text-blood font-bold">IMMINENT</span>
          </div>
          <Barcode />
        </div>

        {/* Fake seal */}
        <div className="flex justify-center mb-10 fade-in fade-in-delay-1 relative z-10">
          <div className="seal">
            <div className="text-center">
              <div className="font-mono text-[0.45rem] tracking-[0.15em] uppercase leading-tight font-bold">
                AGNOSTIC<br />SOCIETY
              </div>
              <div className="text-[1.2rem] my-1">◉</div>
              <div className="font-mono text-[0.4rem] tracking-[0.1em] uppercase leading-tight">
                EST. RECENTLY
              </div>
            </div>
          </div>
        </div>

        {/* MAIN TITLE — Photocopy misregistration, not RGB glitch */}
        <h1
          className="hero-title xerox-text text-center font-display text-[4.5rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] tracking-wide text-ink mb-6 fade-in fade-in-delay-2 relative z-10"
        >
          ISA-FASCIST
        </h1>

        {/* Subtitle */}
        <div className="text-center mb-10 fade-in fade-in-delay-3 relative z-10">
          <p className="font-headline text-xl md:text-3xl italic text-ink/80 max-w-xl mx-auto leading-snug">
            National Cultural Threat Bulletin
          </p>
          <p className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-gray-bureau mt-3">
            ISSUED FOR IMMEDIATE PUBLIC AWARENESS &nbsp;•&nbsp; DO NOT DISCARD
          </p>
        </div>

        {/* Stamp */}
        <div className="flex justify-center mb-8 fade-in fade-in-delay-4 relative z-10">
          <div className="stamp-classified stamp-visible">
            VERIFIED THREAT
          </div>
        </div>

        {/* Threat meter */}
        <ThreatMeter />

        {/* ---- IMAGE 1: HERO EVIDENCE ---- */}
        <div className="max-w-md mx-auto mb-12 mt-12 reveal relative z-10">
          <div className="evidence-frame relative">
            <div className="evidence-tape evidence-tape-tl" aria-hidden="true" />
            <div className="evidence-tape evidence-tape-tr" aria-hidden="true" />
            <div className="evidence-tape evidence-tape-br" aria-hidden="true" />
            <div className="evidence-label mb-2">EXHIBIT A — PRIMARY SUBJECT IDENTIFICATION</div>
            <div className="relative">
              <img
                src="/images/evidence01.jpg"
                alt="Primary subject identification — classified evidence photograph"
                className="w-full block"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              {/* Crayon circle overlay */}
              <div
                className="absolute top-[15%] left-[20%] w-[60%] h-[35%] border-[3px] border-crayon-red rounded-[50%_45%_55%_48%] opacity-60 pointer-events-none"
                style={{ transform: 'rotate(-6deg)' }}
                aria-hidden="true"
              />
              {/* Arrow annotation */}
              <div
                className="absolute top-[8%] right-[5%] font-mono text-[0.55rem] text-crayon-red font-bold tracking-wider uppercase"
                style={{ transform: 'rotate(12deg)' }}
                aria-hidden="true"
              >
                ← CONFIRMED
              </div>
            </div>
            <div className="mt-2 flex justify-between items-end">
              <span className="font-mono text-[0.5rem] text-gray-bureau tracking-wider uppercase">
                DATE: <RedactedText onDeclassify={onDeclassify}>04/15/2024</RedactedText> &nbsp;/&nbsp; SOURCE: FIELD UNIT
              </span>
              <span className="stamp text-[0.5rem] py-0.5 px-2 border-2">
                AUTH.
              </span>
            </div>
          </div>
        </div>

        {/* Core warning copy */}
        <div className="max-w-lg mx-auto text-center reveal delay-2 relative z-10">
          <p className="font-headline text-2xl md:text-3xl font-bold leading-tight text-ink mb-4">
            We cannot stop what is coming.<br />
            <span className="marker-highlight">We can only educate the public.</span>
          </p>
          <p className="font-body text-sm text-gray-bureau italic">
            Issued in reluctant service by the Agnostic Society for the Study of Isa Fascism.
          </p>
        </div>
      </section>

      {/* Angled divider into Profile */}
      <div className="section-divider mx-4" />

      {/* ============================================= */}
      {/* ACT II — SUBJECT PROFILE DOSSIER */}
      {/* ============================================= */}
      <section ref={(el) => { profileRef.current = el; registerSection(1)(el); }} className="px-4 py-16 md:py-24 bg-paper paper-texture relative">
        <div className="classified-watermark" aria-hidden="true" />
        <div className="coffee-stain" style={{ top: '5%', right: '3%' }} aria-hidden="true" />

        {/* Margin note */}
        <div className="margin-note" style={{ left: '-8px', top: '40%' }} aria-hidden="true">
          ANALYST 4 — FLAGGED FOR REVIEW — 04/2024
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="dossier-tab mb-8 reveal">
            Section II &nbsp;/&nbsp; Subject Profile &nbsp;/&nbsp; PERSONNEL FILE
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black leading-[1.05] mb-8 reveal delay-1">
            Subject<br />
            <span className="text-blood font-display text-4xl md:text-6xl">Dossier</span>
          </h2>

          <div className="subject-profile p-0 mb-10 reveal delay-2">
            <div className="pt-10 px-6 pb-6 md:px-8 md:pb-8">
              <div className="space-y-0">
                <div className="profile-row">
                  <span className="profile-label">Designation</span>
                  <span className="profile-value font-bold">ISA (Primary Subject)</span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">Known Aliases</span>
                  <span className="profile-value">&quot;The Fascist,&quot; &quot;Her,&quot; <RedactedText onDeclassify={onDeclassify}>that bitch (affectionate)</RedactedText></span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">Threat Level</span>
                  <span className="profile-value text-blood font-bold">UNCONTAINABLE</span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">Distinguishing Marks</span>
                  <span className="profile-value">Moth tattoo(s). Number unknown — believed to be multiplying.</span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">Last Known Location</span>
                  <span className="profile-value"><FailedRedaction>brunch</FailedRedaction></span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">Known Associates</span>
                  <span className="profile-value"><RedactedText onDeclassify={onDeclassify}>the group chat</RedactedText> — all currently under surveillance</span>
                </div>
                <div className="profile-row">
                  <span className="profile-label">Behavioral Pattern</span>
                  <span className="profile-value">Oscillates between &quot;I love everyone&quot; and restructuring all social hierarchies within a 50-foot radius</span>
                </div>
                <div className="profile-row border-b-0">
                  <span className="profile-label">Analyst Note</span>
                  <span className="profile-value italic text-gray-bureau">&quot;I don&rsquo;t know how to explain this but she&rsquo;s right about everything and that&rsquo;s the problem.&quot; — <RedactedText onDeclassify={onDeclassify}>Field Agent 12</RedactedText></span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center reveal delay-3">
            <div className="stamp inline-block">
              FILE ACTIVE
            </div>
          </div>
        </div>
      </section>

      {/* Warning stripe */}
      <div className="warning-stripe-thin h-2 w-full" aria-hidden="true" />

      {/* ============================================= */}
      {/* ACT III — WHAT IS ISA FASCISM? */}
      {/* ============================================= */}
      <section ref={(el) => { actIIRef.current = el; registerSection(2)(el); }} className="px-4 py-16 md:py-24 relative">
        {/* Classified watermark */}
        <div className="classified-watermark" aria-hidden="true" />
        {/* Coffee stain */}
        <div className="coffee-stain" style={{ top: '8%', right: '5%' }} aria-hidden="true" />
        <div className="coffee-stain coffee-stain-sm" style={{ bottom: '15%', left: '3%' }} aria-hidden="true" />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Section metadata */}
          <div className="dossier-tab mb-8 reveal">
            Section II &nbsp;/&nbsp; Threat Analysis &nbsp;/&nbsp; Page 2 of 6
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black leading-[1.05] mb-8 reveal delay-1">
            What Is<br />
            <span className="text-blood font-display text-4xl md:text-6xl">Isa Fascism</span>?
          </h2>

          <div className="bg-white border-l-4 border-ink p-6 md:p-8 mb-8 shadow-sm reveal delay-2 relative">
            {/* Document crease */}
            <div className="doc-crease top-[45%]" aria-hidden="true" />
            <p className="font-body text-base md:text-lg leading-relaxed">
              <span className="font-bold">Isa Fascism</span> is a rapidly spreading social-political-aesthetic doctrine characterized by <span className="marker-highlight">emotional spectacle</span>, iced coffee enforcement, unstable scheduling policy, and <span className="marker-highlight">mandatory symbolic participation</span>.
            </p>
          </div>

          {/* Analyst findings */}
          <div className="space-y-4 mb-10">
            {[
              { code: 'IF-001', text: 'Analysts confirmed early signs months ago.' },
              { code: 'IF-002', text: 'Containment protocols failed almost immediately.' },
              { code: 'IF-003', text: 'Civilian understanding remains dangerously low.' },
              { code: 'IF-004', text: 'Exposure is now considered functionally unavoidable.' },
            ].map((finding, i) => (
              <div key={finding.code} className={`flex items-start gap-3 py-3 border-b border-ink/10 reveal delay-${i + 3}`}>
                <span className="font-mono text-[0.6rem] font-bold tracking-widest text-blood bg-blood/10 px-2 py-1 shrink-0">
                  {finding.code}
                </span>
                <p className="font-body text-sm md:text-base text-ink/80 italic">
                  {finding.text}
                </p>
              </div>
            ))}
          </div>

          {/* INCIDENT TIMELINE */}
          <div className="mt-12 mb-10">
            <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-gray-bureau mb-6 reveal delay-5">
              ▸ DOCUMENTED INCIDENTS (PARTIAL LIST — <RedactedText onDeclassify={onDeclassify}>47 ADDITIONAL ENTRIES</RedactedText> WITHHELD)
            </div>
            <div className="incident-timeline space-y-0">
              {[
                { date: 'FEB 2024', code: 'INC-017', title: 'The Seating Chart Reorganization', desc: 'Subject rearranged entire friend group dinner seating based on "vibes" and "emotional proximity scores." Three friendships were restructured. No appeals were filed because no one knew they could.' },
                { date: 'MAR 2024', code: 'INC-023', title: 'The Iced Coffee Incident (Super Bowl)', desc: 'Subject arrived at Super Bowl party with iced coffee. In February. Demanded others acknowledge this as "a lifestyle, not a beverage choice." The room complied.' },
                { date: 'APR 2024', code: 'INC-031', title: 'Moth Tattoo Recruitment Drive', desc: 'Subject convinced two (2) previously unaffiliated civilians to get moth tattoos. Method of persuasion remains classified. Subjects reported feeling "inspired" and "slightly confused."' },
                { date: 'MAY 2024', code: 'INC-038', title: 'The 7 AM Thrifting Mandate', desc: 'Subject texted group chat at 6:47 AM: "thrifting in 13 minutes who\'s coming." Four people were in the car by 7:02. No one remembers agreeing.' },
              ].map((incident, i) => (
                <div key={incident.code} className={`incident-item reveal delay-${i + 5}`}>
                  <div className="incident-dot" />
                  <div className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-blood font-bold mb-1">{incident.date} — {incident.code}</div>
                  <div className="font-headline text-sm font-bold mb-1">{incident.title}</div>
                  <p className="font-body text-sm text-ink/70 leading-relaxed">{incident.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center reveal delay-7">
            <div className="stamp inline-block">
              ANALYSIS COMPLETE
            </div>
          </div>
        </div>
      </section>

      {/* Warning stripe divider */}
      <div className="warning-stripe-thin h-2 w-full" aria-hidden="true" />

      {/* ============================================= */}
      {/* ACT III — RECOVERED DOCTRINES / EVIDENCE */}
      {/* ============================================= */}
      <section ref={(el) => { actIIIRef.current = el; registerSection(3)(el); }} className="px-4 py-16 md:py-24 bg-paper paper-texture relative">
        {/* Coffee stain */}
        <div className="coffee-stain" style={{ top: '3%', left: '8%' }} aria-hidden="true" />
        <div className="coffee-stain coffee-stain-sm" style={{ bottom: '20%', right: '6%' }} aria-hidden="true" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="dossier-tab mb-6 reveal">
            Section III &nbsp;/&nbsp; Recovered Doctrines &nbsp;/&nbsp; Evidence of Spread
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black leading-[1.05] mb-4 reveal delay-1">
            Recovered <span className="marker-highlight">Doctrinal</span><br />Fragments
          </h2>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-gray-bureau mb-10 reveal delay-2">
            THE FOLLOWING MATERIALS WERE OBTAINED THROUGH FIELD SURVEILLANCE AND VOLUNTARY INFORMANT TESTIMONY
          </p>

          {/* ---- IMAGE 2: DOCTRINE EVIDENCE ---- */}
          <div className="max-w-sm mx-auto mb-12 reveal-scale delay-3">
            <div className="evidence-frame relative" style={{ transform: 'rotate(1deg)' }}>
              <div className="evidence-tape evidence-tape-tl" aria-hidden="true" />
              <div className="evidence-tape evidence-tape-tr" aria-hidden="true" />
              <div className="evidence-tape evidence-tape-bl" aria-hidden="true" />
              <div className="evidence-label mb-2">EXHIBIT B — SUBJECT IN ACTIVE DOCTRINAL DISSEMINATION</div>
              <div className="relative">
                <img
                  src="/images/evidence02.jpg"
                  alt="Subject observed during active doctrinal dissemination"
                  className="w-full block"
                  loading="lazy"
                  decoding="async"
                />
                {/* Annotation */}
                <div
                  className="absolute bottom-[10%] left-[5%] font-mono text-[0.55rem] text-crayon-blue font-bold bg-white/80 px-1"
                  style={{ transform: 'rotate(-3deg)' }}
                  aria-hidden="true"
                >
                  ← ACTIVE RHETORIC
                </div>
              </div>
              <div className="mt-2 font-mono text-[0.5rem] text-gray-bureau tracking-wider uppercase">
                SURVEILLANCE FRAME &nbsp;/&nbsp; LOCATION: <RedactedText onDeclassify={onDeclassify}>UNDISCLOSED</RedactedText> &nbsp;/&nbsp; CONTEXT: DOCTRINAL ADDRESS
              </div>
            </div>
          </div>

          {/* DOCTRINE CARDS */}
          <div className="grid gap-5 md:grid-cols-2 mb-10">
            {[
              {
                id: 'DC-01',
                title: 'Iced Coffee Mandate',
                text: 'Iced coffee only for the approved. Temperature-based beverage hierarchy enforced at all social functions.',
                level: 'CRITICAL',
              },
              {
                id: 'DC-02',
                title: 'Mandatory Moth Tattoos',
                text: 'All participants must display lepidopteran insignia. Placement: discretionary. Compliance: not.',
                level: 'ENFORCED',
              },
              {
                id: 'DC-03',
                title: 'Involuntary Playlist Dictatorship',
                text: 'Aux cord privileges revoked for all citizens. One playlist. Her playlist. Every car. Every function. No appeals.',
                level: 'ACTIVE',
              },
              {
                id: 'DC-04',
                title: 'Compulsory Emotional Outburst Protocol',
                text: 'Everyone must scream "I love them so much" upon seeing a person they met that one time.',
                level: 'IMMEDIATE',
              },
              {
                id: 'DC-05',
                title: 'Ontological Prison Doctrine',
                text: 'Nothing is a prison, everything\'s a prison. Citizens must hold both positions simultaneously at all times.',
                level: 'METAPHYSICAL',
              },
              {
                id: 'DC-06',
                title: 'Chronological Abolition',
                text: 'Sleep schedules eliminated. Time is a construct and that construct has been defunded.',
                level: 'PERMANENT',
              },
            ].map((doctrine, i) => (
              <div key={doctrine.id} className={`doctrine-card reveal delay-${(i % 4) + 1}`} data-stamp={DOCTRINE_STAMPS[i]}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[0.55rem] font-bold tracking-widest text-white bg-ink px-2 py-0.5">
                    {doctrine.id}
                  </span>
                  <span className="font-mono text-[0.5rem] tracking-widest text-blood font-bold">
                    [{doctrine.level}]
                  </span>
                </div>
                <h3 className="font-headline text-base font-bold mb-1.5">{doctrine.title}</h3>
                <p className="font-body text-sm text-ink/75 leading-relaxed">{doctrine.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-5">
            <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-gray-bureau">
              ▲ END OF RECOVERED MATERIALS &nbsp;/&nbsp; FURTHER FRAGMENTS EXPECTED ▲
            </p>
          </div>
        </div>
      </section>

      {/* Angled divider into pillars */}
      <div className="angled-divider" aria-hidden="true" />

      {/* ============================================= */}
      {/* ACT IV — THE FIVE OPERATIONAL PILLARS */}
      {/* ============================================= */}
      <section ref={(el) => { actIVRef.current = el; registerSection(4)(el); }} className="px-4 py-16 md:py-28 bg-ink text-white relative overflow-hidden">
        {/* Grid bg */}
        <div className="footer-grid" aria-hidden="true" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-white/40 mb-6 reveal">
            Section IV &nbsp;/&nbsp; Foundational Architecture &nbsp;/&nbsp; CLASSIFIED
          </div>

          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black leading-[1.0] mb-4 reveal delay-1">
            The Five<br />Operational Pillars
          </h2>
          <p className="font-headline text-lg md:text-xl italic text-white/60 mb-12 md:mb-16 reveal delay-2">
            of Isa Fascism
          </p>

          {/* THE PILLARS */}
          <div className="space-y-6 md:space-y-8">
            {[
              {
                num: 'I',
                title: 'FASCISM',
                note: 'The core doctrine. Unavoidable by design. It is not a phase. It is a worldview.',
              },
              {
                num: 'II',
                title: 'THRIFTING',
                note: 'Secondhand acquisition as political praxis. Every garment is a manifesto. Every price tag is propaganda.',
              },
              {
                num: 'III',
                title: 'CORE-CORE TIK TOKS',
                note: 'Algorithmically surfaced emotional montage as governing aesthetic. Tears set to ambient music. Mandatory viewing.',
              },
              {
                num: 'IV',
                title: 'SHIT YOU ONLY HEAR AT THE GAY BAR',
                note: 'A classified oral tradition. Contents cannot be reproduced in writing. Trust the process.',
              },
              {
                num: 'V',
                title: 'COMMUNITY FEELINGS WORKSHOPS',
                note: 'Mandatory group processing sessions. No one leaves until everyone has cried at least once. Refreshments provided.',
              },
            ].map((pillar, i) => (
              <div key={pillar.num} className={`relative pillar-item reveal-left delay-${i + 1}`}>
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="shrink-0">
                    <div className="pillar-num w-12 h-12 md:w-16 md:h-16 border-2 border-blood bg-blood/10 flex items-center justify-center">
                      <span className="font-headline text-xl md:text-2xl font-black text-blood">
                        {pillar.num}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-2xl md:text-4xl lg:text-5xl leading-[0.95] mb-3 text-white">
                      {pillar.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-white/55 leading-relaxed max-w-lg">
                      {pillar.note}
                    </p>
                  </div>
                </div>
                {i < 4 && (
                  <div className="mt-6 md:mt-8 border-b border-white/10" />
                )}
              </div>
            ))}
          </div>

          {/* Monumental close */}
          <div className="mt-16 md:mt-20 text-center reveal-scale delay-6">
            <div className="inline-block border-2 border-blood px-6 py-3 hover:bg-blood/10 transition-colors duration-300">
              <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-blood font-bold">
                THESE PILLARS CANNOT BE REFORMED
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Angled divider reverse */}
      <div className="angled-divider angled-divider-reverse" style={{ background: 'var(--color-bone)' }} aria-hidden="true">
        <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bone)' }} />
      </div>

      {/* Warning stripe */}
      <div className="warning-stripe h-3 w-full" aria-hidden="true" />

      {/* ============================================= */}
      {/* ACT V — INEVITABILITY / CIVILIAN PREPAREDNESS */}
      {/* ============================================= */}
      <section ref={(el) => { actVRef.current = el; registerSection(5)(el); }} className="px-4 py-16 md:py-24 relative">
        {/* Classified watermark */}
        <div className="classified-watermark" aria-hidden="true" />
        {/* Coffee stain */}
        <div className="coffee-stain" style={{ bottom: '10%', right: '8%' }} aria-hidden="true" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="dossier-tab mb-6 reveal">
            Section V &nbsp;/&nbsp; Civilian Preparedness Memo &nbsp;/&nbsp; FINAL ADVISORY
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black leading-[1.05] mb-6 reveal delay-1">
            It Cannot<br />
            <span className="crayon-underline">Be Stopped.</span>
          </h2>

          <div className="bg-white border-2 border-ink p-6 md:p-10 mb-10 relative reveal delay-2">
            {/* Corner fold effect */}
            <div
              className="absolute top-0 right-0 w-10 h-10 bg-bone"
              style={{
                background: 'linear-gradient(225deg, var(--color-bone) 50%, #c5c0b8 50%, #d5d0c8 52%, white 52%)',
              }}
              aria-hidden="true"
            />
            {/* Crease */}
            <div className="doc-crease top-[50%]" aria-hidden="true" />

            <p className="font-headline text-xl md:text-2xl font-bold leading-snug mb-6">
              We can&rsquo;t actually stop this from happening. We can just educate on what&rsquo;s coming.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Containment has failed.',
                'Regulation has failed.',
                'Boundaries have failed.',
                'At this stage, civilian awareness is the only remaining response.',
              ].map((line, i) => (
                <div key={i} className={`flex items-center gap-3 reveal delay-${i + 3}`}>
                  <span className="w-5 h-5 bg-blood text-white font-mono text-[0.5rem] font-bold flex items-center justify-center shrink-0">
                    ✕
                  </span>
                  <p className="font-body text-sm md:text-base text-ink/80">
                    {i === 3 ? (
                      <span className="font-bold text-ink">{line}</span>
                    ) : (
                      <s className="text-ink/50">{line}</s>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="stamp-classified text-center">
              SITUATION IRREVERSIBLE
            </div>
          </div>

          {/* ---- IMAGE 3: FINAL EVIDENCE / THREE-CARD MONTE ---- */}
          {!monteActive ? (
            <div className="max-w-sm mx-auto mb-12 reveal-scale delay-2">
              <div
                className="evidence-frame evidence-glow relative"
                style={{ transform: 'rotate(-1.5deg)' }}
                onClick={() => setMonteActive(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setMonteActive(true); }}
                aria-label="Open evidence shuffle protocol"
              >
                <div className="evidence-tape evidence-tape-tl" aria-hidden="true" />
                <div className="evidence-tape evidence-tape-tr" aria-hidden="true" />
                <div className="evidence-tape evidence-tape-br" aria-hidden="true" />
                <div className="evidence-label mb-2">EXHIBIT C — FINAL-STAGE OBSERVATION</div>
                <div className="relative">
                  <img
                    src="/images/evidence03.jpg"
                    alt="Final-stage observation — subject in contemplative state"
                    className="w-full block"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Crayon arrow */}
                  <div
                    className="absolute top-[5%] left-[5%] font-mono text-[0.55rem] text-crayon-red font-bold"
                    style={{ transform: 'rotate(-8deg)' }}
                    aria-hidden="true"
                  >
                    IT&rsquo;S TOO LATE ↓
                  </div>
                  {/* Evidence circle */}
                  <div
                    className="absolute bottom-[20%] left-[25%] w-[50%] h-[30%] border-[3px] border-crayon-blue rounded-[45%_50%_52%_48%] opacity-50 pointer-events-none"
                    style={{ transform: 'rotate(4deg)' }}
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 flex justify-between items-end">
                  <span className="font-mono text-[0.5rem] text-gray-bureau tracking-wider uppercase">
                    STATUS: <span className="text-blood font-bold">IRREVERSIBLE</span> &nbsp;/&nbsp; REF: ISA-FINAL
                  </span>
                  <span className="stamp text-[0.5rem] py-0.5 px-2 border-2" style={{ transform: 'rotate(-8deg)' }}>
                    NO RETURN
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto mb-12 reveal-scale">
              <div className="bg-white border-2 border-ink p-4 md:p-6 relative">
                <div className="doc-crease top-[30%]" aria-hidden="true" />
                <ThreeCardMonte onClose={() => setMonteActive(false)} />
              </div>
            </div>
          )}

          {/* Analyst transfer request */}
          <div className="mt-8 bg-paper border border-ink/20 p-4 reveal delay-4 relative">
            <div className="doc-crease top-[60%]" aria-hidden="true" />
            <div className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-gray-bureau mb-2">
              INTERNAL MEMO — ANALYST TRANSFER REQUEST
            </div>
            <p className="font-body text-sm text-ink/60 italic leading-relaxed">
              &quot;I am formally requesting transfer off this case. Not because the subject is dangerous — she is — but because I have been to <FailedRedaction>three brunches</FailedRedaction> as part of my surveillance duties and I think I&rsquo;m becoming <RedactedText onDeclassify={onDeclassify}>one of them</RedactedText>. I laughed at a core-core TikTok yesterday. Please advise.&quot;
            </p>
            <div className="font-mono text-[0.45rem] tracking-[0.1em] uppercase text-ink/30 mt-2">
              — <RedactedText onDeclassify={onDeclassify}>AGENT WILLIAMS</RedactedText>, CULTURAL AFFAIRS DIVISION
            </div>
          </div>

          <div className="text-center mt-8 reveal delay-5">
            <p className="font-headline text-lg md:text-xl italic text-ink/60">
              You have been informed.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* ACT VI — FOOTER / ISSUING BODY */}
      {/* ============================================= */}
      <footer ref={(el) => { footerRef.current = el; registerSection(6)(el); }} className="bg-ink text-white px-4 py-20 md:py-28 relative overflow-hidden">
        {/* Grid lines */}
        <div className="footer-grid" aria-hidden="true" />

        <div className="max-w-lg mx-auto text-center relative z-10">
          {/* Seal — larger */}
          <div className="flex justify-center mb-10 reveal-scale">
            <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-white/30 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-[4px] border border-white/20 rounded-full footer-seal-ring" style={{ borderStyle: 'dashed' }} />
              <div className="absolute inset-[10px] border border-white/10 rounded-full" />
              <div className="text-center">
                <div className="font-mono text-[0.35rem] md:text-[0.4rem] tracking-[0.1em] uppercase text-white/40 font-bold mb-0.5">AGNOSTIC</div>
                <div className="text-xl md:text-2xl">◉</div>
                <div className="font-mono text-[0.35rem] md:text-[0.4rem] tracking-[0.1em] uppercase text-white/40">SOCIETY</div>
              </div>
            </div>
          </div>

          <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-white/40 mb-4 reveal delay-1">
            THIS DOCUMENT CONSTITUTES OFFICIAL PUBLIC NOTICE
          </div>

          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />

          <p className="font-headline text-base md:text-lg italic text-white/70 mb-2 reveal delay-2">
            &mdash; The Agnostic Society for the Study of Isa Fascism
          </p>

          <p className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-white/25 mt-8 reveal delay-3">
            DOCUMENT REF: ISA-FASCIST-2024-BULLETIN-001 &nbsp;/&nbsp; DISTRIBUTION: UNRESTRICTED
          </p>

          {/* Live access timestamp */}
          <div className="mt-6 reveal delay-3">
            <p className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-white/30">
              DOCUMENT ACCESSED: <span className="live-timestamp text-blood/60">{timestamp}</span>
            </p>
          </div>

          {/* Distribution list */}
          <div className="mt-8 reveal delay-3">
            <p className="font-mono text-[0.45rem] tracking-[0.15em] uppercase text-white/20 leading-loose">
              DISTRIBUTION: <RedactedText onDeclassify={onDeclassify}>THE GROUP CHAT</RedactedText>, <RedactedText onDeclassify={onDeclassify}>EVERYONE AT BRUNCH</RedactedText>, <RedactedText onDeclassify={onDeclassify}>HER MOM (ACCIDENTALLY)</RedactedText>, AND UNFORTUNATELY, THE GENERAL PUBLIC
            </p>
          </div>

          {/* Appendix references */}
          <div className="mt-8 text-left max-w-xs mx-auto reveal delay-3">
            <div className="font-mono text-[0.45rem] tracking-[0.15em] uppercase text-white/25 mb-3">APPENDICES (AVAILABLE UPON REQUEST):</div>
            <div className="space-y-1.5 font-mono text-[0.4rem] tracking-[0.1em] uppercase text-white/15 leading-relaxed">
              <div>APPENDIX A: Iced Coffee Incident Report (47 pages)</div>
              <div>APPENDIX B: Moth Tattoo Registry &amp; Recruitment Logs</div>
              <div>APPENDIX C: Thrifting Acquisition Manifest (ongoing)</div>
              <div>APPENDIX D: Emotional Outburst Transcript (312 pages, <span className="text-blood/30">TRIGGER WARNING</span>)</div>
              <div>APPENDIX E: Playlist Analysis — Psychological Profile</div>
              <div>APPENDIX F: <RedactedText onDeclassify={onDeclassify}>Brunch Surveillance Logs</RedactedText></div>
            </div>
          </div>

          {/* DOCUMENT REVIEWED IN FULL stamp — only appears when reader reaches footer */}
          <div className="mt-6 text-center reveal-scale delay-4">
            <div className="stamp inline-block text-white/60 border-white/30">
              DOCUMENT REVIEWED IN FULL
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 reveal delay-5">
            <p className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-white/20 leading-relaxed">
              THIS IS SATIRE. THIS IS PARODY. THIS IS ART. THIS IS ABSURDIST SOCIAL COMMENTARY.<br />
              NO ACTUAL GOVERNMENTS, AGENCIES, OR FASCISMS WERE HARMED IN THE MAKING OF THIS DOCUMENT.<br />
              EXCEPT MAYBE FASCISM. BUT THAT&rsquo;S THE POINT.
            </p>
          </div>

          {/* Return to top */}
          <div className="mt-8 reveal delay-5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-white/25 hover:text-blood transition-colors duration-300 cursor-pointer"
              aria-label="Return to top of document"
            >
              ▲ RETURN TO TOP ▲
            </button>
          </div>
        </div>
      </footer>

      {/* Final warning stripe */}
      <div className="warning-stripe h-3 w-full" aria-hidden="true" />
    </main>
  );
}
