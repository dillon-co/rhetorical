# Rhetoric Practice

A dependency-free browser app for speech arrangement, rhetorical devices, emotional appeals, and spoken improvisation.

Run `npm run dev` from this directory and open http://127.0.0.1:5173. Run `npm test` for the model, curriculum, import, and timer checks. Deploy `dist/` as a static site; no build step is needed.

Work autosaves to localStorage for the current browser and origin. Export a JSON backup regularly. Imports merge rather than replace work; conflicting speeches are retained as separate copies. No accounts, analytics, recordings, or automated grading. No backend persistence. A second tab changing saved work blocks writes in the current tab to avoid silent overwrites; export and reload to resolve.

The curriculum follows the 31-device Merriam-Webster starting list with original teaching examples. Emotion notes are compact interpretations of Aristotle, Rhetoric II. Source links appear inside the relevant exercises. Cicero’s six-part arrangement is a flexible practice scaffold.

Each speech section includes expandable writing guidance, pitfalls, and original variation drills grounded in Quintilian. See [research notes](docs/arrangement-research.md) for section references and adaptation notes.

The Speech studies tab contains the complete Gettysburg Address (Bliss copy), JFK inaugural address, and Reagan Brandenburg Gate speech; Caesar’s address before Ariovistus and Alexander’s Opis address in readable versions; and guided excerpts from Churchill’s “Blood, Toil, Tears and Sweat” and Jobs’s Stanford commencement address. Each study includes color-coded sections, plain-language explanations, rhetorical devices, and practice prompts. Text labels accompany every color. Copyrighted speeches link to the complete source. The seven historical opening examples are available in the same study selector. Studies are collected in `dist/studies.js`; section boundaries are editorial interpretations, not claims about an author's original divisions.

The Voice practice tab offers a repeatable delivery routine and five focused exercises adapted from Quintilian’s Institutio Oratoria XI.3, with source references. Practice is self-paced, without recording or scoring.

Each emotion includes an expandable outline of Aristotle’s definition, state of mind, people involved, causes, and key distinctions, with Book II chapter references. These paraphrases distinguish his historical account from the original practice scenarios.

Speech studies include an arrangement color key with hover descriptions and expandable explanations for touch and keyboard users. Selected passages have interpretive emotion notes covering Aristotle’s three questions, linked to the corresponding emotion practice.

Speech studies provide expandable uninterrupted reading text. Opis uses an app-authored plain-English rendering of Arrian VII.9–10 based on Chinnock’s public-domain translation. Jobs and Churchill retain excerpts and offer a tab-local paste reader; pasted text is not persisted or exported.

The Conclusion workshop links to six historical ending examples and a five-variation drill. The collection is also available in Speech studies as Historical conclusion techniques.

## Install and offline use

Serve `dist/` over HTTPS (or localhost for development), open it once online, and use the browser’s Install app / Add to Home Screen option. No account or sync setup is needed. Drafts and theme use this device’s browser storage and survive normal app restarts; clearing site data removes them. Export/import remains the optional way to move work. Pasted copyrighted speech copies remain tab-local as described above.

The service worker caches the complete app and curriculum. External source links require internet. New versions wait until all app windows close to avoid replacing code during a practice session. Bump `CACHE` in `dist/sw.js` whenever bundled content changes; add new files to `ASSETS`. The tests check that every bundled asset is included. Browser installation and device-specific storage behavior still require manual verification.
