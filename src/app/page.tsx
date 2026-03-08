export default function Home() {
  return (
    <main className="min-h-screen bg-bone">
      {/* ============================================= */}
      {/* WARNING STRIPE TOP BAR */}
      {/* ============================================= */}
      <div className="warning-stripe h-3 w-full" aria-hidden="true" />

      {/* ============================================= */}
      {/* META HEADER BAR */}
      {/* ============================================= */}
      <div className="bg-ink text-white px-4 py-2 flex justify-between items-center font-mono text-[0.6rem] tracking-[0.2em] uppercase">
        <span>Classification: <span className="text-crayon-red font-bold">CULTURAL EMERGENCY</span></span>
        <span className="blink">● LIVE THREAT</span>
      </div>

      {/* ============================================= */}
      {/* ACT I — HERO / NATIONAL CULTURAL THREAT BULLETIN */}
      {/* ============================================= */}
      <section className="relative px-4 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Registration marks */}
        <div className="registration-mark top-4 left-4" aria-hidden="true" />
        <div className="registration-mark top-4 right-4" aria-hidden="true" />

        {/* File number */}
        <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-gray-bureau mb-6 fade-in">
          CASE FILE NO. ISA-2024-001 &nbsp;/&nbsp; THREAT LEVEL: <span className="text-blood font-bold">IMMINENT</span>
        </div>

        {/* Fake seal */}
        <div className="flex justify-center mb-8 fade-in fade-in-delay-1">
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

        {/* MAIN TITLE */}
        <h1 className="hero-title text-center font-display text-[4.5rem] md:text-[8rem] lg:text-[10rem] leading-[0.9] tracking-wide text-ink mb-4 fade-in fade-in-delay-2">
          ISA-FACIST
        </h1>

        {/* Subtitle */}
        <div className="text-center mb-8 fade-in fade-in-delay-3">
          <p className="font-headline text-xl md:text-3xl italic text-ink/80 max-w-xl mx-auto leading-snug">
            National Cultural Threat Bulletin
          </p>
          <p className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-gray-bureau mt-3">
            ISSUED FOR IMMEDIATE PUBLIC AWARENESS &nbsp;•&nbsp; DO NOT DISCARD
          </p>
        </div>

        {/* Stamp */}
        <div className="flex justify-center mb-10 fade-in fade-in-delay-4">
          <div className="stamp-classified">
            VERIFIED THREAT
          </div>
        </div>

        {/* ---- IMAGE 1: HERO EVIDENCE ---- */}
        <div className="max-w-md mx-auto mb-10">
          <div className="evidence-frame">
            <div className="evidence-label mb-2">EXHIBIT A — PRIMARY SUBJECT IDENTIFICATION</div>
            <div className="relative">
              <img
                src="/images/evidence01.jpg"
                alt="Primary subject identification — classified evidence photograph"
                className="w-full block"
                loading="lazy"
                decoding="async"
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
                DATE: CLASSIFIED &nbsp;/&nbsp; SOURCE: FIELD UNIT
              </span>
              <span className="stamp text-[0.5rem] py-0.5 px-2 border-2">
                AUTH.
              </span>
            </div>
          </div>
        </div>

        {/* Core warning copy */}
        <div className="max-w-lg mx-auto text-center">
          <p className="font-headline text-2xl md:text-3xl font-bold leading-tight text-ink mb-4">
            We cannot stop what is coming.<br />
            <span className="marker-highlight">We can only educate the public.</span>
          </p>
          <p className="font-body text-sm text-gray-bureau italic">
            Issued in reluctant service by the Agnostic Society for the Study of Isa Fascism.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider mx-4" />

      {/* ============================================= */}
      {/* ACT II — WHAT IS ISA FASCISM? */}
      {/* ============================================= */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Section metadata */}
          <div className="dossier-tab mb-8">
            Section II &nbsp;/&nbsp; Threat Analysis &nbsp;/&nbsp; Page 2 of 6
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black leading-[1.05] mb-8">
            What Is<br />
            <span className="text-blood font-display text-4xl md:text-6xl">Isa Fascism</span>?
          </h2>

          <div className="bg-white border-l-4 border-ink p-6 md:p-8 mb-8 shadow-sm">
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
            ].map((finding) => (
              <div key={finding.code} className="flex items-start gap-3 py-3 border-b border-ink/10">
                <span className="font-mono text-[0.6rem] font-bold tracking-widest text-blood bg-blood/10 px-2 py-1 shrink-0">
                  {finding.code}
                </span>
                <p className="font-body text-sm md:text-base text-ink/80 italic">
                  {finding.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
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
      <section className="px-4 py-16 md:py-24 bg-paper paper-texture relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="dossier-tab mb-6">
            Section III &nbsp;/&nbsp; Recovered Doctrines &nbsp;/&nbsp; Evidence of Spread
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black leading-[1.05] mb-4">
            Recovered Doctrinal<br />Fragments
          </h2>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-gray-bureau mb-10">
            THE FOLLOWING MATERIALS WERE OBTAINED THROUGH FIELD SURVEILLANCE AND VOLUNTARY INFORMANT TESTIMONY
          </p>

          {/* ---- IMAGE 2: DOCTRINE EVIDENCE ---- */}
          <div className="max-w-sm mx-auto mb-12">
            <div className="evidence-frame" style={{ transform: 'rotate(1deg)' }}>
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
                SURVEILLANCE FRAME &nbsp;/&nbsp; LOCATION: <span className="redacted">REDACTED</span> &nbsp;/&nbsp; CONTEXT: DOCTRINAL ADDRESS
              </div>
            </div>
          </div>

          {/* DOCTRINE CARDS */}
          <div className="grid gap-4 md:grid-cols-2 mb-8">
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
                title: 'Mandatory Solitaire',
                text: 'Solo card play required during all periods of downtime. Digital versions are considered heresy.',
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
              {
                id: 'DC-07',
                title: 'Universal Trifold Poster Board',
                text: 'Government-provided universal trifold poster board for all citizens. Glitter allocation pending.',
                level: 'SUBSIDIZED',
              },
              {
                id: 'DC-08',
                title: 'National Sobriety Countdown Assemblies',
                text: 'National assemblies in the style of a sobriety countdown announced by category of pro-Isa action.',
                level: 'CEREMONIAL',
              },
            ].map((doctrine) => (
              <div key={doctrine.id} className="doctrine-card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[0.55rem] font-bold tracking-widest text-white bg-ink px-2 py-0.5">
                    {doctrine.id}
                  </span>
                  <span className="font-mono text-[0.5rem] tracking-widest text-blood font-bold">
                    [{doctrine.level}]
                  </span>
                </div>
                <h3 className="font-headline text-base font-bold mb-1">{doctrine.title}</h3>
                <p className="font-body text-sm text-ink/75 leading-relaxed">{doctrine.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-gray-bureau">
              ▲ END OF RECOVERED MATERIALS &nbsp;/&nbsp; FURTHER FRAGMENTS EXPECTED ▲
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider mx-0 bg-blood" style={{ height: '3px' }} />

      {/* ============================================= */}
      {/* ACT IV — THE FIVE OPERATIONAL PILLARS */}
      {/* ============================================= */}
      <section className="px-4 py-16 md:py-28 bg-ink text-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-white/40 mb-6">
            Section IV &nbsp;/&nbsp; Foundational Architecture &nbsp;/&nbsp; CLASSIFIED
          </div>

          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black leading-[1.0] mb-4">
            The Five<br />Operational Pillars
          </h2>
          <p className="font-headline text-lg md:text-xl italic text-white/60 mb-12 md:mb-16">
            of Isa Fascism
          </p>

          {/* THE PILLARS */}
          <div className="space-y-6 md:space-y-8">
            {[
              {
                num: 'I',
                title: 'FACISM',
                note: 'The core doctrine. Deliberately misspelled. Unfixable by design. It is not a typo. It is a worldview.',
              },
              {
                num: 'II',
                title: 'THEIFTING',
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
              <div key={pillar.num} className="relative">
                {/* Pillar number */}
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-blood bg-blood/10 flex items-center justify-center">
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
                {/* Separator line */}
                {i < 4 && (
                  <div className="mt-6 md:mt-8 border-b border-white/10" />
                )}
              </div>
            ))}
          </div>

          {/* Monumental close */}
          <div className="mt-16 md:mt-20 text-center">
            <div className="inline-block border-2 border-blood px-6 py-3">
              <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-blood font-bold">
                THESE PILLARS CANNOT BE REFORMED
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning stripe */}
      <div className="warning-stripe h-3 w-full" aria-hidden="true" />

      {/* ============================================= */}
      {/* ACT V — INEVITABILITY / CIVILIAN PREPAREDNESS */}
      {/* ============================================= */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="dossier-tab mb-6">
            Section V &nbsp;/&nbsp; Civilian Preparedness Memo &nbsp;/&nbsp; FINAL ADVISORY
          </div>

          <h2 className="font-headline text-3xl md:text-5xl font-black leading-[1.05] mb-6">
            It Cannot<br />
            <span className="crayon-underline">Be Stopped.</span>
          </h2>

          <div className="bg-white border-2 border-ink p-6 md:p-10 mb-10 relative">
            {/* Corner fold effect */}
            <div
              className="absolute top-0 right-0 w-8 h-8 bg-bone"
              style={{
                background: 'linear-gradient(225deg, var(--color-bone) 50%, #ccc 50%, #ddd 52%, white 52%)',
              }}
              aria-hidden="true"
            />

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
                <div key={i} className="flex items-center gap-3">
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

          {/* ---- IMAGE 3: FINAL EVIDENCE ---- */}
          <div className="max-w-sm mx-auto mb-12">
            <div className="evidence-frame" style={{ transform: 'rotate(-1.5deg)' }}>
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

          <div className="text-center">
            <p className="font-headline text-lg md:text-xl italic text-ink/60">
              You have been informed.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* ACT VI — FOOTER / ISSUING BODY */}
      {/* ============================================= */}
      <footer className="bg-ink text-white px-4 py-16 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          {/* Seal */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-white/30 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-[4px] border border-white/20 rounded-full" />
              <div className="absolute inset-[8px] border border-white/10 rounded-full" />
              <div className="text-center">
                <div className="text-lg md:text-xl">◉</div>
              </div>
            </div>
          </div>

          <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-white/40 mb-4">
            THIS DOCUMENT CONSTITUTES OFFICIAL PUBLIC NOTICE
          </div>

          <div className="w-16 h-px bg-white/20 mx-auto mb-6" />

          <p className="font-headline text-base md:text-lg italic text-white/70 mb-2">
            &mdash; The Agnostic Society for the Study of Isa Fascism
          </p>

          <p className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-white/25 mt-8">
            DOCUMENT REF: ISA-FACIST-2024-BULLETIN-001 &nbsp;/&nbsp; DISTRIBUTION: UNRESTRICTED
          </p>

          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-white/20">
              THIS IS SATIRE. THIS IS PARODY. THIS IS ART. THIS IS ABSURDIST SOCIAL COMMENTARY.<br />
              NO ACTUAL GOVERNMENTS, AGENCIES, OR FASCISMS WERE HARMED IN THE MAKING OF THIS DOCUMENT.<br />
              EXCEPT MAYBE FACISM. BECAUSE IT&rsquo;S SPELLED WRONG ON PURPOSE.
            </p>
          </div>
        </div>
      </footer>

      {/* Final warning stripe */}
      <div className="warning-stripe h-3 w-full" aria-hidden="true" />
    </main>
  );
}
