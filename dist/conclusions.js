import {speechStudies} from './studies.js';
// Historical excerpts plus original teaching interpretations and drills.
export const conclusionExamples=[
 {
  title:'Abraham Lincoln — Gettysburg Address',date:'1863',technique:'Turn remembrance into a shared commitment',effect:'Devotion and responsibility',
  quote:speechStudies.find(s=>s.id==='gettysburg').sections.at(-1).text,
  quoteLabel:'Complete final paragraph · Bliss copy; punctuation normalized',
  context:'At a cemetery dedication, Lincoln moves from honoring the dead to the work the living must do.',
  mechanism:'“Dedicated” returns with a new object: the living themselves. The repeated “that” clauses build toward preserving self-government. The ending grows out of the speech’s opening commitment to equality.',
  application:'Return to a value introduced at the start. State what honoring that value now requires from the audience, and end on the future that action protects.',
  sources:[['Read the address','https://www.abrahamlincolnonline.org/lincoln/speeches/gettysburg.htm']]
 },
 {
  title:'Abraham Lincoln — Second Inaugural Address',date:'1865',technique:'Make a moral principle into practical work',effect:'Compassion and resolve',
  quote:'With malice toward none; with charity for all; with firmness in the right, as God gives us to see the right, let us strive on to finish the work we are in; to bind up the nation’s wounds; to care for him who shall have borne the battle, and for his widow, and his orphan—to do all which may achieve and cherish a just and lasting peace among ourselves, and with all nations.',
  quoteLabel:'Complete final paragraph · punctuation normalized',
  context:'As the Civil War nears its end, Lincoln sets out the spirit and work of reconciliation.',
  mechanism:'The opening balances rejection of malice with generosity and firmness. Repeated “to” phrases turn those values into tasks: finish, heal, care, and secure peace. The wound metaphor makes national repair human.',
  application:'Name the spirit in which you want people to act. Follow it with three concrete verbs, and finish with the shared purpose those actions serve.',
  sources:[['Read the conclusion · National Park Service','https://home.nps.gov/foth/lincoln-s-legacy-the-eloquent-president.htm']]
 },
 {
  title:'John F. Kennedy — Inaugural Address',date:'1961',technique:'Give the responsibility back to the listeners',effect:'Duty and shared agency',
  quote:'With a good conscience our only sure reward, with history the final judge of our deeds, let us go forth to lead the land we love, asking His blessing and His help, but knowing that here on earth God’s work must truly be our own.',
  quoteLabel:'Final sentence · apostrophe normalized',
  context:'After calling Americans and people around the world to service, Kennedy ends with the responsibility to act.',
  mechanism:'The repeated “with” phrases establish a moral frame. “Let us” makes the undertaking shared; the final turn makes human effort essential even while asking divine help.',
  application:'Name what guides the work, invite a shared action, then land on the part that only the audience can do.',
  note:'“Ask not what your country can do for you” belongs to the closing movement but is not the speech’s last sentence. Study how the speech continues beyond its best-known line.',
  sources:[['Read the address · National Archives','https://www.archives.gov/milestone-documents/president-john-f-kennedys-inaugural-address']]
 },
 {
  title:'Patrick Henry — Speech to the Virginia Convention',date:'1775 · reconstructed in 1817',technique:'Make the choice personal and unmistakable',effect:'Urgency and resolve',
  quote:'I know not what course others may take; but as for me, give me liberty, or give me death!',
  quoteLabel:'Final sentence in William Wirt’s later reconstruction',
  context:'The reconstructed speech urges Virginia to prepare for armed resistance. Its closing makes the speaker’s personal commitment the final point.',
  mechanism:'The sentence narrows from what others might choose to what “I” will choose. Liberty and death form a stark opposition; the repeated “give me” gives both alternatives the same forceful shape.',
  application:'State your own commitment in one clear sentence. Use a contrast only if the alternatives are fair; an ordinary disagreement rarely justifies life-or-death language.',
  note:'No contemporary transcript survives. This familiar wording comes from Wirt’s account published more than forty years later.',
  sources:[['Read Wirt’s reconstruction','https://en.wikisource.org/wiki/Sketches_of_the_Life_and_Character_of_Patrick_Henry/Chapter_4'],['Source history · National Archives','https://prologue.blogs.archives.gov/2025/03/21/liberty-or-death-patrick-henrys-bold-proclamation/']]
 },
 {
  title:'Franklin D. Roosevelt — First Inaugural Address',date:'1933',technique:'Finish quietly after making a forceful case',effect:'Solidarity and humility',
  quote:'In this dedication of a Nation we humbly ask the blessing of God. May He protect each and every one of us. May He guide me in the days to come.',
  quoteLabel:'Complete final paragraph · delivered transcript',
  context:'After arguing for vigorous action during the Depression, Roosevelt closes with a brief prayer.',
  mechanism:'The repeated “May He” gives the ending balance. The movement from protecting everyone to guiding the speaker adds humility after a speech asserting leadership. A quieter finish can still feel decisive.',
  application:'After a strong argument, try a short shared hope and a modest commitment of your own. Use language that fits your audience’s beliefs; the movement does not require a religious formula.',
  sources:[['Read the delivered address · American Presidency Project','https://www.presidency.ucsb.edu/documents/inaugural-address-8']]
 },
 {
  title:'Alexander the Great — Speech at Opis',date:'324 BC · Arrian’s later account',technique:'Make the audience imagine its future reputation',effect:'Shame and pressure to reconsider',
  quote:'Report that, after bringing him back to Susa, you deserted him and left him under the protection of the foreigners he had conquered. Perhaps that story will bring you glory among men and credit with the gods. Go!',
  quoteLabel:'Final passage · the app’s plain-English rendering of Arrian VII.10',
  context:'Alexander imagines what soldiers who leave will say at home, then gives them permission to depart in terms designed to make departure humiliating.',
  mechanism:'The imagined report supplies an audience beyond the people present. The promise of “glory” is ironic; the one-word command ends the confrontation sharply.',
  application:'Ask what story today’s decision will let the audience tell tomorrow. Write an encouraging version before trying a challenging one.',
  note:'This coercive ending depends on the relationship between king and soldiers. Arrian describes reconciliation after further events, not an instant victory produced by the speech alone.',
  sources:[['Read the closing chapter · Arrian VII.10','https://en.wikisource.org/wiki/The_Anabasis_of_Alexander/Book_VII/Chapter_X']]
 }
];
