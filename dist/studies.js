import {publicSpeeches} from './public-speeches.js';
import {additionalSpeeches} from './additional-speeches.js';
import {caesarGaul} from './caesar-gaul.js';
import {alexanderOpis} from './alexander-opis.js';
// Section boundaries are a teaching interpretation, not divisions marked by the speakers.
export const speechStudies = [
  {
    id: 'gettysburg',
    title: 'Gettysburg Address',
    speaker: 'Abraham Lincoln',
    date: 'November 19, 1863',
    context: 'At a cemetery dedication during the Civil War, Lincoln turns remembrance of the dead into a responsibility for the living.',
    edition: 'Full text of the Bliss copy, written in 1864. Dashes are normalized; the study divisions are added.',
    source: 'https://www.abrahamlincolnonline.org/lincoln/speeches/gettysburg.htm',
    note: 'The colors show one six-part reading. Some functions overlap: the purpose statement is not a full roadmap, and the words-versus-deeds contrast is not a direct rebuttal of an opponent.',
    sections: [
      {
        part: 0,
        text: 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.',
        devices: [{name: 'Recall a shared story · historical allusion', quote: 'Four score and seven years ago', mechanism: 'The date points back to 1776, bringing the founding promise into the present argument.', tryIt: 'Begin a proposal by recalling a shared commitment, then say what it asks of people today.'}],
        explanation: 'Start with something the audience values. Lincoln recalls the nation’s founding promise of liberty and equality, making it the standard for what follows.'
      },
      {
        part: 1,
        text: 'Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war.',
        explanation: 'Explain the situation and its stakes. The war is a test of whether a nation built on those ideals can survive.'
      },
      {
        part: 2,
        text: 'We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.',
        explanation: 'State the immediate purpose: to dedicate a cemetery. This gives the audience its bearings, although it does not preview a list of arguments.'
      },
      {
        part: 3,
        text: 'But, in a larger sense, we can not dedicate — we can not consecrate — we can not hallow — this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract.',
        devices: [{name: 'Repeat the beginning · anaphora', quote: 'we can not dedicate — we can not consecrate — we can not hallow', mechanism: 'The repeated opening creates a steady rhythm while the verbs intensify the idea of making something sacred.', tryIt: 'Write three parallel clauses with the same opening. Make each add a stronger shade of meaning.'}],
        explanation: 'Give the central reason for seeing the occasion differently. The soldiers’ sacrifice has already made the ground sacred; a ceremony cannot add to that.'
      },
      {
        part: 4,
        text: 'The world will little note, nor long remember what we say here, but it can never forget what they did here.',
        devices: [{name: 'Set two ideas against each other · antithesis', quote: 'what we say here, but it can never forget what they did here', mechanism: 'Similar phrasing makes the contrast between speech and action easy to hear.', tryIt: 'Put two priorities in matching sentence shapes so their difference becomes clear.'}],
        explanation: 'Push back against the importance of the ceremony’s words by elevating the soldiers’ deeds. Read as refutation, this challenges an assumption rather than answering a stated opponent.'
      },
      {
        part: 5,
        text: 'It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us — that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion — that we here highly resolve that these dead shall not have died in vain — that this nation, under God, shall have a new birth of freedom — and that government of the people, by the people, for the people, shall not perish from the earth.',
        devices: [{name: 'Repeat the ending · epistrophe', quote: 'of the people, by the people, for the people', mechanism: 'Each phrase returns to the same words, making the people the origin, agent, and purpose of government.', tryIt: 'Write three phrases that end with the same people or purpose, changing their relationship each time.'}, {name: 'Make renewal physical · metaphor', quote: 'a new birth of freedom', mechanism: 'Birth makes political renewal feel like a new beginning with a future to protect.', tryIt: 'Give an abstract change a physical image, then test what the comparison helps listeners understand.'}],
        explanation: 'Turn remembrance into a commitment. The living must finish the work, protect freedom, and preserve self-government so that the sacrifice has meaning.'
      }
    ]
  },
  ...publicSpeeches,
  ...additionalSpeeches,
  caesarGaul,
  alexanderOpis
];
